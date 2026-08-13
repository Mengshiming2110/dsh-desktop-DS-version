# 构建与开发指南（DSH Desktop v0.2.1）

本仓库就是完整的 Electron 工程（根目录即工程根）。

## 一、在新机器上继续开发（推荐流程）

> 目标机器只需装 **Node.js 18+**（运行安装包不需要，开发需要）。

```bash
# 1. 克隆仓库
git clone git@github.com:Mengshiming2110/dsh-desktop-DS-version.git
cd dsh-desktop-DS-version

# 2. 安装 electron + electron-builder（联网一次）
npm install

# 3. 生成内置运行时 runtime/（联网一次下载 DSH；约 255MB，需 1-2 分钟）
powershell -ExecutionPolicy Bypass -File scripts/setup-runtime.ps1

# 4. 开发模式运行（无 ~/.dsh 时会自动用 runtime/ 初始化，秒级）
npm start

# 5. 重新打包（产出 dist/DSH-Desktop-Setup-*.exe + Portable）
npm run dist
```

> 说明：`runtime/`（342MB）不进 git（见 .gitignore），每台开发机用
> `setup-runtime.ps1` 一键重建；构建时 electron-builder 会把 `runtime/`
> 原样打进 `resources/runtime`。

## 二、仓库结构

```
main.js                      # Electron 主进程（托盘/自举/服务管理）
package.json                 # 工程配置 + electron-builder 打包配置
assets/                      # 图标（icon.png/icon.ico/tray.ico）
src/
  profile-web/               # web profile 配置（含画布插件注册 patch）
  dsh-client-ui-canvas/      # Design 画布插件源码（运行时需注入）
scripts/
  setup-runtime.ps1          # 一键生成 runtime/
  publish-github.ps1/.cmd    # 一键发布 GitHub Release
docs/
releases/                    # 安装包（本地保留，gitignore；远程走 Release 附件）
```

## 三、手动重建 runtime/（不依赖脚本时）

1. `npx --yes @deepseek-ai/dsh --version`（下载 DSH 到 npx 缓存）
2. 复制 `%LOCALAPPDATA%\npm-cache\_npx\<hash>\node_modules` → `runtime/dsh-app/node_modules`
3. 复制 node.exe → `runtime/node/node.exe`
4. 复制 `src/profile-web/*` → `runtime/dsh-home/profiles/web/`
5. 复制 `src/dsh-client-ui-canvas` → `runtime/dsh-app/node_modules/@deepseek-ai/dsh-client-ui-canvas`

## 四、远程发布（GitHub Release）

安装包超 100MB 不走 git，作为 Release 附件：

```bash
gh auth login
scripts/publish-github.ps1    # 建仓(如需) + 推源码 + gh release create 上传附件
```

或直接网页上传：仓库 → Releases → 新建 v0.2.1 → 拖入两个 exe。

## 五、验证清单

1. `npm start` 窗口出现 "DeepSeek Harness"，端口可访问（200）
2. `curl http://127.0.0.1:<port>/plugins/@deepseek-ai/dsh-client-ui-canvas/client.js` → 200
3. 便携版在全新解压路径下 junction 自动重建（日志无报错）
