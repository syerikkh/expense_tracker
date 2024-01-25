import React from 'react'
import { AppIcon } from './Icons/AppIcon'
import { CheckIcon } from './Icons/CheckIcon'
import Link from 'next/link'

export const Finish = () => {
    return (
        <div>
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
                            <li className="step step-primary">Finish</li>
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center mt-[141px]'>
                    <div className='flex flex-col w-96'>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <CheckIcon />
                            <h1 className='font-semibold text-2xl'>Good Job!</h1>
                        </div>
                        <div className='text-xs text-[#475569] text-center mt-1'>Your very first account has been created. Now continue to dashboard and start tracking</div>
                        <Link href={'/dashboard'}><button className="bg-[#0166FF] text-white p-4 w-full rounded-3xl mt-8">Go to Dashboard</button></Link>
                    </div>


                </div>

            </div>
        </div>
    )
}
