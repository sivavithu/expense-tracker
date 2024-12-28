'use client'
import { toast } from 'react-toastify';
import { Transaction } from '../types/Transaction';
import { addCommas } from '../lib/utils';
import deleteTransaction from '../app/actions/deleteTransaction';


const TransactionItem=({transaction}:{transaction:Transaction})=>{

    const handleDeleteTransaction=async(transactionId:string)=>{
        const confirmed=window.confirm('are you sure to delete this transaction');
        if(!confirmed)return;
        const {message,error}=await deleteTransaction(transactionId);
        if(error) toast.error(error)
        toast.success('transaction deleted')
    }

    const sign=transaction.amount<0?'-':'+';
    return(
        <li className={transaction.amount<0?'minus':'plus'}>
            {transaction.text}
            <span>{sign}${addCommas(Math.abs(transaction.amount))}</span>
            <button onClick={()=>handleDeleteTransaction(transaction.id)} 
                className='delete-btn'>x</button>
        </li>
    )
}
export default TransactionItem;