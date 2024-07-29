import Image from 'next/image'
import React from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FaDollarSign, FaSearch } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'

const NavBar = () => {
  return (
    <div className='h-[50px] w-full px-4 py-2 flex justify-between text-black'>
      {/* Search */}
      <div>
        <div className='border-spacing-1 border-cyan-400 flex gap-2 items-center'>
          <label className='input input-bordered flex items-center gap-2 bg-white '>
            <input type='text' className='grow' placeholder='Search' />
            <kbd className='kbd kbd-sm bg-white'>⌘</kbd>
            <kbd className='kbd kbd-sm bg-white'>K</kbd>
          </label>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <IoIosNotificationsOutline size={30} />
        <Avatar>
          <AvatarImage
            src='https://images.unsplash.com/photo-1423483641154-5411ec9c0ddf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='@shadcn'
          />
          <AvatarFallback>WN</AvatarFallback>
        </Avatar>
        <button className='btn btn-circle items-center flex justify-center'>
          <IoLogOut size={30} />
        </button>
      </div>
    </div>
  )
}

export default NavBar
