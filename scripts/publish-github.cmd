@echo off
rem 一键发布到 GitHub（首次运行会引导 gh 授权）
cd /d "%~dp0.."
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0publish-github.ps1"
pause