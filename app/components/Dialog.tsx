import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CreateWineSchema } from '../utils/schema/wine'
import { WineT } from '../utils/schema/wine'
import { createWineAction } from './action'

export function CreateProduct ({
  title,
  header,
  description
}: {
  title?: string
  header?: string
  description?: string
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='absolute bottom-20 right-5 m-5 bg-sky-700 w-[200px] flex items-center justify-center text-white rounded-md'
        >
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          {header && <DialogTitle>{header}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogContentForm />
      </DialogContent>
    </Dialog>
  )
}

export default CreateProduct
export const DialogContentForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<WineT>({
    resolver: zodResolver(CreateWineSchema)
  })

  const onSubmit = async (data: WineT) => {
    setLoading(true)
    const { message, success } = await createWineAction(data)
    if (success) {
      toast.success(message)
      router.push('/login')
    } else {
      toast.error(message)
    }
    setLoading(false)
  }

  return (
    <form>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='name' className='text-right'>
            Name
          </Label>
          <Input id='name' placeholder='wine name' className='col-span-3' />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='description' className='text-right'>
            Description
          </Label>
          {/* <Input type=''  */}
          <Textarea
            id='description'
            placeholder='wine name'
            className='col-span-3'
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='type' className='text-right'>
            Type
          </Label>

          <Input
            id='type'
            placeholder='wine description'
            className='col-span-3'
          />
        </div>
      </div>
      <DialogFooter>
        <Button type='submit'>Save changes</Button>
      </DialogFooter>
    </form>
  )
}
