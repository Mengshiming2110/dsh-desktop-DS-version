// DSH Desktop — DeepSeek Harness 桌面封装（可移植版）
// 主进程职责：
//   1. 解析运行时：打包后用 resources/runtime（内置 node + DSH），开发时用本机
//   2. 首次启动自举：把 DSH_HOME 建到 userData/dsh-home；DSH 自身的 heal 机制会在
//      profiles/node_modules 生成指向内置真实树的符号链接；画布插件不在 dsh 闭包内，
//      手动补一条 junction
//   3. 挑空闲端口启动 `dsh web --port <port>`，就绪后开窗口
//   4. 系统托盘：关闭窗口最小化到托盘；托盘菜单退出时回收 DSH 服务进程树
const { app, BrowserWindow, Menu, Tray, dialog, shell, nativeImage } = require('electron');
const { spawn, execFile, spawnSync } = require('node:child_process');
const http = require('node:http');
const net = require('node:net');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const HOST = '127.0.0.1';
const APP_VERSION = app.getVersion();
const SERVER_START_TIMEOUT = 120 * 1000;

let mainWindow = null;
let tray = null;
let dshChild = null;
let serverPort = null;

// ---------- 路径解析 ----------

function resourceBase() {
  return app.isPackaged ? process.resourcesPath : __dirname;
}

function assetPath(name) {
  return path.join(resourceBase(), 'assets', name);
}

function bundledRuntime() {
  return path.join(resourceBase(), 'runtime');
}

function findNode() {
  const bundled = path.join(bundledRuntime(), 'node', 'node.exe');
  if (fs.existsSync(bundled)) return bundled;
  const fromEnv = process.env.DSH_DESKTOP_NODE;
  if (fromEnv && fs.existsSync(fromEnv)) return fromEnv;
  for (const c of ['D:\\node.exe', 'C:\\Program Files\\nodejs\\node.exe', 'C:\\Program Files (x86)\\nodejs\\node.exe']) {
    if (fs.existsSync(c)) return c;
  }
  return 'node';
}

function userDshHome() {
  return path.join(app.getPath('userData'), 'dsh-home');
}

// ---------- 首启自举 ----------

// 内置运行时（resources/runtime）：
//   - node/node.exe              独立 Node 运行时
//   - dsh-app/node_modules       DSH 应用真实依赖树（含画布插件）
//   - dsh-home/profiles/web/*    web profile 配置（几个小文件）
// DSH 启动时 healProfilesModuleFallback 会在 $DSH_HOME/profiles/node_modules 自动
// 生成指向 dsh-app 真实树的符号链接；画布插件不在 dsh 依赖闭包内，这里手动补
// junction，并在每次启动校验/重建（应对便携版解压路径变化）。
function ensureRuntimeLayout(dstHome, srcHome) {
  const marker = path.join(dstHome, '.runtime-version');
  let current = '';
  try { current = fs.readFileSync(marker, 'utf8'); } catch (_) { /* first run */ }
  const needReinit = current !== APP_VERSION;
  const profilesDir = path.join(dstHome, 'profiles');

  if (needReinit && fs.existsSync(profilesDir)) {
    try { fs.rmSync(profilesDir, { recursive: true, force: true }); } catch (_) { /* ignore */ }
  }
  fs.mkdirSync(profilesDir, { recursive: true });

  // web profile 配置文件
  const dstWeb = path.join(profilesDir, 'web');
  if (!fs.existsSync(dstWeb)) {
    fs.mkdirSync(dstWeb, { recursive: true });
    const srcWeb = path.join(srcHome, 'profiles', 'web');
    for (const f of ['package.json', 'cordis.yml', 'cordis.patch.yml', 'pnpm-workspace.yaml']) {
      try { fs.copyFileSync(path.join(srcWeb, f), path.join(dstWeb, f)); } catch (_) { /* ignore */ }
    }
  }

  // 画布插件 junction（dsh 闭包之外，loader 从 flat fallback 解析）
  const srcAppNm = path.join(srcHome, '..', 'dsh-app', 'node_modules');
  const canvasTarget = path.join(srcAppNm, '@deepseek-ai', 'dsh-client-ui-canvas');
  const linkBase = path.join(profilesDir, 'node_modules', '@deepseek-ai');
  const canvasLink = path.join(linkBase, 'dsh-client-ui-canvas');
  if (fs.existsSync(canvasTarget)) {
    fs.mkdirSync(linkBase, { recursive: true });
    let needLink = true;
    try {
      const st = fs.lstatSync(canvasLink);
      needLink = !st.isSymbolicLink() || fs.readlinkSync(canvasLink) !== canvasTarget;
    } catch (_) { /* missing */ }
    if (needLink) {
      try { fs.rmSync(canvasLink, { recursive: true, force: true }); } catch (_) { /* ignore */ }
      try {
        fs.symlinkSync(canvasTarget, canvasLink, 'junction');
      } catch (_) {
        try {
          spawnSync('robocopy', [canvasTarget, canvasLink, '/E', '/MT:8', '/NFL', '/NDL', '/NJH', '/NJS', '/NP'], {
            windowsHide: true, timeout: 120000, stdio: 'ignore'
          });
        } catch (_2) { /* ignore */ }
      }
    }
  }
  fs.writeFileSync(marker, APP_VERSION);
}

