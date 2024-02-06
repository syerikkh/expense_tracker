import React, { useContext, useEffect, useState } from 'react'
import { LeftArrowIcon } from './Icons/LeftArrowIcon'
import { RightArrowIcon } from './Icons/RightArrowIcon'
import { DownIcon } from './Icons/DownIcon'
import { IncomeExpense } from './IncomeExpense'
import { Select } from './Select'
import { RecordContext } from '@/context/RecordCont'
import axios from 'axios'

export const RecordsPart2 = () => {
    const [data, setData] = useState([]);
    const fetchTransactionsData = async () => {
        const res = await axios.get("http://localhost:8000/transactions");
        setData(res.data);
        console.log('data', res.data)
    };

    useEffect(() => {
        fetchTransactionsData()
    }, []);

    const deleteTransactions = async () => {
        try {
            await axios.delete("http://localhost:8000/transactions");
            fetchTransactionsData();
        } catch (error) {
            console.error(error)
        }
    }

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
                            <button onClick={deleteTransactions}>Clear</button>
                        </label>
                    </div>
                </div>


                <div>
                    {data.map((transaction) => (
                        <div key={transaction.id} className='flex flex-col gap-3'>
                            <div className='bg-white px-6 py-3 rounded-lg '>
                                <div className="form-control">
                                    <label className="cursor-pointer flex gap-2 items-center justify-between">
                                        <div className='flex gap-4'>
                                            <input type="checkbox" className="checkbox checkbox-primary" />
                                            <div className="label-text flex flex-col text-xs">
                                                <div className='font-semibold'>{transaction.name}</div>
                                                <div>{transaction.transaction_time}</div>
                                            </div>
                                        </div>
                                        <p className={` ${transaction.transaction_type === 'EXP' ? "text-red-500" : "text-[#23E01F]"} font-bold`}>{transaction.amount}₮</p>
                                    </label>
                                </div>
                            </div>
                        </div>

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
