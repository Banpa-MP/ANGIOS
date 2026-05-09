@echo off
echo ===================================================
echo   INICIANDO ENTORNO DE PRUEBA - DOPPLERMAP
echo ===================================================
echo.
echo Comprobando dependencias...
if not exist node_modules (
    echo Instalando modulos por primera vez ^(esto puede tardar un minuto^)...
    call npm install
)

echo.
echo Iniciando el servidor. El navegador se abrira automaticamente...
call npm run dev -- --open
pause
