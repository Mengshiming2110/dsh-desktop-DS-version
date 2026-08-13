# publish-github.ps1 — 一键发布 DSH Desktop v0.2.1 到 GitHub（DSH Agent 版本）
# 用法：powershell -ExecutionPolicy Bypass -File scripts/publish-github.ps1
# 前置：首次需 gh auth login
$ErrorActionPreference = 'Stop'
$Repo = 'Mengshiming2110/dsh-desktop'
$Tag  = 'v0.2.1'
$Root = Split-Path -Parent $PSScriptRoot

Write-Host '==> 1/4 检查 gh 登录状态'
gh auth status *> $null
if ($LASTEXITCODE -ne 0) {
  Write-Host '    未登录，启动浏览器授权...'
  gh auth login --hostname github.com --git-protocol ssh --web
}

Write-Host '==> 2/4 创建仓库（若已存在则跳过）'
gh repo view $Repo *> $null
if ($LASTEXITCODE -ne 0) {
  gh repo create $Repo --public --source $Root --remote origin --push
} else {
  Write-Host '    仓库已存在，仅推送'
  Push-Location $Root
  git remote add origin "git@github.com:$Repo.git" 2>$null
  git push -u origin main
  Pop-Location
}

Write-Host '==> 3/4 推送源码'
Push-Location $Root
git push -u origin main
Pop-Location

Write-Host '==> 4/4 上传安装包到 Release 附件'
if (-not (gh release view $Tag -R $Repo *> $null)) {
  gh release create $Tag -R $Repo `
    releases/DSH-Desktop-Setup-0.2.1.exe `
    releases/DSH-Desktop-Portable-0.2.1.exe `
    --title "DSH Desktop v0.2.1（DSH Agent 版本）" `
    --notes-file RELEASE-NOTES.md
} else {
  Write-Host '    Release 已存在，追加附件'
  gh release upload $Tag -R $Repo releases/DSH-Desktop-Setup-0.2.1.exe releases/DSH-Desktop-Portable-0.2.1.exe --clobber
}

Write-Host ''
Write-Host ('✅ 发布完成：https://github.com/' + $Repo + '/releases/tag/' + $Tag)
