import React from 'react';
import Guest from "@/components/Guest";
import { currentUser } from '@clerk/nextjs/server';

import AddTransactions from '../components/AddTrasanctions';
import Balance from '../components/Balance';
import IncomeExpense from '../components/IncomeExpense';
import TransactionList from '../components/TransactionList';


const HomePage = async () => {
  const user = await currentUser();
  
  if (!user) {
    return <Guest />;
  }

  return (
    <main>
      <h1>Welcome, {user.firstName || "Guest"}</h1>
      <IncomeExpense/>
      <Balance/>
      <AddTransactions/>
      <TransactionList/>
    </main>
  );
};

export default HomePage;
