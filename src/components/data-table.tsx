import {
  type ColumnDef,
  type ColumnFiltersState,
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
} from '@tanstack/solid-table'
import { type Accessor, createSignal, For, Show, splitProps } from 'solid-js'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { TextField, TextFieldInput } from './ui/text-field'

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: Accessor<TData[] | undefined>
}

export const DataTable = <TData, TValue>(props: Props<TData, TValue>) => {
  const [local] = splitProps(props, ['columns', 'data'])
  const [sorting, setSorting] = createSignal<SortingState>([])
  const [columnFilters] = createSignal<ColumnFiltersState>([])

  const table = createSolidTable({
    get data() {
      return local.data() || []
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      get sorting() {
        return sorting()
      },
      get columnFilters() {
        return columnFilters()
      },
    },
    columns: local.columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div class='flex flex-col items-center'>
      <TextField class='mb-6'>
        <TextFieldInput
          class='max-w-sm'
          onInput={(event) =>
            table.getColumn('frs')?.setFilterValue(event.currentTarget.value)
          }
          placeholder='Chercher un fournisseur...'
          value={(table.getColumn('frs')?.getFilterValue() as string) ?? ''}
        />
      </TextField>
      <div class='w-full rounded-md border'>
        <Table>
          <TableHeader>
            <For each={table.getHeaderGroups()}>
              {(headerGroup) => (
                <TableRow>
                  <For each={headerGroup.headers}>
                    {(header) => {
                      return (
                        <TableHead>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    }}
                  </For>
                </TableRow>
              )}
            </For>
          </TableHeader>
          <TableBody>
            <Show
              fallback={
                <TableRow>
                  <TableCell
                    class='h-24 text-center'
                    colSpan={local.columns.length}>
                    Aucun résultat à afficher.
                  </TableCell>
                </TableRow>
              }
              when={table.getRowModel().rows?.length}>
              <For each={table.getRowModel().rows}>
                {(row) => (
                  <TableRow data-state={row.getIsSelected() && 'selected'}>
                    <For each={row.getVisibleCells()}>
                      {(cell) => (
                        <TableCell>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                            ?.toString()
                            .includes('No')
                            ? '❌'
                            : flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )
                                  ?.toString()
                                  .includes('Yes')
                              ? '✅'
                              : flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                        </TableCell>
                      )}
                    </For>
                  </TableRow>
                )}
              </For>
            </Show>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
