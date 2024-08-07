'use client'
import React from 'react'
import Sidebar from './components/Sidebar'
import NavBar from './components/navbar'
import { useAppSelector } from '@/lib/hook'
import Login from './(wine)/auth/login/page'

const AuthorizedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* {auth?.auth?.isAuthenticated ? ( */}
      <div className='flex w-full h-full '>
        <div className='w-[250px] h-full flex items-center'>
          <Sidebar />
        </div>
        <div className='bg-[#F5F6F8] flex items-start w-full h-screen flex-col px-2 py-2 '>
          <NavBar />
          {children}
        </div>
      </div>
      {/* ) : ( */}
      {/* <Login/> */}
      {/* )} */}
    </div>
  )
}

export default AuthorizedLayout
