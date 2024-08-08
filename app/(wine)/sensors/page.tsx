import { CreateProduct } from '@/app/components/Dialog'
import { Wine } from '@prisma/client'
import { ToastBar, Toaster } from 'react-hot-toast'
import { getAllWine } from '@/app/server/wine/getall'
import WineDataTableDemo from '@/app/components/Table'
import WineStageTableDemo from '@/app/components/StageTable'
import CreateStageProduct from '@/app/components/CreateStageProduct'
import SensorDataTableDemo from '@/app/components/SensorTable'
import CreateSensor from '@/app/components/sensorAddDIalog'

const Sensors = async () => {
  return (
    <div className='justify-start h-full w-full items-center px-5 py-11 relative'>
      <SensorDataTableDemo />
      <div className='flex bottom-[50px] right-[50px] absolute'>
        <CreateSensor
          title={'Add Sensor'}
          header='Wine tracer sensor Entry'
          description='Please Enter sensor for tracing wine stages'
        />
      </div>
      <Toaster position='bottom-left' />
    </div>
  )
}

export default Sensors
