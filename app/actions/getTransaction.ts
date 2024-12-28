'use server'
import { db } from "@/lib/db";
import { auth } from '@clerk/nextjs/server';
import { Transaction } from '../../types/Transaction';



async function getTransactions():Promise <{
    transaction?:Transaction[];
    error?:string;
    
}>{
    const userId=auth();

    if(!userId){
        return {error:'User not logged in'}
    }

    try{
        const transactions=await db.transactions.findMany({
            where:{userId},
            orderBy:{
                createdAt:'desc',
            }
        })
       
        return {transactions}
    }
    catch(error){
        return {error:error}
    }
}
export default getTransactions;