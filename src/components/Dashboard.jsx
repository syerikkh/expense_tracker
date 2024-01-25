import React from 'react'
import { AppIcon } from './Icons/AppIcon'

export const Dashboard = () => {
    return (
        <div className='w-[100vw] h-[100vh] flex flex-col'>
            <div className='w-full px-[120px] py-6'>
                <div className='flex justify-between '>
                    <div className='flex gap-6'>
                        <AppIcon />
                        <h1 className='font-semibold'>Dashboard</h1>
                        <h1>Records</h1>
                    </div>
                    <div>
                        <div className='p-2 bg-[#0166FF] text-white rounded-full'>+ Record</div>
                        <img src="" alt="" />
                    </div>
                </div>
            </div>
            <div className='w-full px-[120px]'>
                <div className='flex'>
                    <div className='w-96 h-72 bg-[#0166FF] rounded-xl p-10'>
                        <AppIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}
