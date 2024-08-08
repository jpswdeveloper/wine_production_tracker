'use client'
import React from 'react'
import Sidebar from './components/Sidebar'
import NavBar from './components/navbar'
import axios from 'axios'
import useSWR from 'swr'
import Login from './(wine)/auth/login/page'

const fetcher = (search: string) => fetch(search).then(res => res.json())
const AuthorizedLayout = ({ children }: { children: React.ReactNode }) => {
  const { data, error } = useSWR('/api/auth/login', fetcher)
  console.log('data', data, 'error', error)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  console.log('data', data)

  return (
    <div>
      {data?.userData?.userId ? (
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
        <Login />
      )}
    </div>
  )
}

export default AuthorizedLayout
