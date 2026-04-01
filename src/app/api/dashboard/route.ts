import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';

export async function GET() {
  try {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());
    const monthStart = startOfMonth(new Date());
    const monthEnd = endOfMonth(new Date());

    // Wrap Prisma calls in individual try-catches or handle empty results gracefully
    const totalProducts = (await prisma.product.count()) || 0;
    const lowStockItems = (await prisma.product.findMany({
      where: { quantity: { lt: 5 } },
    })) || [];

    const products = (await prisma.product.findMany()) || [];
    const totalStockValue = products.reduce((acc: number, p: any) => acc + (p.purchasePrice * p.quantity), 0);

    const allBills = (await prisma.bill.findMany({
      include: { 
        items: { 
          include: { 
            product: true 
          } 
        } 
      },
    })) || [];

    const totalSales = allBills.reduce((acc: number, b: any) => acc + (b.finalAmount || 0), 0);
    const totalPendingAmount = allBills.reduce((acc: number, b: any) => acc + ((b.finalAmount || 0) - (b.paidAmount || 0)), 0);

    const todayBills = allBills.filter((b: any) => {
      const bDate = new Date(b.createdAt);
      return bDate >= todayStart && bDate <= todayEnd;
    });
    const todaySales = todayBills.reduce((acc: number, b: any) => acc + (b.finalAmount || 0), 0);
    const todayBillCount = todayBills.length;

    const monthBills = allBills.filter((b: any) => {
      const bDate = new Date(b.createdAt);
      return bDate >= monthStart && bDate <= monthEnd;
    });
    const monthlySales = monthBills.reduce((acc: number, b: any) => acc + (b.finalAmount || 0), 0);

    const totalProfit = allBills.reduce((acc: number, bill: any) => {
      const billProfit = (bill.items || []).reduce((bAcc: number, item: any) => {
        const purchasePrice = item.product?.purchasePrice || 0;
        const itemProfit = ((item.price || 0) - purchasePrice) * (item.quantity || 0);
        return bAcc + itemProfit;
      }, 0);
      return acc + billProfit;
    }, 0);

    const todayProfit = todayBills.reduce((acc: number, bill: any) => {
      const billProfit = (bill.items || []).reduce((bAcc: number, item: any) => {
        const purchasePrice = item.product?.purchasePrice || 0;
        const itemProfit = ((item.price || 0) - purchasePrice) * (item.quantity || 0);
        return bAcc + itemProfit;
      }, 0);
      return acc + billProfit;
    }, 0);

    return NextResponse.json({
      totalProducts,
      totalStockValue,
      totalSales,
      totalProfit,
      totalPendingAmount,
      todaySales,
      todayBillCount,
      todayProfit,
      monthlySales,
      lowStockItems,
    });
  } catch (error: any) {
    console.error('CRITICAL: Dashboard API failure:', error);
    // Return empty stats instead of crashing the whole page
    return NextResponse.json({
      totalProducts: 0,
      totalStockValue: 0,
      totalSales: 0,
      totalProfit: 0,
      totalPendingAmount: 0,
      todaySales: 0,
      todayBillCount: 0,
      todayProfit: 0,
      monthlySales: 0,
      lowStockItems: [],
      error: 'Data connection error',
      message: error.message
    }, { status: 200 }); // Still return 200 so frontend doesn't show crash UI
  }
}
