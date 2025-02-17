'use client'
import React, { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { auth_login_action } from './action'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { logOut, setAuth } from '@/lib/feature/auth/authSlice'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'

const loginMessage = {
  message: '',
  success: false,
  user: null as User | null
}

const LoginComp = () => {
  const { pending, data } = useFormStatus()
  const [state, formAction] = useFormState(auth_login_action, loginMessage)
  const router = useRouter()
  console.log('state', state)
  useEffect(() => {
    if (state?.success == true) {
      toast.success(state.message)
      router.refresh()
      router.push('/')
    } else if (!state?.success && state?.message != '') {
      toast.error(state.message || 'Unauthorized')
    }
  }, [state])

  return (
    <div>
      <form action={formAction} className='flex flex-col gap-4 bg-white'>
        <label className='input input-bordered flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='white'
            className='h-4 w-4 opacity-70'
          >
            <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
            <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
          </svg>
          <input
            type='text'
            className='grow text-white'
            placeholder='Email'
            name='email'
            required
          />
        </label>

        <label className='input input-bordered flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='white'
            className='h-4 w-4 opacity-70'
          >
            <path
              fillRule='evenodd'
              d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
              clipRule='evenodd'
            />
          </svg>
          <input
            type='password'
            className='grow text-white'
            placeholder='*****'
            name='password'
            required
          />
        </label>

        <button className='btn btn-primary text-white' disabled={pending}>
          SignIn
          {pending && (
            <span className='loading loading-ring loading-md text-black'></span>
          )}
        </button>
        {/* <button className='btn btn-info text-white'>
      SignIn With Gmail
    </button>
    <button className='btn btn-info text-white'>
      SignIn With Facebook{' '}
    </button> */}
        <div className='flex flex-row justify-between'>
          <p>{`Don't have an account?`}</p>
          <a href='/register' className='text-'>
            SignUp
          </a>
        </div>
      </form>
    </div>
  )
}

export default LoginComp
