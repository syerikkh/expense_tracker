import React, { useState } from 'react'

export const AddRecord = () => {
    const [close, setClose] = useState(false);
    const [toggleExpense, setToggleExpense] = useState(false);
    const [toggleIncome, setToggleIncome] = useState(false);
    return (
        <div className={`w-full fixed top-0 h-screen flex justify-center items-center ${close && "hidden"}`} >
            <div className='w-screen h-screen bg-[#00000080] absolute left-0 bottom-0'>
            </div>
            <div className='w-[792px] h-auto bg-white absolute top-1/4 rounded-lg flex flex-col'>
                <div className='h-17 w-full py-5 px-6 flex justify-between border-b-2'>
                    <h1 className='font-bold text-lg'>Add Record</h1>
                    <button onClick={() => setClose(!close)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5459 17.954C19.7572 18.1653 19.876 18.452 19.876 18.7509C19.876 19.0497 19.7572 19.3364 19.5459 19.5477C19.3346 19.7591 19.0479 19.8778 18.749 19.8778C18.4501 19.8778 18.1635 19.7591 17.9521 19.5477L12 13.5937L6.0459 19.5459C5.83455 19.7572 5.54791 19.8759 5.24902 19.8759C4.95014 19.8759 4.66349 19.7572 4.45215 19.5459C4.2408 19.3345 4.12207 19.0479 4.12207 18.749C4.12207 18.4501 4.2408 18.1635 4.45215 17.9521L10.4062 11.9999L4.45402 6.04586C4.24268 5.83451 4.12395 5.54787 4.12395 5.24898C4.12395 4.9501 4.24268 4.66345 4.45402 4.45211C4.66537 4.24076 4.95201 4.12203 5.2509 4.12203C5.54978 4.12203 5.83643 4.24076 6.04777 4.45211L12 10.4062L17.954 4.45117C18.1654 4.23983 18.452 4.12109 18.7509 4.12109C19.0498 4.12109 19.3364 4.23983 19.5478 4.45117C19.7591 4.66251 19.8778 4.94916 19.8778 5.24804C19.8778 5.54693 19.7591 5.83358 19.5478 6.04492L13.5937 11.9999L19.5459 17.954Z" fill="#0F172A" />
                        </svg>
                    </button>
                </div>
                <div className='flex flex-1'>
                    <div className='px-5 py-6 w-1/2'>
                        <div className='flex flex-col gap-5'>
                            <div className='bg-[#F3F4F6] rounded-3xl'>
                                <button onClick={() => setToggleExpense(!toggleExpense)} className={`btn shadow-none btn-primary hover:text-white rounded-3xl w-44 ${toggleExpense && "bg-[#F3F4F6] border-none text-black"}`}>Expence</button>
                                < button onClick={() => setToggleIncome(!toggleIncome)} className={`btn shadow-none btn-[#F3F4F6] hover:bg-[#16A34A] text-white rounded-3xl w-44 ${toggleIncome ? "bg-[#16A34A]" : "bg-[#F3F4F6] text-black"}`}>Income</button>

                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='bg-[#F3F4F6] p-3 flex flex-col rounded-lg border'>
                                    <label for="html">Amount</label>
                                    <input type="number" placeholder='₮ 000.00' className='bg-[#F3F4F6]' />
                                </div>
                                <div>
                                    <label for="html">Category</label>
                                    <select className="select select-bordered w-full mt-1 text-[#94A3B8]">
                                        <option>{toggleExpense ? "Find or choose category" : "Food & Drinks"}</option>
                                        <option>Shopping</option>
                                        <option>Housing</option>
                                        <option>Transportation</option>
                                        <option>Vehicle</option>
                                        <option>Life & Entertainment</option>
                                        <option>Communication, PC</option>
                                        <option>Financial expenses</option>
                                        <option>Investments</option>
                                        <option>Income</option>
                                        <option>Others</option>
                                    </select>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex flex-col'>
                                        <label for="html">Date</label>
                                        <input type="date" className='border p-2 rounded-lg' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label for="html">Time</label>
                                        <input type="time" className='border p-2 rounded-lg' />
                                    </div>
                                </div>
                            </div>
                            <div className='mt-2'><button className={`btn btn-primary shadow-none border-none rounded-3xl w-full ${toggleExpense && "bg-[#16A34A] hover:bg-[#16A34A]"}`}> Add Record</button></div>
                        </div>
                    </div>
                    <div className='px-5 py-6 w-1/2 flex flex-col gap-8'>
                        <div className='flex flex-col'>
                            <label for="html">Payee</label>
                            <select className="select select-bordered w-full mt-1">
                                <option>Write Here</option>
                                <option>Han Solo</option>
                                <option>Greedo</option>
                            </select>
                        </div>
                        <div className='flex flex-col h-full gap-1'>
                            <label for="html">Note</label>
                            <input type="text" placeholder='Write here' className='bg-[#F3F4F6] p-4 h-full rounded-lg border' />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
