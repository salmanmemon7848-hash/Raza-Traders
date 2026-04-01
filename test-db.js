// Test script to check database and API functionality
const { PrismaClient } = require('@prisma/client');

async function testDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Testing database connection...');
    
    // Test 1: Check connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Test 2: Try to create a product
    console.log('\nTest: Creating a product...');
    const testProduct = await prisma.product.create({
      data: {
        name: 'Test Product',
        companyName: 'Test Company',
        modelNumber: 'TEST-001',
        purchasePrice: 100.00,
        sellingPrice: 150.00,
        quantity: 10,
      },
    });
    console.log('✅ Product created:', testProduct.id);
    
    // Test 3: Read products
    console.log('\nReading all products...');
    const products = await prisma.product.findMany();
    console.log(`✅ Found ${products.length} products`);
    
    // Clean up test product
    console.log('\nCleaning up test product...');
    await prisma.product.delete({
      where: { id: testProduct.id },
    });
    console.log('✅ Test product deleted');
    
    console.log('\n🎉 All tests passed!');
    
  } catch (error) {
    console.error('❌ Error during test:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
