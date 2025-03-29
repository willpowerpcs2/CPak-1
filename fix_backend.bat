@echo off
echo Fixing backend connection...
cd backend
node fix_backend_connection.js
echo.
echo Backend setup completed!
echo.
echo To start the backend, run:
echo cd backend
echo npm start
echo.
pause