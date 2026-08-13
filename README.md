# DSH Desktop

**GitHub 仓库**：https://github.com/Mengshiming2110/dsh-desktop-DS-version  
**Release 下载**：https://github.com/Mengshiming2110/dsh-desktop-DS-version/releases/tag/v0.2.1

> ⭐ **版本备注（重要）**：本仓库发布的是 **DeepSeek Harness（DSH）Agent 构建的版本**
> （2026-08-13，v0.2.1），由 DSH Agent 独立完成：托盘、内置 Node + DSH 运行时、
> 首启自举、NSIS/便携版打包。与同期其他工具（如 Codex）并行开发的版本无关，
> 请以本仓库为准。

把 DeepSeek Harness（含 **Design 画布**）封装成独立桌面应用，像 Trae 桌面版一样使用。
**完全自包含**：内置 Node.js + DSH 运行环境，目标机器**不需要安装 Node、不需要联网**。

## 功能

- 系统托盘常驻：关闭窗口最小化到托盘；托盘菜单恢复/刷新/退出
- 内置 Design 画布（对话即设计，实时渲染 HTML/CSS 设计稿）
- 首启自举：自动初始化 DSH 环境（junction 指向内置运行时，秒级完成）
- 单实例锁：重复启动自动聚焦已有窗口
- 退出时自动回收 DSH 服务进程

## 安装包（releases/ 目录，本地保留）

| 文件 | 说明 |
|---|---|
| `DSH-Desktop-Setup-0.2.1.exe` (157 MB) | NSIS 安装包：双击安装，生成桌面/开始菜单快捷方式 |
| `DSH-Desktop-Portable-0.2.1.exe` (157 MB) | 便携版：免安装，双击即用 |

> 远程发布时安装包作为 **GitHub Release 附件**上传（单文件超 100MB，不进 git 仓库，
> 见 `docs/BUILD.md` 与 `releases/SHA256SUMS.txt`）。

## 全新 Windows 上首次使用

1. 安装/运行 exe（首次启动自动初始化，稍等几秒）
2. 打开 **设置 → 模型**，填入你的 DeepSeek API Key（凭据只存本机，不打进安装包）
3. 开个会话 → 点 **Design** tab → 对话即设计

> 可选：装 [PowerShell 7](https://github.com/PowerShell/PowerShell/releases) 后聊天里才能用 shell 工具。

## 数据位置

- 会话/凭据/设置/Design 草稿：`%APPDATA%\DSH Desktop\dsh-home\`
- 服务日志：`%APPDATA%\DSH Desktop\dsh-server.log`

## 从源码构建

见 `docs/BUILD.md`。

## 环境变量

| 变量 | 作用 |
|---|---|
| `DSH_DESKTOP_CWD` | 工作区目录 |
| `DSH_HOME` | 显式指定 DSH_HOME（优先级最高） |
| `DSH_DESKTOP_NODE` | 指定 node.exe（打包版默认内置） |

## License

MIT（见 LICENSE）
