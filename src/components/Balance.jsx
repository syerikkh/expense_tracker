import React from 'react'
import { CoinsIcon } from './Icons/CoinsIcon'
import { AppIcon } from './Icons/AppIcon'
import Link from 'next/link'

export const Balance = () => {
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
                        <li className="step step-primary">Balance</li>
                        <li className="step">Finish</li>
                    </ul>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center mt-[141px]'>
                <div className='flex flex-col w-96'>
                    <div className='flex flex-col gap-2 justify-center items-center'>
                        <CoinsIcon />
                        <h1 className='font-semibold text-2xl'>Set up your cash Balance</h1>
                    </div>
                    <div className='mt-6'>
                        <input type="text" placeholder='Email' className='p-1 rounded-md w-full border' />
                    </div>
                    <div className='text-xs text-[#475569] mt-1'>How much cash do you have in your wallet?</div>
                    <Link href={'/finish'}><button className="bg-[#0166FF] text-white p-4 w-full rounded-3xl mt-8">Confirm</button></Link>
                </div>


            </div>

        </div>
    )
}
