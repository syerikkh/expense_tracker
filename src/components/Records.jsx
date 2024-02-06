import React, { useEffect, useState } from 'react'
import { AppIcon } from './Icons/AppIcon'
import { Category } from './Category'
import { PlusIcon } from './Icons/PlusIcon'
import { RecordsPart2 } from './RecordsPart2'
import Link from 'next/link'
import { AddRecord } from './AddRecord'
import { CategoryForm } from './CategoryForm'
import axios from 'axios'

export const Records = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/categories");
            setData(response.data);
        } catch (error) {
            console.error(error)
        }

    }
    useEffect(() => {
        fetchData()
    }, []);

    // const deleteCategory = async (categoryId) => {
    //     try {
    //         await axios(`http://localhost:8000/categories/${categoryId}`);
    //         fetchData();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const clearAllCategories = async () => {
        try {
            await axios.delete("http://localhost:8000/categories")
            fetchData();
        } catch (error) {
            console.error(error)
        }
    }

    const [addRecords, setAddRecords] = useState(false);
    const [categoryForm, setCategoryForm] = useState(false);
    const [range, setRange] = useState();
    return (
        <>
            <div className='w-[100vw] h-screen flex flex-col bg-[#F3F4F6]'>
                <div className='w-full px-[340px] py-6 bg-white'>
                    <div className='flex justify-between '>
                        <div className='flex gap-6'>
                            <AppIcon />
                            <Link href={`/dashboard/${userId}`}><button>Dashboard</button></Link>
                            <h1 className='font-semibold'>Records</h1>
                        </div>
                        <div>
                            <div className='p-2 bg-[#0166FF] text-white rounded-full'>+ Record</div>
                            <img src="" alt="" />
                        </div>
                    </div>
                </div>
                <div className='flex gap-4 px-[340px] mt-9'>
                    <div className='py-6 px-3 flex flex-col gap-6 bg-white rounded-lg w-[282px]'>
                        <h1 className='font-semibold text-xl'>Records</h1>
                        <button onClick={() => setAddRecords(!addRecords)} className="btn btn-primary rounded-3xl flex gap-2 w-[250px] h-8">+ Add</button>

                        <input type="text" placeholder='Search' className='p-2 rounded-lg border' />
                        <div>
                            <p className='font-bold'>Types</p>
                            <div className="form-control gap-2 mt-4">
                                <label className="flex gap-2 cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-primary rounded-full" />
                                    <div className="label-text">All</div>
                                </label>
                                <label className="flex gap-2 cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-primary rounded-full" />
                                    <div className="label-text">Income</div>
                                </label>
                                <label className="flex gap-2 cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-primary rounded-full" />
                                    <div className="label-text">Expense</div>
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <p className='font-bold'>Category</p>
                                <button onClick={clearAllCategories} className='text-[#1F2937]'>Clear</button>
                            </div>
                            <div className='mt-4 flex flex-col gap-2'>
                                {data.map((categoryData) => {
                                    return (
                                        <Category key={categoryData.id} text={categoryData.name} />
                                    )
                                })}
                                {/* <Category text="Food & Drinks" />
                                <Category text="Shopping" />
                                <Category text="Housing" />
                                <Category text="Transportation" />
                                <Category text="Vehicle" />
                                <Category text="Life & Entertainment" />
                                <Category text="Communication, PC" />
                                <Category text="Financial expenses" />
                                <Category text="Investments" />
                                <Category text="Income" />
                                <Category text="Others" /> */}
                            </div>
                            <div>
                                <button onClick={() => { setCategoryForm(!categoryForm) }} className='flex gap-2 justify-center items-center mt-2'>
                                    <PlusIcon />
                                    Add Category</button>
                            </div>
                        </div>
                        <div>
                            <p className='font-bold'>Amount Range</p>
                            <div className='flex justify-between gap-2 w-full'>
                                <div className='p-4 bg-[#F3F4F6] mt-2 w-[114px] rounded-lg'>
                                    <p>0</p>
                                </div>
                                <div className='p-4 bg-[#F3F4F6] mt-2 w-[114px] rounded-lg flex justify-center items-center'>
                                    <p>{range}</p>
                                </div>
                            </div>
                            <input value={range} onChange={e => setRange(e.target.value)} type="range" min={0} max="1000" className="range w-full range-primary mt-4" />
                        </div>
                    </div>

                    <RecordsPart2 />
                </div>

            </div >
            {addRecords ? <AddRecord /> : <></>}
            {categoryForm ? <CategoryForm /> : <></>}
        </>
    )
}
