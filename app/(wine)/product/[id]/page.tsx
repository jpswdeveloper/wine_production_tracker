import { CardWithForm, DisplayData } from '@/app/components/form'
import { Card } from '@/components/ui/card'
import React from 'react'

const page = ({ params }: { params: { id: string } }) => {
  console.log('id', params.id)
  return (
    <div className='justify-start h-full w-full items-center px-5 py-11 relative'>
      <Card className='p-5 flex items-center justify-center w-[100%] gap-4'>
        <DisplayData />
        <hr style={{ height: '100%', width: '3px' }} />
        <div className='w-full flex items-center justify-center flex-col'>
          {/* Date Created */}
          <CardWithForm />
        </div>
      </Card>
    </div>
  )
}

export default page
