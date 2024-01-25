import React from 'react'
import { AppIcon } from './Icons/AppIcon'
import { MoneyIcon } from './Icons/MoneyIcon'
import { BlueLabel } from './BlueLabel'
import Link from 'next/link'

export const Currency = () => {
    return (
        <div className='w-[100vw] h-[100vh]'>
            <div className='flex flex-col gap-12 justify-center items-center pt-10'>
                <div className='flex justify-center items-center'>
                    <AppIcon />
                    <h1 className="font-semibold text-3xl">Geld</h1>
                </div>
                <div>
                    <ul className='steps steps-horizontal w-80'>
                        <li className="step step-primary">Currency</li>
                        <li className="step ">Balance</li>
                        <li className="step">Finish</li>
                    </ul>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center mt-[141px]'>
                <div className='flex flex-col w-96'>
                    <div className='flex flex-col gap-2 justify-center items-center'>
                        <MoneyIcon />
                        <h1 className='font-semibold text-2xl'>Select base currency</h1>
                    </div>
                    <div className='mt-6'>
                        <select className="select select-bordered font-semibold w-full">
                            <option>MNT - Mongolian Tugrik</option>
                            <option>USD - USA Dollar</option>
                            <option>JPY - Japanese Yen</option>
                        </select>
                    </div>
                    <div className='text-xs text-[#475569] mt-1'>Your base currency should be the one you use most often. All transaction in other currencies will be calculated based on this one </div>
                    <Link href={'/balance'}><button className="bg-[#0166FF] text-white p-4 w-full rounded-3xl mt-8">Confirm</button></Link>
                </div>


            </div>

        </div >
    )
}
