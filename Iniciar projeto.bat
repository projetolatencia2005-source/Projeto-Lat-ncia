@echo off
setlocal
cd /d "%~dp0"

if not exist "node_modules\.bin\next.cmd" goto :missing

rem If the server is already running, open it instead of starting a duplicate.
powershell.exe -NoProfile -Command "$client = New-Object System.Net.Sockets.TcpClient; try { $client.Connect('127.0.0.1', 3001); exit 0 } catch { exit 1 } finally { $client.Dispose() }" >nul 2>&1
if not errorlevel 1 (
  start "" "http://localhost:3001"
  exit /b 0
)

rem Open the browser as soon as the development server starts listening.
start "" powershell.exe -NoProfile -WindowStyle Hidden -Command "$i=0; while($i -lt 120){ $client=$null; try { $client=New-Object System.Net.Sockets.TcpClient; $client.Connect('127.0.0.1',3001); $client.Dispose(); Start-Process 'http://localhost:3001'; exit 0 } catch { if($client){$client.Dispose()}; Start-Sleep -Milliseconds 500; $i++ } }"

echo Iniciando o projeto Doors em http://localhost:3001
call "node_modules\.bin\next.cmd" dev --webpack --port 3001
set "exitCode=%ERRORLEVEL%"
if not "%exitCode%"=="0" echo O servidor encerrou com codigo %exitCode%.
pause
exit /b %exitCode%

:missing
echo Dependencias nao encontradas. Instale o Node.js e o Yarn, depois execute yarn install.
pause
exit /b 1
