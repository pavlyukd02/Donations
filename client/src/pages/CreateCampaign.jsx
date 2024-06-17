import React, { useState } from 'react'
import { useNavigate, ScrollRestoration } from 'react-router-dom'
import { ethers } from 'ethers'


import { useStateContext } from '../context';


import { money } from '../assets';
import { CustomButton, FormField } from '../containers';
import { checkIfImage } from '../utils'
import { Loader, Navbar } from '../components';


const CreateCampaign = () => {

  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  const { createCompaign } = useStateContext();


  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.imageUrl, async (exist) => {
      if (exist) {
        setisLoading(true)
        await createCompaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) })
        setisLoading(false);
        navigate('/')
      }
      else {
        alert('Provide valid image URL')
        setform({ ...form, image: '' })
      }
    })

  }
  const [form, setform] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    imageUrl: ''



  })

  const handleFormFieldChange = (fieldName, e) => {
    setform({ ...form, [fieldName]: e.target.value })
  }

  return (
    <div className=''>

      <div className='bg-[#5C2E2E] p-4'>
        <Navbar />
      </div>

      {isLoading && <Loader />}
      <div className='bg-[#ffffff] flex justify-center  items-center flex-col
     rounded-[30px] sm:px-20  sm:py-10 p-4 sm:mx-[370px]  my-10 drop-shadow-2xl  '>

        <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
          <h1 className=' font-montserrat font-bold sm:text-[25px] text-[18px] 
        leading-[38px] text-white  select-none' >
            Додати фонд
          </h1>
        </div>
        <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]' action="">
          <div className='flex flex-wrap gap-[40px] font-montserrat'>
            <FormField
              LabelName="Ваше ім'я*"
              placeholder="Тарас Шевченко"
              inputType="text"
              value={form.name}
              handleChange={(e) => {
                handleFormFieldChange('name', e)
              }}

            />
            <FormField
              LabelName="Назва фонду*"
              placeholder="Напишите назву"
              inputType="text"
              value={form.title}
              handleChange={(e) => {
                handleFormFieldChange('title', e)
              }}

            />
          </div>
          <FormField
            LabelName="Опис *"
            placeholder="Надрукуйте опис вашого фонду"
            isTextArea
            value={form.description}
            handleChange={(e) => {
              handleFormFieldChange('description', e)
            }}
          />
          <div className=' w-full flex justify-start items-center p-4 bg-[#8c6d]  h-[120px] rounded-[10px]'>
            <img src={money} alt="money" className='w-[40px] h-[40px]  object-contain' />
            <h4 className=' font-montserrat font-bold text-[25px] text-white ml-[20px]'>
              Безпечні транзакції
            </h4>
          </div>
          <div className='flex flex-wrap gap-[40px]'>
            <FormField
              LabelName="Ціль *"
              placeholder="ETH 0.5"
              inputType="text"
              value={form.target}
              handleChange={(e) => {
                handleFormFieldChange('target', e)
              }}

            />
            <FormField
              LabelName="Кінцева дата *"
              placeholder=""
              inputType="date"
              value={form.deadline}
              handleChange={(e) => {
                handleFormFieldChange('deadline', e)
              }}
            />

            <FormField
              LabelName="Зображення фонду*"
              placeholder="Додайте посилання на зображння "
              inputType="url"
              value={form.imageUrl}
              handleChange={(e) => {
                handleFormFieldChange('imageUrl', e)
              }}
            />

          </div>
          <div className='flex justify-center items-center mt-[40px] '>
            <CustomButton
              btnType="submit"
              title="Додати новий фонд"
              styles="bg-[#1dc071] w-[50%] transition hover:scale-110 "
            />
          </div>
        </form>
      </div>
    </div>

  )

}


export default CreateCampaign