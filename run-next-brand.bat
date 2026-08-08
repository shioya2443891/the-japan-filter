@echo off
cd /d C:\Users\shioy\Documents\the-japan-filter

if not exist logs mkdir logs

set /p BRAND="Brand name (leave empty for auto-select): "

for /f "tokens=1-4 delims=/ " %%a in ("%date%") do set DATESTR=%%a%%b%%c
set TIMESTR=%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTR=%TIMESTR: =0%
set LOGFILE=logs\run_%DATESTR%_%TIMESTR%.txt

echo ========================================
echo Starting article generation...
echo Log file: %LOGFILE%
echo ========================================
echo.

if "%BRAND%"=="" (
    echo [START] %date% %time% > "%LOGFILE%"
    echo Command: /next-brand ^(auto-select^) >> "%LOGFILE%"
    echo. >> "%LOGFILE%"
    claude -p "/next-brand" >> "%LOGFILE%" 2>&1
) else (
    echo [START] %date% %time% > "%LOGFILE%"
    echo Command: /next-brand %BRAND% >> "%LOGFILE%"
    echo. >> "%LOGFILE%"
    claude -p "/next-brand %BRAND%" >> "%LOGFILE%" 2>&1
)

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
