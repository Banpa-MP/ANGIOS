@echo off
echo ===================================================
echo   COMPILANDO A PRODUCCION - DOPPLERMAP
echo ===================================================
echo.
set /p version="Ingrese el sufijo de version (ej. v1, v2, v3): "
if "%version%"=="" set version=v1

set VITE_APP_VERSION=%version%

if not exist node_modules (
    echo Instalando modulos necesarios...
    call npm install
)

echo.
echo Compilando codigo para la version %version%...
call npm run build
echo.
echo ===================================================
echo Listo! Tus archivos (DopplerMap_%version%.js y DopplerMap_%version%.css)
echo se encuentran listos en la carpeta "dist".
echo ===================================================
pause
