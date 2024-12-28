'use client';
import addTransaction from '../app/actions/addTransaction';
import { toast } from 'react-toastify';
import { useRef } from 'react';

const AddTransactions = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (formData: FormData) => {
    const { data, error } = await addTransaction(formData);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Transaction added');
      formRef.current?.reset(); // Corrected from `Current` to `current`
    }
  };

  return (
    <>
      <h3>Add Transactions</h3>
      <form ref={formRef} action={clientAction}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" id="text" name="text" placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount<br />(negative-expense, positive-income)
          </label>
          <input
            type="number" // Changed input type to "number" for better validation
            id="amount"
            name="amount"
            placeholder="Enter number..."
            step="0.01"
          />
          <button className="btn">Add Transaction</button>
        </div>
      </form>
    </>
  );
};

export default AddTransactions;
