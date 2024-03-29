import React, { useContext, useEffect, useState } from 'react'
import { LeftArrowIcon } from './Icons/LeftArrowIcon'
import { RightArrowIcon } from './Icons/RightArrowIcon'
import { DownIcon } from './Icons/DownIcon'
import { IncomeExpense } from './IncomeExpense'
import { Select } from './Select'
import { RecordContext } from '@/context/RecordCont'
import axios from 'axios'
import { useRouter } from 'next/router'
import { DeleteIcon } from './Icons/DeleteIcon'

export const RecordsPart2 = ({ filterType }) => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);

    const router = useRouter();
    const { userId } = router.query;
    console.log('branch')

    const fetchTransactionsData = async (filterType) => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await axios.get(`http://localhost:8000/transactions?user_id=${userId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setData(res.data);
            console.log('data', res.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        fetchTransactionsData()
        fetchCategoriesData()
    }, []);

    const deleteAllTransactions = async () => {
        try {
            const token = localStorage.getItem("authToken")
            await axios.delete("http://localhost:8000/transactions", {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchTransactionsData();
        } catch (error) {
            console.error(error)
        }
    }
    const deleteSpecificTransaction = async (transactionId) => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await axios.delete(`http://localhost:8000/transactions/${transactionId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.status === 202) {
                fetchTransactionsData()
            } else {
                console.error("Error deleting transaction");
            }
        } catch (error) {
            console.error(error);
        }
    }
    const fetchCategoriesData = async () => {
        try {
            const token = localStorage.getItem("authToken")
            if (!token) {
                console.log("token not found");
                return
            }
            const res = await axios.get(`http://localhost:8000/categories?user_id=${userId}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            setCategories(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    // const filteredTransactions = data.filter((transaction => transaction.user_id !== userId));
    // console.log('filtered', filteredTransactions)
    return (
        <div className='w-full flex flex-col'>
            <div className='flex justify-between'>
                <div className='flex gap-2 justify-center items-center'>
                    <div className="join">
                        <button className="join-item btn">«</button>
                        <button className="join-item btn">Last 30 Days</button>
                        <button className="join-item btn">»</button>
                    </div>
                </div>
                <div>
                    <select className="select select-bordered w-full max-w-xs font-semibold">
                        <option selected>Newest first</option>
                        <option>Latest</option>
                        <option>Custom</option>
                    </select>
                </div>
            </div>
            <div className='flex flex-col gap-6 mt-4'>
                <div className='bg-white px-6 py-2 rounded-lg'>
                    <div className="form-control">
                        <label className="cursor-pointer flex gap-2 items-center justify-between">
                            <div className='flex gap-2'>
                                <input type="checkbox" className="checkbox checkbox-primary" />
                                <span className="label-text">Select all</span>
                            </div>
                            <button onClick={deleteAllTransactions}>Clear</button>
                        </label>
                    </div>
                </div>


                <div className='flex flex-col gap-4'>
                    {data.map((transaction) => (
                        transaction.user_id === userId ? (
                            <div key={transaction.id} className='flex flex-col gap-3'>
                                <div className='bg-white px-6 py-3 rounded-lg '>
                                    <div className="form-control">
                                        <label className="cursor-pointer flex gap-2 items-center justify-between">
                                            <div className='flex gap-4 justify-center items-center'>
                                                <input type="checkbox" className="checkbox checkbox-primary" />
                                                {categories.map((category) =>
                                                    category.id === transaction.category_id && category.user_id === transaction.user_id ? (
                                                        <div key={category.id}>
                                                            {category.category_image}
                                                        </div>
                                                    ) : null
                                                )}
                                                <div className="label-text flex flex-col text-xs">
                                                    {categories.map((category) => category.id === transaction.category_id ? <div className='text-base'>{category.name}</div> : null)}
                                                    <p className='text-gray-500'>{transaction.transaction_time.slice(0, -3)}</p>
                                                </div>
                                            </div>
                                            <div className='flex gap-8 items-center'>
                                                <p className={` ${transaction.transaction_type === 'EXP' ? "text-red-500" : "text-[#23E01F]"} font-bold`}>
                                                    {`${transaction.transaction_type === 'EXP' ? "-" : "+"}`}
                                                    {transaction.amount}₮
                                                </p>
                                                <button onClick={() => deleteSpecificTransaction(transaction.id)} className='btn p-1'><DeleteIcon /></button>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ) : null

                    ))}
                </div>

                {/* <IncomeExpense day={date} />
                    <Select text={category} time={time} expense={amount} /> */}
                {/* <Select text="Food & Drinks" time="14:00" expense="-1,000" />
                    <Select text="Food & Drinks" time="14:00" expense="-1,000" />
                    <Select text="Food & Drinks" time="14:00" expense="-1,000" />
                    <Select text="Food & Drinks" time="14:00" expense="-1,000" /> */}
            </div>
            <div className='flex flex-col gap-3'>
                {/* <IncomeExpense day="Yesterday" /> */}
                {/* <Select text="Food & Drinks" time="14:00" expense="-1,000" />
                    <Select text="Food & Drinks" time="14:00" expense="-1,000" />
                    <Select text="Food & Drinks" time="14:00" expense="-1,000" />
                    <Select text="Food & Drinks" time="14:00" expense="-1,000" />
                    <Select text="Food & Drinks" time="14:00" expense="-1,000" />
                    <Select text="Food & Drinks" time="14:00" expense="-1,000" /> */}
            </div>
        </div>

    )
}
