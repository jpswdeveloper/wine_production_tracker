'use client'
import { Button } from '@/components/ui/button'
import { ProductionStage, Wine } from '@prisma/client'
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
import moment from 'moment'
import React from 'react'

export const StageSColumn: ColumnDef<ProductionStage>[] = [
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
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <DotsHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Edit Wine
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
