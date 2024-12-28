'use server';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Transaction } from '../../types/Transaction';

async function getTransactions(): Promise<{
  transactions?: Transaction[];
  error?: string;
}> {
  // Await and destructure userId from auth
  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not logged in' };
  }

  try {
    // Use the extracted userId in the query
    const transactions = await db.transactions.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { transactions };
  } catch (error: unknown) {
    // Handle errors safely
    return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}

export default getTransactions;
