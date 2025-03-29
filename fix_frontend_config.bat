@echo off
echo Fixing frontend configuration issues...
cd frontend
node fix_allowedhosts.js
echo.
echo Configuration fixed! Now starting the frontend...
echo.
npm start