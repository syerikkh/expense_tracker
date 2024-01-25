import React, { useEffect, useMemo, useState } from 'react'
import { Router, useRouter } from 'next/router'
import { AppIcon } from './Icons/AppIcon'
import Link from 'next/link'
import { BlueLabel } from './BlueLabel'

export const LogIn = () => {
    const [input, setInput] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fetchData = async () => {
        const res = await fetch('http://localhost:8000/login');
        const data = await res.json();
    }
    useEffect(() => {
        fetchData()
    }, []);

    const getInput = () => {
        setInput({ email, password })
    }
    useMemo(() => {
        getInput()
    }, [email, password])

    const logIn = async () => {
        try {
            const res = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            });
            console.log('successfully logged in')

        } catch (error) {
            console.error(error)
        }

        setEmail('');
        setPassword('');
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
                        <h1 className="font-semibold text-3xl">Welcome Back</h1>
                        <p className="text-xl text-[#334155]">Welcome back, Please enter your details</p>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" className="p-2 border w-full rounded-md"></input>
                        </div>
                        <div>
                            <input value={password} onChange={e => setPassword(e.target.value)} type="text" placeholder="Password" className="p-2 border w-full rounded-md"></input>
                        </div>
                        <div>
                            <button onClick={logIn} className="bg-[#0166FF] text-white p-4 w-full rounded-3xl">Log in</button>

                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="text-center flex gap-2">
                            <p>Don’t have account?</p>
                            <Link href={'/signUp'}><button className="text-[#0166FF]">Sign up</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
