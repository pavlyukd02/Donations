import React from 'react';
import { headerImg2, headerImg, headerImg3, manger_header_img } from "../assets";
import {  useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import {metamaskWallet } from '@thirdweb-dev/react';
import { CustomButton } from '../containers';


const Header = () => {

    const metamaskConfig=metamaskWallet();

    const navigate = useNavigate();
    const { connect, address } = useStateContext();

    return (
        <header className=''>
            <div className='flex mt-[300px]  pb-[32px] text-white ml-[60px]'>
                <div className='flex flex-col select-none'>
                    <h1 className='text-[70px] mt-[156px] mb-[24px]  font-montserrat font-bold'>
                        Благодійність на блокчейні
                    </h1>
                    <p className='font-montserrat  font-medium  text-[18px]'>

                       Chariy — це крипто-благодійна платформа, яка створена  для фінансування фондів за допомогою криптоактивів.
                    </p>
                    <div className='mt-[24px]'>
                        <CustomButton
                            btnType="button"
                            title={address ? 'Додати свій фонд' : 'Підключити гаманець'}
                            styles={address ? 'bg-[#1dc071] w-[50%] transition hover:scale-110 shadow-xl ' : 'btn-gradient w-[50%] transition hover:scale-110 shadow-x'}
                            handleClick={() => {
                                if (address) navigate('create-campaign')
                                else connect(metamaskConfig)
                            }}
                        />
                    </div>
                </div>
                <div className='flex w-[50%]'>
                    <img src={manger_header_img} className='w-[90%] h-auto' alt="Header Image" />
                </div>
            </div>
        </header>
    );
}

export default Header;
