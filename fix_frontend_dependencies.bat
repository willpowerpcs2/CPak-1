@echo off
echo Fixing frontend dependencies...
cd frontend
node fix_dependencies.js
echo.
echo Installing dependencies...
npm install
echo.
echo Dependencies fixed and installed!
echo.
echo To start the frontend, run:
echo cd frontend
echo npm run start_custom
echo.
echo To start the backend, run in a separate terminal:
echo cd backend
echo npm start
echo.
pause