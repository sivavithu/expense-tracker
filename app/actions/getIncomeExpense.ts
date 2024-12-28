'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  // Await the result of auth()
  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not logged in' };
  }

  try {
    // Fetch transactions filtered by userId
    const transactions = await db.transactions.findMany({
      where: { userId },
    });

    // Calculate income and expense
    const amounts = transactions.map((transaction) => transaction.amount);
    const income = amounts.filter((item) => item > 0).reduce((acc, item) => acc + item, 0);
    const expense = amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0);

    console.log(income, expense);
    return { income, expense: Math.abs(expense) };
  } catch (error: unknown) {
    // Safely handle error
    return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}

export default getIncomeExpense;
