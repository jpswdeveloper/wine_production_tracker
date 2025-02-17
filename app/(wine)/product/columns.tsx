'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Wine } from '@prisma/client'
import { Checkbox } from '@radix-ui/react-checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { CirclePlusIcon, Delete, DeleteIcon, Edit } from 'lucide-react'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React from 'react'

export const WineColumns: ColumnDef<Wine>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorKey: 'name',
    header: () => <div className='text-right'>Wine Name</div>,
    cell: ({ row }) => {
      return (
        <div className='text-right font-medium'>{row.getValue('name')}</div>
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className='text-right'>Wine Date created at</div>,
    cell: ({ row }) => {
      return (
        <div className='text-right font-medium'>
          {moment(row.getValue('createdAt')).format('lll')}
        </div>
      )
    }
  },
  {
    accessorKey: 'updatedAt',
    header: () => <div className='text-right'>Wine Date updated at</div>,
    cell: ({ row }) => {
      return (
        <div className='text-right font-medium'>
          {moment(row.getValue('updatedAt')).format('lll')}
        </div>
      )
    }
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('status')}</div>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const wine = row.original
      const router = useRouter()
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <DotsHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='bg-white flex gap-1 p-3 flex-col border-slate-300 border-[1px] rounded-sm'
          >
            <div className='w-full items-center justify-center flex text-sky-700 font-bold'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
            </div>
            <hr />
            <div className='p-2 flex items-center justify-start gap-2 flex-col w-full'>
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/product/${row.original.id}`)
                }}
                className='flex items-center gap-2 w-full border-none cursor-pointer'
              >
                <Edit className='text-red-300' />
                Edit Wine
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className=' cursor-pointer flex items-center w-full justify-between gap-2'>
                <CirclePlusIcon className='text-sky-700' /> Add Stage for wine
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='flex items-center gap-2 w-full cursor-pointer'>
                <DeleteIcon className='text-red-600' />
                delete Wine
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
