'use client'
import React from 'react'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Avatar } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div className='flex flex-col justify-start  h-screen overflow-hidden p-5 relative'>
      {/* Add Logo */}
      <div className='flex items-center mb-[10px] gap-3 justify-center'>
        <h1 className='text-xl font-bold'>Wine Tracer</h1>
        <div className='w-[50px] h-[50px] flex rounded-ful'>
          <Image
            src={
              'https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt='logo wine'
            width={50}
            height={50}
            className='rounded-full object-center'
          />
        </div>
      </div>
      <div className='divider' />
      <div className='flex items-start flex-col gap-5 w-full '>
        <Link
          href='/'
          className={
            pathname == '/'
              ? 'bg-sky-700 active text-white p-5 w-full h-[50px] items-center justify-start flex rounded-l-lg'
              : 'text-black bg-slate-50 flex p-5 w-full h-[50px] items-center justify-start rounded-l-lg'
          }
        >
          Dashboard
        </Link>
        <Link
          href='/users'
          className={
            pathname == '/users'
              ? 'bg-sky-700 active text-white p-5 w-full h-[50px] items-center justify-start flex rounded-l-lg'
              : 'text-black bg-slate-50 flex p-5 w-full h-[50px] items-center justify-start rounded-l-lg'
          }
        >
          Users
        </Link>
        <Link
          href='/wines'
          className={
            pathname == '/wines'
              ? 'bg-sky-700 active text-white p-5 w-full h-[50px] items-center justify-start flex rounded-l-lg'
              : 'text-black bg-slate-50 flex p-5 w-full h-[50px] items-center justify-start rounded-l-lg'
          }
        >
          Wines
        </Link>
        <Link
          href='/stages'
          className={
            pathname == '/stages'
              ? 'bg-sky-700 active text-white p-5 w-full h-[50px] items-center justify-start flex rounded-l-lg'
              : 'text-black bg-slate-50 flex p-5 w-full h-[50px] items-center justify-start rounded-l-lg'
          }
        >
          Stages
        </Link>
        <Link
          href='/notifications'
          className={
            pathname == '/notifications'
              ? 'bg-sky-700 active text-white p-5 w-full h-[50px] items-center justify-start flex rounded-l-lg'
              : 'text-black bg-slate-50 flex p-5 w-full h-[50px] items-center justify-start rounded-l-lg'
          }
        >
          Notifications
        </Link>
        <Link
          href='/settings'
          className={
            pathname == '/settings'
              ? 'bg-sky-700 active text-white p-5 w-full h-[50px] items-center justify-start flex rounded-l-lg'
              : 'text-black bg-slate-50 flex p-5 w-full h-[50px] items-center justify-start rounded-l-lg'
          }
        >
          Settings
        </Link>
        <Link
          href='/report'
          className={
            pathname == '/report'
              ? 'bg-sky-700 active text-white p-5 w-full h-[50px] items-center justify-start flex rounded-l-lg'
              : 'text-black bg-slate-50 flex p-5 w-full h-[50px] items-center justify-start rounded-l-lg'
          }
        >
          Report
        </Link>
        <Link
          href='/payment-details'
          className={
            pathname == '/payment-details'
              ? 'bg-sky-700 active text-white p-5 w-full h-[50px] items-center justify-start flex rounded-l-lg'
              : 'text-black bg-slate-50 flex p-5 w-full h-[50px] items-center justify-start rounded-l-lg'
          }
        >
          Payment Details
        </Link>

        <Link
          href='/wine-report'
          className={
            pathname == '/wine-report'
              ? 'bg-sky-700 active text-white p-5 w-full h-[50px] items-center justify-start flex rounded-l-lg'
              : 'text-black bg-slate-50 flex p-5 w-full h-[50px] items-center justify-start rounded-l-lg'
          }
        >
          Wine Report
        </Link>
        <button className='flex items-center gap-4 absolute bottom-[50px] left-[50px]'>
          <LogOut />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
