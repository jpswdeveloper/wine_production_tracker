'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sensor, Wine } from '@prisma/client'
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

export const SensorColumns: ColumnDef<Sensor>[] = [
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
    accessorKey: 'Name',
    header: () => <div className='text-left'>Name</div>,
    cell: ({ row }) => {
      return <div className='text-right font-medium'>{row.original.name}</div>
    }
  },
  {
    accessorKey: 'Description',
    header: () => <div className='text-center'>Description</div>,
    cell: ({ row }) => {
      return (
        <div className='text-start font-medium'>{row.original.description}</div>
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className='text-right'>Sensor Date created at</div>,
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
    header: () => <div className='text-right'>Sensor Date updated at</div>,
    cell: ({ row }) => {
      return (
        <div className='text-right font-medium'>
          {moment(row.getValue('updatedAt')).format('lll')}
        </div>
      )
    }
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const sensor = row.original
      // const router = useRouter()
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
                  // router.push(`/product/${row.original.id}`)
                }}
                className='flex items-center gap-2 w-full border-none cursor-pointer'
              >
                <Edit className='text-red-300' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem className='flex items-center gap-2 w-full cursor-pointer'>
                <DeleteIcon className='text-red-600' />
                delete
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
