'use client'

import * as React from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import useSWR from 'swr'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import axios from 'axios'

const fetcher = (search?: string) => {
  console.log('search', search)
  const url = `/api/wine/read`
  //extract search from the url
  const searchParams = new URLSearchParams(url.split('?')[1])
  console.log(
    'searchParams',
    searchParams.get('search'),
    'URL',
    `${
      searchParams.get('search')
        ? `${url}?search=${searchParams.get('search')}`
        : `${url}`
    }`
  )

  return axios
    .get(
      `${
        searchParams.get('search') != null
          ? `${url}?search=${searchParams.get('search')}`
          : `${url}`
      }`
    )
    .then(res => {
      console.log('res', res?.data?.wine)
      return res?.data?.wine
    })
    .catch(e => console.log('e', e))
}

export function AutoComplete () {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const [search, setSearch] = React.useState<string>('')
  const { data, error, isLoading } = useSWR('/api/wine/read', fetcher)
  console.log('AutoComplete', error, isLoading, 'data', data, search)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[280px] justify-between'
        >
          {value
            ? data.find((d: any) => d.value === value)?.name
            : 'Select Wine...'}
          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput
            placeholder='Search wine name...'
            className='h-9'
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No wine found.</CommandEmpty>
            <CommandGroup>
              {data?.map((d: any) => (
                <CommandItem
                  key={d.value}
                  value={d.value}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  {d?.name}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === d.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
