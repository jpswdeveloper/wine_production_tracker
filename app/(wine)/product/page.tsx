import { CreateProduct } from '@/app/components/Dialog'
import { Toaster } from 'react-hot-toast'
import WineDataTableDemo from '@/app/components/Table'

const WinePage = async () => {
  return (
    <div className='justify-start h-full w-full items-center px-5 py-11 relative'>
      <WineDataTableDemo />
      <div className='flex bottom-[50px] right-[50px] absolute'>
        <CreateProduct
          title={'Add Product'}
          header='Wine Entry'
          description='Please Enter detail wine'
        />
      </div>
      <Toaster position='bottom-left' />
    </div>
  )
}

export default WinePage
