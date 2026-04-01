@echo off
REM Production startup script for Raza Traders (Windows)

echo.
echo 🚀 Starting Raza Traders Deployment...
echo.

REM Step 1: Install dependencies
echo 📦 Installing dependencies...
call npm install
echo.

REM Step 2: Generate Prisma Client
echo 🔧 Generating Prisma Client...
call npx prisma generate
echo.

REM Step 3: Push database schema (for SQLite)
echo 💾 Setting up database...
call npx prisma db push --accept-data-loss
echo.

REM Step 4: Build the application
echo 🏗️  Building application...
call npm run build
echo.

REM Step 5: Start the server
echo ✅ Starting server...
call npm start
