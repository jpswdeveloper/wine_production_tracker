'use client'
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
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createSensorSchema, SensorT } from '../utils/schema/wine'
import { createSensorAction } from './action'
import toast, { ToastBar } from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import useSWR from 'swr'

export function CreateSensor ({
  title,
  header,
  description
}: {
  title?: string
  header?: string
  description?: string
}) {
  const SearchParams = useSearchParams()
  const success = SearchParams.get('success')
  const router = useRouter()
  useEffect(() => {
    if (success == 'true') {
      router.refresh()
      router.back()
    }
  }, [success, router])
  return (
    <>
      {success != 'true' && (
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
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>

            <DialogContentForm />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default CreateSensor
const fetcher = (search: string) => fetch(search).then(res => res.json())

export const DialogContentForm = () => {
  const { data, error } = useSWR('/api/auth/login', fetcher)

  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState<string>('')

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SensorT>({
    resolver: zodResolver(createSensorSchema)
  })

  useEffect(() => {
    if (success) {
      toast.success(message)
      router.refresh()
      router.replace('/sensor')
    }
  }, [message, success, router])

  const onSubmit = async (data: SensorT) => {
    try {
      setLoading(true)
      const { message, success } = await createSensorAction(data)
      console.log('message', message, 'success', success)
      if (success) {
        setSuccess(true)
      } else {
        setSuccess(false)
      }
      setMessage(message)
      setLoading(false)
    } catch (error: any) {
      setMessage(error?.message || 'Something went wrong')
    }
  }

  console.log('errors', errors)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid gap-4 py-4 flex-col items-start'>
        <div className='grid grid-cols-4 items-center gap-4  flex-col'>
          <Label htmlFor='name' className='text-right'>
            Name
          </Label>
          <Input
            id='name'
            placeholder='wine name'
            className='col-span-3'
            {...register('name')}
          />
        </div>
        <div className='flex items-center justify-center'>
          {errors.name && (
            <p className='text-red-500 text-[10px]'>{errors.name.message}</p>
          )}
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='description' className='text-right'>
            Description
          </Label>
          <Textarea
            id='description'
            placeholder='wine name'
            className='col-span-3'
            {...register('description')}
          />
        </div>
        <div className='flex items-center justify-center'>
          {errors.description && (
            <p className='text-red-500 text-[10px]'>
              {errors?.description?.message}
            </p>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button disabled={loading}>
          Save changes
          {/* {loading && } */}
        </Button>
      </DialogFooter>
    </form>
  )
}
