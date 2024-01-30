import React from 'react'

export const Select = (props) => {
    return (
        <div className='bg-white px-6 py-3 rounded-lg '>
            <div className="form-control">
                <label className="cursor-pointer flex gap-2 items-center justify-between">
                    <div className='flex gap-4'>
                        <input type="checkbox" className="checkbox checkbox-primary" />
                        <div className="label-text flex flex-col text-xs">
                            <div className='font-semibold'>{props.text}</div>
                            <div>{props.time}</div>
                        </div>
                    </div>
                    <p className='font-bold text-[#23E01F]'>{props.expense}₮</p>
                </label>
            </div>
        </div>
    )
}
