# 构建指南（DSH Desktop v0.2.1）

> 本仓库只含源码与文档；342MB 内置运行时（`runtime/`）与 157MB 安装包不进 git。
> 重新打包需要在一台已初始化过 DSH 的机器上执行以下步骤。

## 0. 环境要求

- Windows x64，Node.js 18+，npm
- 已安装过 DSH（`npx --yes @deepseek-ai/dsh`），本机 `~/.dsh/profiles` 可用

## 1. 准备运行时（runtime/）

```bash
# 1.1 内置 Node
mkdir -p runtime/node && cp /path/to/node.exe runtime/node/     # 推荐与 DSH 相同的 node 版本

# 1.2 DSH 应用依赖树（真实文件，约 255MB）
# 来源：npx 缓存里的完整依赖树，例如
#   C:\Users\<you>\AppData\Local\npm-cache\_npx\<hash>\node_modules
# 复制为 runtime/dsh-app/node_modules

# 1.3 画布插件（不在 dsh 依赖闭包内，需单独放入）
cp -r dsh-client-ui-canvas runtime/dsh-app/node_modules/@deepseek-ai/dsh-client-ui-canvas

# 1.4 web profile 配置
mkdir -p runtime/dsh-home/profiles/web
cp ~/.dsh/profiles/web/{package.json,cordis.yml,cordis.patch.yml,pnpm-workspace.yaml} runtime/dsh-home/profiles/web/
```

## 2. 打包安装包

```bash
cd dsh-desktop            # 源码工程（含 package.json 的 electron-builder 配置）
npm install              # electron 33.4.11 + electron-builder（可离线，利用本机缓存）
npm run dist             # 产出 dist/DSH-Desktop-Setup-0.2.1.exe + DSH-Desktop-Portable-0.2.1.exe
```

## 3. 远程发布（GitHub）

```bash
# 3.1 首次需登录 gh CLI（会弹出浏览器授权）
gh auth login

# 3.2 创建仓库并推送源码（安装包不走 git：单文件 >100MB）
git push -u origin main

# 3.3 上传安装包为 Release 附件（GitHub Release 附件上限 2GB）
gh release create v0.2.1 releases/DSH-Desktop-Setup-0.2.1.exe releases/DSH-Desktop-Portable-0.2.1.exe   --title "DSH Desktop v0.2.1 (DSH Agent 版本)" --notes-file RELEASE-NOTES.md
```

## 4. 验证清单（每次打包后）

1. `dist/win-unpacked/DSH Desktop.exe` 双击 → 窗口出现 "DeepSeek Harness"
2. 服务端口可访问：`curl http://127.0.0.1:<port>/` 返回 200
3. 画布插件可访问：`curl http://127.0.0.1:<port>/plugins/@deepseek-ai/dsh-client-ui-canvas/client.js` 返回 200
4. 便携版在全新解压路径下 junction 自动重建（日志无报错）
