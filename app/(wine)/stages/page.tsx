import { CreateProduct } from '@/app/components/Dialog'
import { Wine } from '@prisma/client'
import { ToastBar, Toaster } from 'react-hot-toast'
import { getAllWine } from '@/app/server/wine/getall'
import WineDataTableDemo from '@/app/components/Table'
import WineStageTableDemo from '@/app/components/StageTable'
import CreateStageProduct from '@/app/components/CreateStageProduct'

const WineStagePage = async () => {
  return (
    <div className='justify-start h-full w-full items-center px-5 py-11 relative'>
      <WineStageTableDemo />
      <div className='flex bottom-[50px] right-[50px] absolute'>
        <CreateStageProduct
          title={'Add Stage for Product'}
          header='Wine Stage Entry'
          description='Please Enter Stages for wine'
        />
      </div>
      <Toaster position='bottom-left' />
    </div>
  )
}

export default WineStagePage
