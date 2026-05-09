@echo off
echo ===================================================
echo   COMPILANDO A PRODUCCION - PHYSIOMAP
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
echo Listo! Tus archivos (PhysioMap_%version%.js y PhysioMap_%version%.css)
echo se encuentran listos en la carpeta "dist".
echo ===================================================
pause
