import React from 'react'
import { facebook, twitter, telegram } from '../assets'

const Footer = () => {
    return (
        <footer className="bg-[#000000] text-gray-300 p-[29px] mt-[88px]">
            <div className="px-4 flex flex-col lg:flex-row items-center justify-between">
                <div className="mb-4 lg:mb-0 text-center lg:text-left">
                    <h1 className="text-lg font-bold">Charity24</h1>
                </div>
                <div className="flex mb-4 lg:mb-0 justify-center lg:justify-start">
                    <ul className="flex space-x-4">
                        <li><a href="#" className="hover:text-gray-100">Фонди</a></li>
                        <li><a href="#" className="hover:text-gray-100">Про нас</a></li>
                        <li><a href="#" className="hover:text-gray-100">Блог</a></li>
                        <li><a href="#" className="hover:text-gray-100">Допомога</a></li>
                    </ul>
                </div>
                <div className="flex justify-center lg:justify-start">
                    <div className="flex flex-row">
                        <img src={telegram} alt="Telegram" className="w-5 h-5 m-1" />
                        <img src={facebook} alt="Facebook" className="w-5 h-5 m-1" />
                        <img src={twitter} alt="Twitter" className="w-5 h-5 m-1" />
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-600 mt-4">
                <div className="flex justify-start px-4 py-2 text-center text-sm">
                    ©2024 Charity24. Усі права захищені.
                </div>
            </div>
        </footer>
    )
}

export default Footer
