#!/bin/bash

# Production startup script for Raza Traders

echo "🚀 Starting Raza Traders Deployment..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 2: Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Step 3: Push database schema (for SQLite)
echo "💾 Setting up database..."
npx prisma db push --accept-data-loss

# Step 4: Build the application
echo "🏗️  Building application..."
npm run build

# Step 5: Start the server
echo "✅ Starting server..."
npm start
