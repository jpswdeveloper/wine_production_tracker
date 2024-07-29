import Image from 'next/image'
import { IoCalendarNumberOutline, IoReturnDownForward } from 'react-icons/io5'
import moment from 'moment'
import DashBoardLeft from './components/dashboardLeft'
import { PieComponent } from './components/pieChart'
export default function Home () {
  return (
    <div className='h-[100%] w-full mt-[50px] flex flex-col px-10'>
      <div>
        <h3 className='font-bold'>Hi Flex,</h3>
      </div>
      <div className='flex items-center justify-between w-full'>
        <div>
          <p className='text-3xl font-bold'>👋 Welcome Back</p>
        </div>
        <div className='bg-white rounded-full flex p-3 w-[300px] items-center justify-between'>
          <p>Today</p>
          <p className='shadow-sm w-[40%] items-center bg-slate-200 flex justify-center p-[5px] rounded-full'>
            Week
          </p>
          <IoCalendarNumberOutline />
        </div>
      </div>

      {/* Main DashBoard */}
      <div className='flex  w-full justify-between gap-2'>
        {/* left Side Bar */}
        <div className='flex flex-col w-[350px] h-full items-start gap-2  bg-gray-50 p-5'>
          <p className='text-lg'>Today Statistics</p>
          <p className='text-gray-400'>{moment().format('lll')}</p>
          <div className='flex flex-col gap-4 h-[600px] overflow-y-scroll no-scrollbar '>
            <DashBoardLeft />
            <PieComponent />
            <DashBoardLeft />
          </div>
        </div>

        {/* Right Sidebar */}
      </div>
    </div>
  )
}
