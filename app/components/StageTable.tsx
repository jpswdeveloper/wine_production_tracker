'use client'

import * as React from 'react'
import {
  ChevronDownIcon,
  DoubleArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { DataTablePagination } from '../components/dataTablePagination'
import { ProductionStage, Wine } from '@prisma/client'
import { WineColumns } from '../(wine)/product/columns'
import { revalidatePath } from 'next/cache'
import { StageSColumn } from '../(wine)/stages/columns'

export const WineStageTableDemo = () => {
  const [data, setData] = React.useState<{
    stages: ProductionStage[]
    count: number
  } | null>(null)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [searchValue, setSearchValue] = React.useState('')
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  })

  const fetchData = React.useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/wine/stages?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}&search=${searchValue}`
      )

      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }, [pagination.pageIndex, pagination.pageSize, searchValue])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  const table = useReactTable({
    data: data?.stages || [],
    columns: StageSColumn,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    pageCount: Math.ceil((data?.count || 0) / pagination.pageSize),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    },
    manualFiltering: true,
    manualPagination: true
  })

  console.log('Prev pagination count', pagination)
  return (
    <div className='justify-start h-full w-full items-center px-5 py-11'>
      <div className='w-[100%] h-[100%] flex flex-col bg-white p-5'>
        <div className='flex items-center py-4'>
          <Input
            placeholder='Search'
            value={searchValue}
            onChange={event => {
              setSearchValue(event.target.value)
              table.getColumn('name')?.setFilterValue(event.target.value)
            }}
            className='max-w-sm'
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='ml-auto'>
                Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {table
                .getAllColumns()
                .filter(column => column.getCanHide())
                .map(column => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='rounded-md border h-[60%] overflow-y-scroll no-scrollbar'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Table className='h-[100%]'>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className=''>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={WineColumns.length}
                      className='h-24 text-center'
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
        <div className='flex items-center justify-end space-x-2 py-4'>
          <DataTablePagination table={table} key={'tedo'} />
        </div>
      </div>
    </div>
  )
}

export default WineStageTableDemo
