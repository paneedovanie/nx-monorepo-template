import {
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableCellProps,
  Typography,
  TableProps,
  SxProps,
} from '@mui/material';
import { ChangeEvent, ReactNode } from 'react';

interface Column<T> extends TableCellProps {
  label: string;
  name: string;
  sx?: SxProps;
  render?: (v: T) => ReactNode;
}

interface DataTableProps<T> {
  columns?: Column<T>[];
  data?: T[];
  page?: number;
  perPage?: number;
  count?: number;
  pagination?: boolean;
  tableProps?: TableProps;
  onPage?: (_page: number) => void;
  onPerPage?: (_perPage: number) => void;
}

export const DataTable = <T,>({
  columns,
  data,
  page,
  perPage,
  count,
  pagination = true,
  tableProps,
  onPage,
  onPerPage,
}: DataTableProps<T>) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader {...tableProps}>
          <TableHead>
            <TableRow>
              {columns?.map(({ render, ...column }, i) => (
                <TableCell
                  {...column}
                  sx={{ fontWeight: 'bold', ...column.sx }}
                  key={i}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: T, i: number) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                  {columns?.map((column, j) => {
                    return (
                      <TableCell key={j}>
                        {column.render?.(row) ??
                          row[column.name as keyof unknown]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            {!data?.length && (
              <TableRow>
                <TableCell colSpan={columns?.length}>
                  {' '}
                  <Typography sx={{ textAlign: 'center' }}>No data</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={count ?? 0}
          rowsPerPage={perPage ?? 5}
          page={count ? (page ? page - 1 : 0) : 0}
          onPageChange={(e, _page) => onPage?.(_page + 1)}
          onRowsPerPageChange={(e: ChangeEvent<HTMLInputElement>) => {
            onPerPage?.(+e.target.value);
            onPage?.(1);
          }}
        />
      )}
    </Paper>
  );
};
