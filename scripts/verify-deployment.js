# Deployment Verification Script
# Run this after deployment to ensure everything is working

#!/usr/bin/env node

const http = require('http');

const BASE_URL = process.env.DEPLOYMENT_URL || 'http://localhost:3000';

console.log(`🔍 Verifying deployment at ${BASE_URL}\n`);

const endpoints = [
  { path: '/', name: 'Homepage' },
  { path: '/api/health', name: 'Health Check' },
  { path: '/api/dashboard', name: 'Dashboard API' },
  { path: '/api/products', name: 'Products API' },
  { path: '/api/customers', name: 'Customers API' },
  { path: '/api/bills', name: 'Bills API' },
];

async function checkEndpoint(endpoint) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    http.get(`${BASE_URL}${endpoint.path}`, (res) => {
      const duration = Date.now() - startTime;
      
      if (res.statusCode === 200) {
        console.log(`✅ ${endpoint.name}: ${endpoint.path} (${duration}ms)`);
        resolve(true);
      } else {
        console.log(`⚠️  ${endpoint.name}: ${endpoint.path} - Status ${res.statusCode} (${duration}ms)`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`❌ ${endpoint.name}: ${endpoint.path} - ${err.message}`);
      resolve(false);
    });
  });
}

async function runVerification() {
  let successCount = 0;
  
  for (const endpoint of endpoints) {
    const success = await checkEndpoint(endpoint);
    if (success) successCount++;
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Verification Complete: ${successCount}/${endpoints.length} endpoints working`);
  
  if (successCount === endpoints.length) {
    console.log('✅ All systems operational!');
    process.exit(0);
  } else {
    console.log('⚠️  Some endpoints are not working correctly');
    process.exit(1);
  }
}

runVerification().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
