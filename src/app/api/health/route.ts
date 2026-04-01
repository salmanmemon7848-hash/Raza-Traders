import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Check database connection by querying a table
    const productCount = await prisma.product.count();
    const customerCount = await prisma.customer.count();
    const billCount = await prisma.bill.count();
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        status: 'connected',
        products: productCount,
        customers: customerCount,
        bills: billCount,
      },
      uptime: process.uptime(),
    });
  } catch (error: any) {
    console.error('Health check failed:', error);
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: {
        status: 'disconnected',
        error: error.message,
      },
      uptime: process.uptime(),
    }, { status: 503 });
  }
}
