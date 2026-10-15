@echo off
chcp 65001 >nul
rem === VIVA Construction: saytni yangilash (GitHub -> Netlify) ===
rem Shu faylni ikki marta bosing. Fayllar asosiy loyiha papkasiga ko'chiriladi va GitHub'ga yuboriladi.
set "SITE=D:\Website qurilish\1\viva-construction-react-fornetlify\viva"
set "REPO=https://github.com/Mirzokhid2379/viva-construction.git"

if not exist "%SITE%" mkdir "%SITE%"
echo Fayllar ko'chirilmoqda...
robocopy "%~dp0src" "%SITE%\src" /MIR /NFL /NDL /NJH /NJS /NP >nul
robocopy "%~dp0public" "%SITE%\public" /MIR /NFL /NDL /NJH /NJS /NP >nul
robocopy "%~dp0scripts" "%SITE%\scripts" /MIR /NFL /NDL /NJH /NJS /NP >nul
robocopy "%~dp0deploy" "%SITE%\deploy" /MIR /NFL /NDL /NJH /NJS /NP >nul
for %%F in (netlify.toml index.html site.config.js package.json package-lock.json vite.config.js README.md update.bat .gitignore) do (
  if exist "%~dp0%%F" copy /Y "%~dp0%%F" "%SITE%\%%F" >nul
)

cd /d "%SITE%"
git config --global --add safe.directory "*" >nul 2>&1
if not exist ".git" (
  git init -b main >nul
  git remote add origin %REPO%
)
git remote set-url origin %REPO%
git fetch origin
git reset --soft origin/main
git add -A
git commit -m "Loyihalar rasmlari yangilandi"
git push -u origin main
echo.
if errorlevel 1 (
  echo XATO: GitHub'ga yuborilmadi. Shu oynaning skrinshotini yuboring.
) else (
  echo Tayyor! Netlify 1-2 daqiqada saytni o'zi yangilaydi.
)
pause
