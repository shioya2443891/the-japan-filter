@echo off
chcp 65001 > nul
cd /d C:\Users\shioy\Documents\the-japan-filter

if not exist logs mkdir logs

for /f "tokens=1-4 delims=/ " %%a in ("%date%") do set DATESTR=%%a%%b%%c
set TIMESTR=%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTR=%TIMESTR: =0%
set LOGFILE=logs\daily_%DATESTR%_%TIMESTR%.txt

echo ========================================
echo Starting /daily -- auto brand selection
echo Log file: %LOGFILE%
echo ========================================
echo.

echo [START] %date% %time% > "%LOGFILE%"
echo Command: /daily >> "%LOGFILE%"
echo. >> "%LOGFILE%"

set CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS=0
claude -p "/daily" >> "%LOGFILE%" 2>&1

set EXITCODE=%ERRORLEVEL%

echo. >> "%LOGFILE%"
echo [END] %date% %time% >> "%LOGFILE%"
echo [EXIT CODE] %EXITCODE% >> "%LOGFILE%"

echo.
echo ========================================
if %EXITCODE%==0 (
    echo Done. Check the log: %LOGFILE%
) else (
    echo Finished with errors. Exit code: %EXITCODE%
    echo See the log for details: %LOGFILE%
)
echo ========================================
echo.

type "%LOGFILE%"

echo.
pause
