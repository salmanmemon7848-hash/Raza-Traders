#!/usr/bin/env node

/**
 * Database Setup Script for Production
 * 
 * This script helps set up the Prisma database for production deployment.
 * Run this after installing dependencies but before building the app.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up Prisma database for production...\n');

try {
  // Step 1: Check if .env exists
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.error('❌ Error: .env file not found!');
    console.error('Please create a .env file with DATABASE_URL');
    process.exit(1);
  }

  // Step 2: Generate Prisma Client
  console.log('📦 Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Step 3: Push database schema
  console.log('\n💾 Pushing database schema...');
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });

  console.log('\n✅ Database setup complete!');
  console.log('\nYou can now run: npm run build && npm start');

} catch (error) {
  console.error('\n❌ Error during database setup:', error.message);
  process.exit(1);
}
