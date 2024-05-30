import React from 'react';
import { gift, volume, hand } from '../assets';
import { useNavigate } from 'react-router-dom';


const HowIT = () => {


    const navigate = useNavigate();
    
    return (
        <section className='flex flex-col font-montserrat'>
            <div className='text-center mb-[56px] justify-center'>
                <h1 className='text-[20px] uppercase font-semibold mb-[17px]'>Як це працює</h1>
                <p className='text-[17px]'>Не будь осторонь</p>
            </div>

            <div className='flex flex-row  justify-between px-[70px]'>
                <div className='text-center ml-[10px] w-[30%] '>
                    <img src={volume} alt="" className='h-[45px] w-[45px] inline-flex mb-[26px]' />
                    <h1 className='font-bold uppercase text-[20px]'>Додайте свій власний фонд</h1>
                    <p className='text-[15px] m-[13px]'>Започаткуйте свою власну благодійну кампанію, описавши вашу ідею, встановивши ціль та дедлайн збору.</p>
                    <div>
                        <button className='bg-[#1dc071]  transition hover:scale-110 shadow-xl
                         text-white px-4 font-semibold font-montserrat py-2 rounded-lg' onClick={() => {
                                navigate('create-campaign')

                            }} >Додай свій фонд</button>
                    </div>
                </div>

                <div className='text-center w-[30%]'>
                    <img src={hand} alt="" className='h-[45px] w-[45px] inline-flex mb-[26px]' />
                    <h1 className='font-bold uppercase text-[20px]'>Задонать фонду</h1>
                    <p className='text-[15px] m-[13px]'>Ти знайшов фонд, котрий торкнув твою душу? Натисніть кнопку “Підтримати цей фонд”, щоб зробити внесок у перемогу нашої країни, або врятувати чиєсь життя.</p>
                    <div>
                        <button className='bg-[#1dc071] w-[50%] transition hover:scale-110 shadow-xl text-white px-4 font-semibold font-montserrat py-2 rounded-lg'>Підтримати фонд</button>
                    </div>
                </div>

                <div className='text-center w-[30%]'>
                    <img src={gift} alt="" className='h-[45px] w-[45px] inline-flex mb-[26px]' />
                    <h1 className='font-bold uppercase text-[20px]'>Отримуй донати</h1>
                    <p className='text-[15px] m-[13px]'>Отримуйте пожертвування відразу на ваш крипто-гаманець. Ніяких третіх рук, банків.</p>
                    <div>
                        <button className='bg-[#1dc071]  transition hover:scale-110 shadow-xl text-white px-4 font-semibold font-montserrat py-2 rounded-lg'>Додай свій фонд</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowIT;
