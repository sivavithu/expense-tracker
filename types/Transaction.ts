export interface Transaction {
    text: string;
    amount: number;
    userId: string;
    id: string;
    createdAt: Date;
    test?: string; // Make `test` optional if it's not always present
  }
  