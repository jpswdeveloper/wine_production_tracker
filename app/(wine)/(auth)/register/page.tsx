import Image from 'next/image'
import React, { useState } from 'react'
import Wine from '../../../../public/images/maja-petric-vGQ49l9I4EE-unsplash.jpg'
import RegistComp from '@/app/components/Register'

const Register = () => {
  return (
    <div className='flex flex-row justify-between w-screen h-screen bg-white text-black'>
      <div className='flex-1 h-[100%]'>
        <Image src={Wine} alt='login' className='h-[100%] object-cover' />
      </div>

      <div className='flex-1 flex flex-col justify-center items-center gap-4'>
        <div className='w-[50%]'>
          <div className='flex items-start flex-col gap-4 '>
            <h3 className='text-5xl font-bold'>Register</h3>
            <p>please fill your account information</p>
          </div>
          <div className='divider'></div>
          <div>
            <RegistComp />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
