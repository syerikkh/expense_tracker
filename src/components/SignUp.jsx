import React from 'react'
import { AppIcon } from './Icons/AppIcon'
import Link from 'next/link'
import { BlueLabel } from './BlueLabel'

export const SignUp = () => {
    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <div className="w-1/2 h-full bg-[#0166FF] flex justify-center items-center">
                <h1 className="text-white text-9xl font-bold">Track<br></br> Your<br></br> Expenses</h1>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <div className="flex flex-col gap-10 justify-center items-center w-96">
                    <div className="flex justify-center items-center gap-3">
                        <AppIcon />
                        <h1 className="font-semibold text-3xl">Geld</h1>
                    </div>
                    <div className="text-center flex gap-3 flex-col">
                        <h1 className="font-semibold text-3xl">Create Geld account</h1>
                        <p className="text-xl text-[#334155]">Sign up below to create your Wallet account</p>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div>
                            <input type="text" placeholder="Name" className="p-2 border w-full rounded-md"></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Email" className="p-2 border w-full rounded-md"></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Password" className="p-2 border w-full rounded-md"></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Re-Password" className="p-2 border w-full rounded-md"></input>
                        </div>
                        <div>
                            <BlueLabel text='Sign up' />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="text-center flex gap-2">
                            <p>Already have account?</p>
                            <Link href="/"><button className="text-[#0166FF]">Log in</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}
