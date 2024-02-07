import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';

export const CategoryForm = () => {
    const [closeForm, setCloseForm] = useState(false);
    const [name, setName] = useState();
    const [category_image, setCategory_image] = useState();
    const [description, setDescription] = useState();

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                console.error("Token not found");
                return;
            }
            const response = await axios.get("http://localhost:8000/categories", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    const categoryForm = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.post("http://localhost:8000/categories", { name, category_image }, config)
            setCloseForm(!closeForm);
            console.log("Category added successfully")
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className={`flex items-center justify-center fixed top-0 left-0 w-full h-screen ${closeForm && "hidden"}`}>
            <div className='w-screen h-full bg-[#00000080] absolute top-0 left-0'></div>
            <div className='bg-white rounded-lg z-10 w-[494px] flex flex-col'>
                <div className='h-1/4 w-full p-3 flex justify-between border-b-2'>
                    <h1 className='font-bold text-lg'>Add Category</h1>
                    <button onClick={() => { setCloseForm(!closeForm) }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5459 17.954C19.7572 18.1653 19.876 18.452 19.876 18.7509C19.876 19.0497 19.7572 19.3364 19.5459 19.5477C19.3346 19.7591 19.0479 19.8778 18.749 19.8778C18.4501 19.8778 18.1635 19.7591 17.9521 19.5477L12 13.5937L6.0459 19.5459C5.83455 19.7572 5.54791 19.8759 5.24902 19.8759C4.95014 19.8759 4.66349 19.7572 4.45215 19.5459C4.2408 19.3345 4.12207 19.0479 4.12207 18.749C4.12207 18.4501 4.2408 18.1635 4.45215 17.9521L10.4062 11.9999L4.45402 6.04586C4.24268 5.83451 4.12395 5.54787 4.12395 5.24898C4.12395 4.9501 4.24268 4.66345 4.45402 4.45211C4.66537 4.24076 4.95201 4.12203 5.2509 4.12203C5.54978 4.12203 5.83643 4.24076 6.04777 4.45211L12 10.4062L17.954 4.45117C18.1654 4.23983 18.452 4.12109 18.7509 4.12109C19.0498 4.12109 19.3364 4.23983 19.5478 4.45117C19.7591 4.66251 19.8778 4.94916 19.8778 5.24804C19.8778 5.54693 19.7591 5.83358 19.5478 6.04492L13.5937 11.9999L19.5459 17.954Z" fill="#0F172A" />
                        </svg>
                    </button>
                </div>
                <div className='p-3 flex gap-2 items-center'>
                    <div>
                        <select value={category_image} onChange={e => setCategory_image(e.target.value)} className="select text-center select-bordered flex text-2xl">
                            <option disabled selected>⌂</option>
                            <option>🍴</option>
                            <option>🛍</option>
                            <option>🏡</option>
                            <option>🚙</option>
                            <option>🎁</option>
                            <option>🍹</option>
                            <option>🚕</option>
                            <option>🪜</option>
                        </select>
                    </div>

                    <input value={name} onChange={e => setName(e.target.value)} className='w-full p-3 rounded-lg' type="text" name="" placeholder='Name' id="" />


                </div>
                <div className='p-1'>
                    <button onClick={categoryForm} className='btn btn-primary mb-2 w-full'>Add to Category</button>
                </div>
            </div>
        </div>
    );
};
