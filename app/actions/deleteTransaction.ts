'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

async function deleteTransaction(transactionId: string): Promise<{
  message?: string;
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    await db.transactions.delete({
      where: {
        id: transactionId,
        userId,
      },
    });

    revalidatePath('/');

    return { message: 'Transaction deleted' };
  } catch (error: unknown) {
    // Cast error to a string, or provide a fallback message
    return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}

export default deleteTransaction;
