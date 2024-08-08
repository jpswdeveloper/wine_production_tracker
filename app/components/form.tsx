import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export function CardWithForm () {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Wine Process Stage entry</CardTitle>
        <CardDescription>
          Create Stage Process for current Wine.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' placeholder='Name of Stages' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='sensor'>Sensor</Label>
              <Select>
                <SelectTrigger id='sensor'>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent position='popper'>
                  <SelectItem value='next'>Next.js</SelectItem>
                  <SelectItem value='sveltekit'>SvelteKit</SelectItem>
                  <SelectItem value='astro'>Astro</SelectItem>
                  <SelectItem value='nuxt'>Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline'>Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
export const DisplayData = () => {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Wine Detail</CardTitle>
        <CardDescription>Wine detail information.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid w-full items-center gap-4'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' value='RED WINE' disabled />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='type'>Type</Label>
            <Input id='type' value='RED WINE' disabled />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='createdBY'>Wine created by</Label>
            <Input id='createdBY' value='RED WINE' disabled />
          </div>
          <div className='flex gap-3 flex-col pointer-events-none'>
            <Label htmlFor='name'>Wine Status</Label>
            <button className='btn btn-success text-white'> PENDING</button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
