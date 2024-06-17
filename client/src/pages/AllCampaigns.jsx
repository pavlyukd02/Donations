import React, { useState, useEffect } from 'react'
import { DisplayCampaigns, Navbar } from '../components'
import { useStateContext } from '../context'
import { useNavigate } from 'react-router-dom';

import { search } from '../assets';



const AllCampaigns = () => {

    const [isLoading, setisLoading] = useState(false);

    const [campaigns, setCampaigns] = useState([])

    const { address, contract, getCampaigns } = useStateContext();

    const navigate = useNavigate();

    const fetchCampaigns = async () => {
        setisLoading(true);
        const data = await getCampaigns();
        setCampaigns(data);
        setisLoading(false);

    }


    useEffect(() => {
        if (contract) fetchCampaigns();

    }, [address, contract])

    return (
        <div>

            <div className='bg-[#5C2E2E] p-4'>
                <Navbar />
            </div>

            <div className='flex justify-center mt-[50px]'>
                <div className="lg:flex-1 flex max-w-[1000px] py-2  justify-center mx-4 pl-4 pr-2 h-[52px] bg-white-500 shadow-2xl rounded-[100px]">

                    <input type="text" placeholder="Пошук благодійних фондів" className="flex w-full font-montserrat
         font-normal text-[14px] placeholder:text-[#4b5264] text-black bg-transparent outline-none" />

                    <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">

                        <img src={search} alt="search" className="w-[15px] h-[15px] object-contain" />

                    </div>
                </div>
            </div>

            <div className='py-[100px] px-[200px]'>
                <DisplayCampaigns
                    title="All campaigns"
                    isLoading={isLoading}
                    campaigns={campaigns}
                />
            </div>
        </div>
    )
}

export default AllCampaigns