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
import {
  CreateWineSchema,
  CreateWineStageSchema,
  WineStageT
} from '../utils/schema/wine'
import { WineT } from '../utils/schema/wine'
import { createWineAction, createWineStageAction } from './action'
import toast, { ToastBar } from 'react-hot-toast'
import { useAppSelector } from '@/lib/hook'
import { useRouter, useSearchParams } from 'next/navigation'
import { AutoComplete } from './AutoComplete'

export function CreateStageProduct ({
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
      router.push('/stages')
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
      {/* <ToastBar position={'bottom-left'} toast={''} /> */}
    </>
  )
}

export default CreateStageProduct
export const DialogContentForm = () => {
  const userData = { user: { name: 'jsd', role: 'admin', id: 'erwwer67890-' } }
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState<string>('')

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<WineStageT>({
    resolver: zodResolver(CreateWineStageSchema)
  })

  useEffect(() => {
    if (success) {
      toast.success(message)
      router.refresh()
      router.push('/product?success=true')
    }
  }, [message, success, router])

  const onSubmit = async (data: WineStageT) => {
    try {
      setLoading(true)
      const { message, success } = await createWineStageAction(data)
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
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='type' className='text-right'>
            Wine Name
          </Label>
          <div className='bg-slate-300 w-[280px]'>
            <AutoComplete />
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4 justify-between  flex-col'>
          <Label htmlFor='stage' className='text-right'>
            Stage
          </Label>
          <Input
            id='stage'
            placeholder='wine stage name'
            className='col-span-3'
            {...register('stage')}
          />
        </div>
        <div className='flex items-center justify-center'>
          {errors?.stage && (
            <p className='text-red-500 text-[10px]'>{errors?.stage?.message}</p>
          )}
        </div>
        <div className='grid grid-cols-4 items-center justify-between gap-4'>
          <Label htmlFor='description' className='text-right'>
            Description
          </Label>
          <Textarea
            id='description'
            placeholder='description of stage'
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

        <div className='flex items-center justify-center'>
          {errors.wineName && (
            <p className='text-red-500 text-[10px]'>
              {errors.wineName?.message}
            </p>
          )}
        </div>
        <div></div>
        <input
          type='text'
          hidden
          {...register('wineId', { value: userData?.user?.id })}
        />
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
