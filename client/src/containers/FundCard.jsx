import React from 'react';
import { useNavigate } from 'react-router-dom';

import { tagType, thirdweb } from '../assets';
import { daysLeft } from '../utils';

const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick1 }) => {
    const remainingDays = daysLeft(deadline);
    const navigate = useNavigate();
    return (
        <div className='flex flex-col sm:w-[440px] h-[440px] rounded-[15px] bg-[#ffffff]  shadow-xl cursor-pointer transition hover:scale-105' onClick={handleClick1}>

            <img src={image} alt="fund" className='w-full h-[50%] object-cover rounded-[15px]' />

            <div className='flex flex-col p-4'>
                <div className='flex flex-row items-center mb-[18px]'>
                    <img src={tagType} alt="tag" className='w-[17px] h-[17px] object-contain' />
                    <p className='ml-[12px] mt-[2px] font-epilogue 
                font-medium text-[12px] text-[#808191]'>
                        Благодійнйі фонди
                    </p>

                </div>
                <div className='block'>
                    <h3 className=' font-epilogue font-semibold text-[16px] text-white text-left 
                leading-[26px] truncate'>
                        {title}
                    </h3>
                    <p className=' mt-[5px] font-epilogue font-normal text-[#808191]
                 text-left leading-[18px] truncate'>
                        {description}
                    </p>
                </div>
                <div className='flex justify-between flex-wrap  mt-[15px] gap-2'>
                    <div className='flex flex-col'>
                        <h4 className=' font-epilogue  font-semibold text-[14px] leading-[22px]
                         text-[#b2b3bd]  '>
                            {amountCollected}
                        </h4>
                        <p className='mt-[3px]  font-epilogue font-normal text-[12px] leading-[18px] 
                        text-[#808191] sm: max-w-[120px]  truncate'>
                            Зібрано {target}
                        </p>
                    </div>
                    <div className='flex flex-col'>
                        <h4 className=' font-epilogue  font-semibold text-[14px] leading-[22px]
                         text-[#b2b3bd]  '>
                            {remainingDays}
                        </h4>
                        <p className='mt-[3px]  font-epilogue font-normal text-[12px] leading-[18px] 
                        text-[#808191] sm: max-w-[120px] truncate'>
                            Days left
                        </p>
                    </div>
                </div>
                <div className='flex items-center mt-[20px] gap-[12px]'>
                    <div className='w-[30px] h-[30px]  bg-[#13131a] rounded-full flex justify-center items-center' >
                        <img src={thirdweb} alt="user" className='w-1/2 h-1/2 objec' />
                    </div>
                    <p className='flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate'>by <span className='text-[#b2b3bd]'> {owner} </span></p>
                </div>
            </div>


        </div>
    )
}

export default FundCard