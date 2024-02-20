import React, { useEffect, useState } from 'react'
import { AppIcon } from './Icons/AppIcon'
import { Category } from './Category'
import { PlusIcon } from './Icons/PlusIcon'
import { RecordsPart2 } from './RecordsPart2'
import Link from 'next/link'
import { AddRecord } from './AddRecord'
import { CategoryForm } from './CategoryForm'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/router'

export const Records = () => {
    const [all, setAll] = useState();
    const [exp, setExp] = useState();
    const [inc, setInc] = useState();
    const [userId, setUserId] = useState(null);
    const [data, setData] = useState([]);
    const [decodedToken, setDecodedToken] = useState();
    const [userDatas, setUserDatas] = useState([]);

    const [token, setToken] = useState();
    const router = useRouter();
    const { name } = router.query;

    const handleFilterChange = (filterType) => {
        setAll(filterType === 'all');
        setInc(filterType === 'inc');
        setExp(filterType === 'exp')
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                console.error("Token not found");
                return;
            }
            const response = await axios.get("http://localhost:8000/categories", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            setData(response.data);

        } catch (error) {
            console.error(error)
        }

    };

    const getUserData = async () => {
        const res = await axios.get("http://localhost:8000/signup");
        setUserDatas(res.data);
    }
    useEffect(() => {
        getUserData();

        const token = localStorage.getItem("authToken");
        if (!token) {
            router.push('/')
            alert("Please log in")
            console.log("Token not found");
            return;
        }
        setToken(token);
        try {
            const decodedToken = jwtDecode(token);
            setDecodedToken(decodedToken);
            setUserId(decodedToken.userId)
            fetchData()

        } catch (error) {
            console.error("INvalidd token", error)
        }

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
            const token = localStorage.getItem("authToken");
            if (!token) {
                console.error('Token not found');
                return;
            }
            const response = await axios.delete("http://localhost:8000/categories", {
                headers: { 'Authorization': `Bearer ${token}` },
            })

            if (response.status === 202) {
                fetchData();
            } else {
                console.error("error deleting")
            }

        } catch (error) {
            console.error(error)
        }
    }

    const deleteSpecificCategory = async (categoryId) => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                console.error('Token not found');
                return;
            }
            const res = await axios.delete(`http://localhost:8000/categories/${categoryId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status === 202) {
                fetchData();
            } else {
                console.error('Error Deleting category');
            }
        } catch (error) {
            console.error("Erroroororro", error);
        }
    }

    const [addRecords, setAddRecords] = useState(false);
    const [categoryForm, setCategoryForm] = useState(false);
    const [range, setRange] = useState();

    console.log("latest branch")

    return (
        <>
            <div className='w-[100vw] pb-10 flex flex-col bg-[#F3F4F6]'>
                <div className='w-full px-[340px] py-6 bg-white'>
                    <div className='flex justify-between '>
                        <div className='flex gap-6 items-center'>
                            <AppIcon />
                            <Link href={`/dashboard/${userId}`}><button>Dashboard</button></Link>
                            <h1 className='font-semibold'>Records</h1>
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className='p-4 btn btn-primary text-white rounded-full'>+ Record</div>
                            <img src="" alt="" />
                            {userDatas.map((userData) => userData.id === userId ? userData.name : null)}
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
                                    <input value={all} type="radio" checked={all} onChange={() => { setAll(true); setInc(false); setExp(false); handleFilterChange('all') }} className="radio radio-primary rounded-full" />
                                    <div className="label-text">All</div>
                                </label>
                                <label className="flex gap-2 cursor-pointer">
                                    <input value={inc} type="radio" checked={inc} onChange={() => { setAll(false); setInc(true); setExp(false); handleFilterChange('inc') }} className="radio radio-primary rounded-full" />
                                    <div className="label-text">Income</div>
                                </label>
                                <label className="flex gap-2 cursor-pointer">
                                    <input value={exp} type="radio" checked={exp} onChange={() => { setAll(false); setInc(false); setExp(true); handleFilterChange('exp') }} className="radio radio-primary rounded-full" />
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
                                {data.map((categoryData) => categoryData.user_id === userId ? <div className='flex justify-between'><Category key={categoryData.id} text={categoryData.name} /> <button onClick={() => deleteSpecificCategory(categoryData.id)} className='bg-gray-400 p-1 rounded-full w-4 h-4 flex justify-center items-center text-white'>-</button> </div> : null)}
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

                    <RecordsPart2 filterType={all ? 'all' : exp ? 'exp' : 'inc'} />
                </div>

            </div >
            {addRecords ? <AddRecord /> : <></>}
            {categoryForm ? <CategoryForm /> : <></>}
        </>
    )
}
