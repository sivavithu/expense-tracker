'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db'; // Ensure db is properly configured
import { revalidatePath } from 'next/cache';


interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

async function addTransaction(formData: FormData): Promise<TransactionResult> {
  const textValue = formData.get('text');
  const amountValue = formData.get('amount');

  if (!textValue || !amountValue || textValue === '') {
    return { error: 'Please fill in both fields.' };
  }

  const text = textValue.toString();
  const amount = parseFloat(amountValue.toString());

  const { userId } = await auth();
  console.log('User ID:', userId);

  if (!userId) {
    return { error: 'Please login first.' };
  }

  try {
    // Adjust this line based on your database library
    const transactionData = await db.transactions.create({
      data: {
        text,
        amount,
        userId,
      },
    });

    revalidatePath('/');
    return { data: transactionData };
  } catch (error: any) {
    console.error('Database Error:', error);
    return { error: error.message || 'An unknown error occurred.' };
  }
}

export default addTransaction;
