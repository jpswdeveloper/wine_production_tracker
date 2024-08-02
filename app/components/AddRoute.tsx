import { useRouter } from 'next/navigation'
import React from 'react'
import { IoAddCircle } from 'react-icons/io5'

const AddRoute = ({ route, path }: { route: string; path: string }) => {
  const router = useRouter()
  console.log('path', path)
  return (
    <div
      className='absolute bottom-20 right-5 m-5 bg-sky-700 w-[200px] flex items-center justify-center text-white rounded-md'
      onClick={() => router.push(path)}
    >
      <button className='btn btn-ghost flex items-center no-animation '>
        <IoAddCircle size={25} />
        {route}
      </button>
    </div>
  )
}

export default AddRoute