// ---------- 服务与窗口 ----------

function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.once('error', reject);
    srv.listen(0, HOST, () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
  });
}

function waitForServer(url, timeoutMs) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const req = http.get(url, { timeout: 4000 }, (res) => { res.resume(); resolve(true); });
      req.on('timeout', () => req.destroy());
      req.on('error', () => {
        if (Date.now() - start > timeoutMs) reject(new Error('DSH 服务启动超时'));
        else setTimeout(attempt, 600);
      });
    };
    attempt();
  });
}

function killTree(pid) {
  if (!pid) return;
  if (process.platform === 'win32') {
    try { execFile('taskkill', ['/PID', String(pid), '/T', '/F']); } catch (_) { /* ignore */ }
  } else {
    try { process.kill(-pid, 'SIGTERM'); } catch (_) { try { process.kill(pid, 'SIGTERM'); } catch (_2) { /* ignore */ } }
  }
}

function startDshServer(nodePath, binPath, dshHome, port, logFile, cwd) {
  const args = [binPath, 'web', '--host', HOST, '--port', String(port)];
  const child = spawn(nodePath, args, {
    cwd,
    env: { ...process.env, DSH_HOME: dshHome },
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true
  });
  const log = fs.createWriteStream(logFile, { flags: 'a' });
  child.stdout.pipe(log);
  child.stderr.pipe(log);
  child.on('exit', (code, signal) => {
    if (!app.isQuitting && mainWindow) {
      dialog.showErrorBox('DSH Desktop', `DSH 服务意外退出（code=${code ?? 'null'} signal=${signal ?? 'null'}）\n日志：${logFile}`);
      app.quit();
    }
  });
  return child;
}

function createWindow(url) {
  const win = new BrowserWindow({
    width: 1500,
    height: 960,
    minWidth: 1024,
    minHeight: 700,
    title: 'DSH Desktop',
    backgroundColor: '#0f1116',
    autoHideMenuBar: false,
    icon: assetPath('icon.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  win.loadURL(url);
  win.webContents.setWindowOpenHandler(({ url: target }) => {
    if (/^https?:/i.test(target)) shell.openExternal(target);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (event, target) => {
    if (!target.startsWith(url)) {
      event.preventDefault();
      if (/^https?:/i.test(target)) shell.openExternal(target);
    }
  });
  // 关闭按钮 → 最小化到托盘（真正退出走托盘菜单 / 快捷键）
  win.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      win.hide();
      if (tray) {
        try { tray.displayBalloon({ title: 'DSH Desktop', content: '已最小化到系统托盘，点击托盘图标恢复窗口' }); } catch (_) { /* ignore */ }
      }
    }
  });
  return win;
}

// ---------- 托盘 ----------

function createTray() {
  let icon;
  try {
    icon = nativeImage.createFromPath(assetPath('tray.ico'));
    if (icon.isEmpty()) icon = nativeImage.createFromPath(assetPath('icon.png'));
  } catch (_) { /* ignore */ }
  if (!icon) icon = nativeImage.createEmpty();
  tray = new Tray(icon);
  tray.setToolTip('DSH Desktop — DeepSeek Harness');
  const showWindow = () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  };
  const menu = Menu.buildFromTemplate([
    { label: '显示主窗口', click: showWindow },
    { label: '刷新页面', accelerator: 'CmdOrCtrl+R', click: () => mainWindow && mainWindow.reload() },
    { label: '开发者工具', click: () => mainWindow && mainWindow.webContents.toggleDevTools() },
    { type: 'separator' },
    { label: '退出 DSH Desktop', click: () => { app.isQuitting = true; app.quit(); } }
  ]);
  tray.setContextMenu(menu);
  tray.on('click', () => {
    if (mainWindow && mainWindow.isVisible()) { mainWindow.hide(); } else { showWindow(); }
  });
  return tray;
}

// ---------- 菜单 ----------

