@echo off
echo =======================================================
echo     Configuracion Inicial de Git para MAP_App
echo =======================================================
echo.

echo [1/6] Inicializando repositorio Git...
git init
echo.

echo [2/6] Limpiando configuraciones previas (si existen)...
git remote remove origin 2>nul
echo.

echo [3/6] Conectando con el repositorio de GitHub...
git remote add origin https://github.com/Banpa-MP/Historia-Medica-para-Cirugia-Vascular
echo.

echo [4/6] Anadiendo todos los archivos del proyecto...
git add .
echo.

echo [5/6] Creando el primer commit...
git commit -m "Commit inicial: Archivos base del proyecto MAP_App"
echo.

echo [6/6] Subiendo los archivos a GitHub en la rama "main"...
git branch -M main
git push -u origin main
echo.

echo =======================================================
echo Mostrando estado de la conexion remota final:
git remote -v
echo =======================================================
echo.
echo Proceso completado. Si hubo algun error de autenticacion,
echo por favor revisa tus credenciales de GitHub.
echo.
pause
