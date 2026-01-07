import { For } from 'solid-js'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

export const RawTable = (props: {
  data: { headers: string[]; rows: string[][] }
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <For each={props.data.headers}>
            {(header) => <TableHead>{header}</TableHead>}
          </For>
        </TableRow>
      </TableHeader>
      <TableBody>
        <For each={props.data.rows.slice(0, -1)}>
          {(row) => (
            <TableRow>
              <For each={row}>
                {(cell) => {
                  const value = Number.parseInt(cell.replace('_', ''), 10)
                  return (
                    <TableCell>
                      {Number.isNaN(value) ? cell : value.toLocaleString()}
                    </TableCell>
                  )
                }}
              </For>
            </TableRow>
          )}
        </For>
      </TableBody>
      <TableFooter>
        <TableRow>
          <For each={props.data.rows.at(-1)}>
            {(cell) => <TableCell>{cell}</TableCell>}
          </For>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
