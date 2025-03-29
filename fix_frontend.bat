@echo off
echo Fixing frontend configuration issues...
cd frontend
node fix_webpack_config.js
echo.
echo Configuration fixed! Now starting the frontend...
echo.
npm start