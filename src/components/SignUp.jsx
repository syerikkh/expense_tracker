import React, { useEffect, useState } from 'react'
import { AppIcon } from './Icons/AppIcon'
import Link from 'next/link'
import { BlueLabel } from './BlueLabel'
import { config } from 'next/dist/build/templates/pages'

export const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getInput = () => {
        setName(name)
        setEmail(email)
        setPassword(password)
    }

    const fetchData = async () => {
        const res = await fetch('http://localhost:8000/signup')
        const data = await res.json()

    }
    useEffect(() => {
        fetchData();
    }, [])

    const signUp = async () => {
        try {
            const res = await fetch('http://localhost:8000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(getInput())
            })

        } catch (error) {
            alert(error)
        }
    }

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
                            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Name" className="p-2 border w-full rounded-md"></input>
                        </div>
                        <div>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" className="p-2 border w-full rounded-md"></input>
                        </div>
                        <div>
                            <input value={password} onChange={e => setPassword(e.target.value)} type="text" placeholder="Password" className="p-2 border w-full rounded-md"></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Re-Password" className="p-2 border w-full rounded-md"></input>
                        </div>
                        <div>
                            <button onClick={signUp} className="bg-[#0166FF] text-white p-4 w-full rounded-3xl">Sign up</button>
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
