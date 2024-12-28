'use server'
import { db } from "@/lib/db";
import { auth } from '@clerk/nextjs/server';
import IncomeExpense from '../../components/IncomeExpense';



async function getIncomeExpense():Promise <{
    income?:number;
    expense?:number;
    error?:string;
    
}>{
    const userId=auth();

    if(!userId){
        return {error:'User not logged in'}
    }

    try{
        const transactions=await db.transactions.findMany({
            where:{userId}
        })
        const amounts=transactions.map((transaction)=>transaction.amount);
        const income=amounts.filter((item)=>item>0).reduce((acc,item)=>acc+item,0)
        const expense=amounts.filter((item)=>item<0).reduce((acc,item)=>acc+item,0)
        console.log(income,expense)
        return {income,expense:Math.abs(expense)};
    }
    catch(error){
        return {error:error}
    }
}

export default getIncomeExpense;