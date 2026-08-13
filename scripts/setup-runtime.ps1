# setup-runtime.ps1 — 在任何机器上一键生成 runtime/（内置 Node + DSH 运行时）
# 用法：powershell -ExecutionPolicy Bypass -File scripts/setup-runtime.ps1
# 前置：本机已装 Node.js 18+（开发本 GUI 本身就需要）
# 行为：优先用 npx 缓存里已有的 DSH -> 没有才联网 npx 下载（180s 超时）-> 复制依赖树 -> 复制 node.exe -> 写入 web profile + 画布插件
param([string]$NodeExe = "")
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
# 复制使用内置 Copy-Item，无外部依赖

function Find-DshCache {
  param([string]$npxRoot)
  @(Get-ChildItem $npxRoot -Directory -ErrorAction SilentlyContinue | ForEach-Object {
    $nm = Join-Path $_.FullName 'node_modules'
    if (Test-Path (Join-Path $nm '@deepseek-ai\dsh\lib\bin.js')) { $_.FullName }
  })
}

Write-Host '==> 0/5 确定 node.exe'
if (-not $NodeExe) {
  $cmd = Get-Command node.exe -ErrorAction SilentlyContinue
  if (-not $cmd) { throw "未找到 node.exe，请先安装 Node.js，或 -NodeExe 指定路径" }
  $NodeExe = $cmd.Source
}
if (-not (Test-Path $NodeExe)) { throw "node.exe 不存在: $NodeExe" }
Write-Host ('    node: ' + $NodeExe)

$localAppData = if ($env:LOCALAPPDATA) { $env:LOCALAPPDATA } else { Join-Path $env:USERPROFILE "AppData\Local" }
$npxRoot = Join-Path $localAppData "npm-cache\_npx"
$found = @(Find-DshCache $npxRoot)

Write-Host '==> 1/5 定位 DSH 依赖树（npx 缓存）'
if ($found.Count -gt 0) {
  $found = @($found | Sort-Object LastWriteTime -Descending)
  Write-Host '    已存在，跳过下载'
} else {
  Write-Host '    未找到，联网下载 DSH（最多 180 秒）...'
  $job = Start-Job -ScriptBlock { & npx.cmd --yes @deepseek-ai/dsh --version *> $null; exit $LASTEXITCODE }
  if (-not (Wait-Job $job -Timeout 180)) { Stop-Job $job; Remove-Job $job -Force; throw "npx 下载 DSH 超时，请检查网络后重试" }
  $code = Receive-Job $job -Keep | Out-Null; Remove-Job $job -Force
  $found = @(Find-DshCache $npxRoot)
  if ($found.Count -eq 0) { throw "npx 之后仍未找到 @deepseek-ai/dsh，请检查网络" }
  $found = $found | Sort-Object LastWriteTime -Descending
}
$src = Join-Path $found[0] "node_modules"
Write-Host ('    来源: ' + $src)

Write-Host '==> 2/5 复制依赖树 -> runtime/dsh-app/node_modules（约 255MB）'
$dst = Join-Path $Root "runtime\dsh-app\node_modules"
New-Item -ItemType Directory -Force $dst | Out-Null
Get-ChildItem -Path $src -Force | Copy-Item -Destination $dst -Recurse -Force
if ($LASTEXITCODE -ge 8) { throw "复制依赖树失败（robocopy exit $LASTEXITCODE）" }

Write-Host '==> 3/5 复制 node.exe 与 web profile 配置'
New-Item -ItemType Directory -Force (Join-Path $Root "runtime\node") | Out-Null
Copy-Item $NodeExe (Join-Path $Root "runtime\node\node.exe") -Force
$profileDst = Join-Path $Root "runtime\dsh-home\profiles\web"
New-Item -ItemType Directory -Force $profileDst | Out-Null
Get-ChildItem -Path (Join-Path $Root "src\profile-web") -Force | Copy-Item -Destination $profileDst -Recurse -Force
if ($LASTEXITCODE -ge 8) { throw "复制 profile 配置失败" }

Write-Host '==> 4/5 画布插件 -> runtime/dsh-app/node_modules/@deepseek-ai/dsh-client-ui-canvas'
$canvasDst = Join-Path $dst "@deepseek-ai\dsh-client-ui-canvas"
New-Item -ItemType Directory -Force $canvasDst | Out-Null
Get-ChildItem -Path (Join-Path $Root "src\dsh-client-ui-canvas") -Force | Copy-Item -Destination $canvasDst -Recurse -Force
if ($LASTEXITCODE -ge 8) { throw "复制画布插件失败" }

Write-Host '==> 5/5 校验'
$checks = @(
  (Test-Path (Join-Path $Root "runtime\node\node.exe")),
  (Test-Path (Join-Path $dst "@deepseek-ai\dsh\lib\bin.js")),
  (Test-Path (Join-Path $dst "@deepseek-ai\dsh-web-app\lib\startup.js")),
  (Test-Path (Join-Path $dst "@deepseek-ai\dsh-client-ui-canvas\lib\client.js")),
  (Test-Path (Join-Path $Root "runtime\dsh-home\profiles\web\cordis.patch.yml"))
)
if ($checks -contains $false) { throw "runtime/ 校验未通过：$($checks -join ",")" }

Write-Host ''
Write-Host '✅ runtime/ 生成完成并校验通过。接下来：'
Write-Host '    npm install        # 安装 electron / electron-builder'
Write-Host '    npm start          # 开发模式运行（无 ~/.dsh 时自动用 runtime/）'
Write-Host '    npm run dist       # 重新打包 NSIS + Portable'
