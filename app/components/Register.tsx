'use client'
import React, { useState } from 'react'
import { auth_register_action } from './action'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'

import { v4 as uuidv4 } from 'uuid'
import { useForm } from 'react-hook-form'

import {
  RegisterSchema,
  RegisterSchemaType,
  userEntries
} from '../schema/register'

import { useRouter } from 'next/navigation'

const RegistComp = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema)
  })

  const onSubmit = async (data: RegisterSchemaType) => {
    setLoading(true)
    const { message, success } = await auth_register_action(data)
    if (success) {
      toast.success(message)
      router.push('/login')
    } else {
      toast.error(message)
    }
    setLoading(false)
  }

  console.log('errors', errors)
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4 bg-white'
      >
        {userEntries.map((user, index) => {
          const Icon = user?.icon
          return (
            <div key={`${index}_${uuidv4()}`}>
              {user.name == 'email' ? (
                <div className='flex items-start gap-2 flex-col'>
                  <label className='input input-bordered flex items-center gap-2 w-full'>
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
                      className={`grow text-white ${
                        errors.email?.message && 'input-error'
                      }`}
                      placeholder='Email'
                      {...register('email')}
                      required
                    />
                  </label>
                  {errors.email?.message && (
                    <p className='text-error'>{errors.email?.message}</p>
                  )}
                </div>
              ) : user.name == 'password' ? (
                <div className='flex items-start gap-2 flex-col'>
                  <label className='input input-bordered flex items-center gap-2 w-full'>
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
                      className={`grow text-white ${
                        errors?.password?.message && 'input-error gap-2'
                      }`}
                      {...register('password')}
                      placeholder='*****'
                      required
                    />
                  </label>
                  {errors.password?.message && (
                    <p className='text-error'>{errors.password?.message}</p>
                  )}
                </div>
              ) : (
                <div className='flex items-start gap-2 flex-col'>
                  <label className='input input-bordered flex items-center gap-2 w-full'>
                    {Icon && <Icon className='h-4 w-4 opacity-70 text-white' />}
                    <input
                      type='text'
                      className={`grow text-white ${
                        errors?.password?.message && 'input-error'
                      }`}
                      placeholder={user.placeholder}
                      {...register(user.name)}
                      required
                    />
                  </label>
                  {errors?.[user.name]?.message && (
                    <p className='text-error'>{errors?.[user.name]?.message}</p>
                  )}
                </div>
              )}
            </div>
          )
        })}

        <button
          className='btn btn-primary text-white'
          disabled={loading}
          type='submit'
        >
          Submit
          {loading && <span className='loading loading-ring loading-md'></span>}
        </button>
      </form>
      <div className='divider'></div>
      <div className='flex flex-row justify-between'>
        <p>{`Already have an account ?`}</p>
        <a href='/login' className='text-'>
          Login
        </a>
      </div>
    </div>
  )
}

export default RegistComp
