import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

interface ItemsTableProps<T extends object, K extends keyof T> {
  items: T[];
  columns: K[];
}

export default function ItemsTable<T extends object, K extends keyof T>({ items, columns }: ItemsTableProps<T, K>) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableHeaderCell style={{ textTransform: 'capitalize' }} key={column.toString()}>{column as string}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            {columns.map((column) => {
              const value = item[column] as string
              return (
                <TableCell key={column.toString()}>
                  {typeof value === 'number' ? (
                    value
                  ) : typeof value === 'string' ? (
                    <Text>{value}</Text>
                  ) : null /* handle other types if needed */}
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
