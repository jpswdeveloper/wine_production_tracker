'use client'
import React from 'react'
import Sidebar from './components/Sidebar'
import NavBar from './components/navbar'
import { useAppSelector } from '@/lib/hook'

const AuthorizedLayout = ({ children }: { children: React.ReactNode }) => {
  const auth = useAppSelector(state => state)
  console.log('aur', auth)
  return (
    <div>
      {auth.auth.isAuthenticated ? (
        <div className='flex w-full h-full '>
          <div className='w-[250px] h-full flex items-center'>
            <Sidebar />
          </div>
          <div className='bg-[#F5F6F8] flex items-start w-full h-screen flex-col px-2 py-2 '>
            <NavBar />
            {children}
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  )
}

export default AuthorizedLayout
