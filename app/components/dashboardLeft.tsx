import { Card } from '@/components/ui/card'
import React from 'react'
import { FaArrowUp } from 'react-icons/fa'
import { IoReturnDownForward } from 'react-icons/io5'

const DashBoardLeft = () => {
  return (
    <Card className='bg-white w-full rounded-[12px] p-3 '>
      <div className='flex flex-col gap-2'>
        {/* Header */}
        <div className='flex items-center w-full justify-between'>
          <p>Income</p>
          <div>
            <button className='btn btn-neutral'>Today</button>
          </div>
        </div>
        <div className='divider m-1' />
        {/* Body */}
        <div className='flex items-center justify-between '>
          <p>$40000</p>
          <p className='text-green-400 flex gap-2 items-center justify-center'>
            <FaArrowUp />
            15%
          </p>
        </div>
        <p className='text-gray-400 text-sm'>Compared to $99587 yesterday</p>
        {/* footer */}
        <div className='divider p-0 m-0' />
        <div className='flex items-center justify-between '>
          <p>Last Week Income</p>
          <p className=''>$8788787789</p>
        </div>
      </div>
    </Card>
  )
}

export default DashBoardLeft