function buildMenu() {
  const isMac = process.platform === 'darwin';
  return Menu.buildFromTemplate([
    ...(isMac ? [{ role: 'appMenu' }] : []),
    {
      label: '文件',
      submenu: [
        { label: '重新加载', accelerator: 'CmdOrCtrl+R', click: () => mainWindow && mainWindow.reload() },
        { type: 'separator' },
        { label: '退出', accelerator: 'CmdOrCtrl+Q', click: () => { app.isQuitting = true; app.quit(); } }
      ]
    },
    {
      label: '视图',
      submenu: [
        { role: 'toggleDevTools', label: '开发者工具' },
        { type: 'separator' },
        { role: 'resetZoom', label: '实际大小' },
        { role: 'zoomIn', label: '放大' },
        { role: 'zoomOut', label: '缩小' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: '全屏' }
      ]
    },
    ...(!isMac ? [{ role: 'windowMenu' }] : [])
  ]);
}

// ---------- 主流程 ----------

async function main() {
  const nodePath = findNode();
  console.log('[dsh-desktop] node =', nodePath);
  console.log('[dsh-desktop] packaged =', app.isPackaged);

  let dshHome;
  if (process.env.DSH_HOME) {
    dshHome = process.env.DSH_HOME;
  } else if (app.isPackaged) {
    dshHome = userDshHome();
    const srcHome = path.join(bundledRuntime(), 'dsh-home');
    if (fs.existsSync(srcHome)) {
      try { ensureRuntimeLayout(dshHome, srcHome); }
      catch (e) {
        dialog.showErrorBox('DSH Desktop', '初始化运行环境失败：' + e.message);
        app.quit();
        return;
      }
    }
  } else {
    // 开发模式：优先用系统 ~/.dsh；新机器没有时回退到仓库本地 runtime/
    const sysHome = path.join(os.homedir(), '.dsh');
    const sysBin = path.join(sysHome, 'profiles', 'node_modules', '@deepseek-ai', 'dsh', 'lib', 'bin.js');
    if (fs.existsSync(sysBin)) {
      dshHome = sysHome;
    } else {
      dshHome = userDshHome();
      const srcHome = path.join(bundledRuntime(), 'dsh-home');
      if (fs.existsSync(srcHome)) ensureRuntimeLayout(dshHome, srcHome);
    }
  }
  console.log('[dsh-desktop] DSH_HOME =', dshHome);

  // 运行 dsh 用内置真实树里的 bin（heal 机制以它为锚生成符号链接农场）；
  // 开发模式有 ~/.dsh 时沿用其符号链接，否则用仓库本地 runtime/
  const bundledAppNm = path.join(bundledRuntime(), 'dsh-app', 'node_modules');
  const sysBinPath = path.join(dshHome, 'profiles', 'node_modules', '@deepseek-ai', 'dsh', 'lib', 'bin.js');
  const binPath = (app.isPackaged || !fs.existsSync(sysBinPath))
    ? path.join(bundledAppNm, '@deepseek-ai', 'dsh', 'lib', 'bin.js')
    : sysBinPath;
  if (!fs.existsSync(binPath)) {
    dialog.showErrorBox('DSH Desktop', '未找到 dsh CLI：\n' + binPath + '\n（打包版请确认 resources/runtime 完整；开发版请先运行 npx --yes @deepseek-ai/dsh）');
    app.quit();
    return;
  }

  try { serverPort = await getFreePort(); }
  catch (e) { dialog.showErrorBox('DSH Desktop', '无法分配端口: ' + e.message); app.quit(); return; }

  const cwd = process.env.DSH_DESKTOP_CWD || (fs.existsSync('D:\\deepseek') ? 'D:\\deepseek' : os.homedir());
  const logFile = path.join(app.getPath('userData'), 'dsh-server.log');
  dshChild = startDshServer(nodePath, binPath, dshHome, serverPort, logFile, cwd);
  const url = `http://${HOST}:${serverPort}/`;
  console.log('[dsh-desktop] serving at', url);
  try {
    await waitForServer(url, SERVER_START_TIMEOUT);
    console.log('[dsh-desktop] server ready at', url);
  } catch (e) {
    dialog.showErrorBox('DSH Desktop', 'DSH 服务启动失败：' + e.message + '\n日志：' + logFile);
    killTree(dshChild.pid);
    app.quit();
    return;
  }
  mainWindow = createWindow(url);
  mainWindow.on('closed', () => { mainWindow = null; });
  Menu.setApplicationMenu(buildMenu());
  try { createTray(); } catch (e) { console.log('[dsh-desktop] tray failed:', e.message); }
}

// ---------- 生命周期 ----------

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.show();
      mainWindow.focus();
    }
  });
  app.whenReady().then(() => {
    app.setAppUserModelId('com.deepseek.dsh-desktop');
    main().catch((e) => {
      dialog.showErrorBox('DSH Desktop', '启动失败: ' + (e && e.message ? e.message : String(e)));
      app.quit();
    });
  });
}

app.on('window-all-closed', () => {
  // 托盘常驻：窗口全关时不退出
});

app.on('before-quit', () => {
  app.isQuitting = true;
  if (dshChild && dshChild.pid) killTree(dshChild.pid);
});
