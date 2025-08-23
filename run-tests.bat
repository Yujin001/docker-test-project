@echo off
echo 🧪 Running Docker Test Project Tests...
echo.

echo 📋 Testing if application is running...
timeout /t 2 /nobreak >nul

echo 🌐 Testing root endpoint...
curl -s http://localhost:9000
echo.
echo.

echo 🔍 Testing health endpoint...
curl -s http://localhost:9000/health
echo.
echo.

echo ℹ️  Testing info endpoint...
curl -s http://localhost:9000/info
echo.
echo.

echo 🎉 Tests completed!
pause
