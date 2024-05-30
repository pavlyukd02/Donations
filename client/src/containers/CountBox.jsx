import React from 'react'

const CountBox = ({ title, value }) => {
    return (
        <div className='flex flex-col  items-center w-[150px]  drop-shadow-xl   '>
            <h4 className=' font-epilogue font-bold text-[30px] text-white p-3 bg-[#1dc071]
            rounded-t-[10px] w-full  text-center truncate'>{value}</h4>
            <p className='font-epilogue font-normal text-[16px] text-[#808191] bg-slate-900
             px-3 py-2 w-full text-center rounded-b-[10px] truncate '>{title}</p>
        </div>
    )
}

export default CountBox