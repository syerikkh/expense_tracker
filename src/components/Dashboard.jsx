import React, { useEffect, useState } from 'react'
import { AppIcon } from './Icons/AppIcon'
import { GreenDot } from './Icons/GreenDot'
import { LeadingIcon } from './Icons/LeadingIcon'
import { BlueDot } from './Icons/BlueDot'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import axiosInstance from '@/pages/axiosInstance'
import AxiosInstance from '@/pages/axiosInstance'
import createAxiosInstance from '@/pages/axiosInstance'
export const Dashboard = () => {
    const router = useRouter();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    alert("Please log in");
                    router.push('/');
                    return;
                }

                // const res = await axiosInstance.get("/profile");

                const res = await axios.get('http://localhost:8000/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('tokenasdasd', token);
                setUserId(res.data.message.split(', ')[1]);
            } catch (error) {
                console.error(error);

            }
        };
        fetchProtectedData();
    }, [router]);


    return (
        <div className='w-[100vw] h-[100vh] flex flex-col bg-[#F3F4F6]'>
            <div className='w-full px-[340px] py-6 bg-white'>
                <div className='flex justify-between '>
                    <div className='flex gap-6'>
                        <AppIcon />
                        <h1 className='font-semibold'>Dashboard</h1>
                        <Link href={`/records/${userId}`}><button>Records</button></Link>
                    </div>
                    <div>
                        <div className='p-2 bg-[#0166FF] text-white rounded-full'>+ Record</div>
                        <img src="" alt="" />
                    </div>
                </div>
            </div>
            <div className='w-full px-[340px] mt-9'>
                <div className='grid grid-cols-3 gap-6'>
                    <div className='rounded-2xl bg-[#0166FF] p-6 flex items-end'>
                        <div>
                            <p className='text-gray-400'>Cash</p>
                            <p className='text-2xl text-white font-bold'> 10,000,00</p>
                        </div>
                    </div>
                    <div className='rounded-2xl bg-white'>
                        <div className='h-14 w-full border-b-2 rounded-t-2xl p-6 flex  items-center gap-3'>
                            <GreenDot />
                            <h1 className='font-semibold'>Your Income</h1>
                        </div>
                        <div className='p-6 flex flex-col gap-4'>
                            <div>
                                <h1 className='font-bold text-2xl'>1,200,000 ₮</h1>
                                <p className='text-[#64748B]'>Your Income Amount</p>
                            </div>
                            <div className='flex gap-2'>
                                <LeadingIcon />
                                <p>32% from last month</p>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-2xl bg-white'>
                        <div className='h-14 w-full border-b-2 rounded-t-2xl p-6 flex  items-center gap-3'>
                            <BlueDot />
                            <h1 className='font-semibold'>Total Expenses</h1>
                        </div>
                        <div className='p-6 flex flex-col gap-4'>
                            <div>
                                <h1 className='font-bold text-2xl'>-1,200,000 ₮</h1>
                                <p className='text-[#64748B]'>Your Income Amount</p>
                            </div>
                            <div className='flex gap-2'>
                                <LeadingIcon />
                                <p>32% from last month</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-6 mt-6'>
                    <div className='bg-white rounded-2xl'>
                        <div className='h-14 w-full p-6 border-b-2 flex items-center'>
                            <h1 className='font-semibold'>Income - Expense</h1>
                        </div>
                        <div className='py-8 px-6'>
                            <div class="w-full">
                                <canvas
                                    data-te-chart="bar"
                                    data-te-labels="['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday ']"
                                    data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]">
                                </canvas>
                            </div>
                        </div>
                    </div>
                    <div className=' bg-white rounded-2xl'>
                        <div className='h-14 w-full p-6 border-b-2 flex items-center'>
                            <h1 className='font-semibold'>Income - Expense</h1>
                        </div>
                        <div className='py-8 px-6'>
                            <div class="w-full">
                                <canvas
                                    data-te-chart="bar"
                                    data-te-labels="['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday ']"
                                    data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]">
                                </canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
