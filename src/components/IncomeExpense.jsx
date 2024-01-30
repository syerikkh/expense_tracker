import React from 'react'
import { Select } from './Select'

export const IncomeExpense = (props) => {
    return (
        <div className='flex flex-col gap-2'>
            <p className='font-bold'>{props.day}</p>
        </div>
    )
}
