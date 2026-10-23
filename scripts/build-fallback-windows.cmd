@echo off
setlocal
set "SPOOLY_VS="
for /f "usebackq tokens=*" %%i in (`"%ProgramFiles(x86)%\Microsoft Visual Studio\Installer\vswhere.exe" -latest -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath`) do set "SPOOLY_VS=%%i"
if not defined SPOOLY_VS (
  echo Microsoft C++ x64 Build Tools are required to compile the fallback helper.
  exit /b 1
)
call "%SPOOLY_VS%\VC\Auxiliary\Build\vcvars64.bat"
if errorlevel 1 exit /b 1
cd /d "%~dp0.."
node scripts\build-fallback.cjs
exit /b %errorlevel%
