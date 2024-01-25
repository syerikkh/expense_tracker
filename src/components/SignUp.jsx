import React, { useEffect, useMemo, useState } from 'react'
import { AppIcon } from './Icons/AppIcon'
import Link from 'next/link'
import { BlueLabel } from './BlueLabel'
import { useRouter } from 'next/router'


export const SignUp = () => {
    const router = useRouter();
    const [input, setInput] = useState([])
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const getInput = () => {
    //     return { name, email, password }
    // }

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:8000/signup')
            const data = await res.json()
            console.log(data, 'data')
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    const getInput = () => {
        setInput({
            name,
            email,
            password
        })
    }
    useMemo(() => {
        getInput()
    }, [name, email, password])

    const signUp = async () => {
        try {
            const res = await fetch('http://localhost:8000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input)


            })

            console.log('signed up successfully')


        } catch (error) {
            alert(error)
            console.log(error, 'error')
        }
        setName('');
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
                            <Link href={'/currency'}><button onClick={signUp} className="bg-[#0166FF] text-white p-4 w-full rounded-3xl">Sign up</button></Link>
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
