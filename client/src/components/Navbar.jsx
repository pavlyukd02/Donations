import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { logo, thirdweb, eth_logo } from "../assets";
import { CustomButton } from '../containers';

import { metamaskWallet, ConnectWallet } from '@thirdweb-dev/react';

const Navbar = () => {
  const { address, connect, disconnect, balance } = useStateContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleConnect = async () => {
    if (address) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      await connect();
    }
  };

  const handleDashboard = () => {
    setIsDropdownOpen(false);
    navigate('/dashboard');
  };
  function truncateAddress(address) {
    return address.slice(0, 32) + '...';
  }

  return (
    <nav className="flex justify-between items-center px-[80px]  relative">
      <Link to="/">
        <div className='w-[52px] h-[52px] rounded-full flex justify-center items-center cursor-pointer'>
          <img src={logo} alt="profile" className='w-[100%] h-[100%] object-contain hover:drop-shadow-2xl ' />
        </div>
      </Link>
      <div className="flex items-center space-x-10 text-white text-[16px] font-montserrat font-medium ">
        <div className='flex gap-5 select-none cursor-pointer' >
          <div className='hover:drop-shadow-2xl '>Фонди</div>
          <div className='hover:drop-shadow-2xl'>Як це працює</div>
          <div className='hover:drop-shadow-xl'>Про нас</div>
        </div>
        <CustomButton
          btnType="button"
          title={address ? 'Профіль' : 'Підключити гаманець'}
          styles={address ? 'bg-[#1dc071] shadow-md hover:drop-shadow-xl select-none   ' : 'btn-gradient shadow-md hover:drop-shadow-xl  select-none '}
          handleClick={handleConnect}
        />
        {isDropdownOpen && address && (
          <div className="fixed top-[85px] right-[4.86vw]  w-[25vw] select-none bg-gradient-to-t from-[#907cc0] 
          to-[rgba(221,213,241,0.75)] backdrop-blur-[4.5px] 
          p-[15px] gap-[20px] rounded-[8px] shadow-[0px_4px_23px_4px_rgba(0,0,0,0.13)] animate-ubslidein ">
            <div className="px-4 py-2 flex flex-col gap-6">
              <div className='flex items-center gap-3 shadow-xl rounded-xl p-2 '>
                <img src={thirdweb} alt="" className='w-[40px] h-[40px] ' />
                <div className=''>
                  <p className="text-gray-300 uppercase font-bold ">Гаманець:</p>
                  <p className="text-white truncate ">{truncateAddress(address)}</p>
                </div>
              </div>
              <div className='border-b border-gray-300'></div>
              <div>
                <CustomButton
                  btnType="button"
                  title="Мої фонди"
                  styles="btn-gradient upperca w-full text-gray-300 shadow-xl tracking-wider font-normal "
                  handleClick={handleDashboard}
                />

              </div>
              <div className='border-b border-gray-300'></div>
              <div className='flex items-center gap-3 shadow-xl rounded-xl p-2'>
                <img src={eth_logo} alt="" className='w-[40px] h-[40px] ' />
                <div>
                  <p className="text-gray-300 uppercase font-bold ">Баланс:</p>
                  <p className="text-white truncate ">{balance}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
