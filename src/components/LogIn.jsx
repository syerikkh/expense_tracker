import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AppIcon } from './Icons/AppIcon'
import Link from 'next/link'
import { EyeSlash } from './Icons/EyeSlash'
import { EyeIcon } from './Icons/EyeIcon'
import axios from 'axios'

export const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem("authToken");
    }, []);

    const logIn = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:8000/login', { email, password });
            if (res.status === 200) {
                const { token, userId } = res.data.data;
                localStorage.setItem('authToken', token);
                router.push(`/dashboard/${userId}`);
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Failed to log in. Please try again.');
        } finally {
            setLoading(false);
        }

        setEmail('');
        setPassword('');
    };

    return (
        <div className="w-[100vw] h-[100vh] flex lg:flex-row flex-col lg:justify-center items-center">
            <div className="lg:w-1/2 w-full lg:h-full h-[200px] bg-[#0166FF] flex justify-center items-center">
                <h1 className="text-white text-3xl lg:text-9xl font-bold">Track<br /> Your<br /> Expenses</h1>
            </div>
            <div className="w-1/2 mt-10 flex justify-center items-center">
                <div className="flex flex-col gap-10 justify-center items-center w-96">
                    <div className="flex justify-center items-center gap-3">
                        <AppIcon />
                        <h1 className="font-semibold text-3xl">Geld</h1>
                    </div>
                    <div className="text-center flex gap-3 flex-col">
                        <h1 className="font-semibold text-3xl">Welcome Back</h1>
                        <p className="text-xl text-[#334155]">Welcome back, Please enter your details</p>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex flex-col gap-4 w-full">
                        <div>
                            <input 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                type="text" 
                                placeholder="Email" 
                                className="p-2 border w-full rounded-md"
                            />
                        </div>
                        <div className='flex relative items-center'>
                            <input 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password" 
                                className="p-2 border w-full rounded-md"
                            />
                            <button onClick={() => setShowPassword(!showPassword)} className='absolute right-2'>
                                {showPassword ? <EyeSlash /> : <EyeIcon />}
                            </button>
                        </div>
                        <div>
                            <button 
                                onClick={logIn} 
                                className="bg-[#0166FF] text-white p-4 w-full rounded-3xl"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Log in'}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="text-center flex gap-2">
                            <p>Don’t have an account?</p>
                            <Link href={'/signUp'}>
                                <button className="text-[#0166FF]">Sign up</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}