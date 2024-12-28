import { Transaction } from '../types/Transaction';
import getTransactions from '../app/actions/getTransaction';
import TransactionItem from './Transactionitem';
const TransactionList = async() => {
    const {transactions,error}=await getTransactions();

    if(error){
        <p>{error}</p>
    }
    return ( <>
    <h3>History</h3>
    <ul className="list">
        {transactions && transactions.map((transaction:Transaction)=>
        (
           <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
    </ul>
    
    </> );
}
 
export default TransactionList;