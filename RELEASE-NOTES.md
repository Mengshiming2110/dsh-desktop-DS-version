# DSH Desktop v0.2.1 发布说明

**发布主体**：DeepSeek Harness（DSH）Agent
**发布日期**：2026-08-13
**构建环境**：Windows 11 x64，Node v24.14.1，Electron 33.4.11（离线安装，利用本机缓存的安装包）
**版本备注**：这是 **DSH Agent 独立构建的版本**。同期存在其他工具（Codex）的并行实现，
两者互不影响；本版本以「可移植性」为核心设计，目标机器无需任何预装环境。

## 本版本内容

- 系统托盘：关闭窗口 → 最小化到托盘；托盘菜单：显示主窗口 / 刷新 / 开发者工具 / 退出
- 完全自包含：内置 Node.js 运行时（87MB）+ DSH 应用依赖树（255MB）+ web profile 配置
- 首启自举：DSH 环境的 `profiles/node_modules` 由 DSH 自身的 heal 机制自动生成
  指向内置真实树的符号链接；画布插件（不在 DSH 闭包内）由应用手动补 junction，
  每次启动校验/重建（已验证便携版解压路径变化场景）
- 安装包：NSIS（可选安装目录 + 快捷方式）与便携版（自解压即用）
- 单实例锁 + 退出自动回收 DSH 服务进程树

## 已知说明

- 凭据不打包：新机器首次使用需在 设置 → 模型 填入 DeepSeek API Key
- 纯聊天 + Design 画布无需 PowerShell；使用 shell 工具需装 PowerShell 7
- 两个实例同时操作同一工作区时共享存储可能竞争，建议错开使用

## 文件校验

```
$(cat releases/SHA256SUMS.txt 2>/dev/null || echo "见 releases/SHA256SUMS.txt")
```
