@echo off
echo Fixing React frontend configuration...
cd frontend
node fix_react_config.js
echo.
echo If the script completed successfully, you can now start the frontend with:
echo cd frontend
echo npm run start_custom
echo.
echo Press any key to exit...
pause > nul