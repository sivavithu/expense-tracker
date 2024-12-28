'use server';
import { db } from "@/lib/db";
import { auth } from '@clerk/nextjs/server';

async function getUserBalance(): Promise<{
  balance?: number;
  error?: string;
}> {
  const { userId } = await auth(); // Ensure you await `auth()` to get the userId

  if (!userId) {
    return { error: 'User not logged in' };
  }

  try {
    const transactions = await db.transactions.findMany({
      where: { userId },
    });

    const balance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    return { balance };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}

export default getUserBalance;
