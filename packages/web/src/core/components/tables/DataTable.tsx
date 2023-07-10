import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
} from '@mui/icons-material';
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
  IconButton,
} from '@mui/material';
import { PaginationOrder } from '@nx-monorepo-template/global';
import { ChangeEvent, ReactNode, useState } from 'react';

interface Column<T> extends TableCellProps {
  label: string;
  name: string;
  sortable?: boolean;
  display?: boolean;
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
  isLoading?: boolean;
  onPage?: (_page: number) => void;
  onPerPage?: (_perPage: number) => void;
  onSort?: (order?: PaginationOrder) => void;
}

export const DataTable = <T,>({
  columns,
  data,
  page,
  perPage,
  count,
  pagination = true,
  tableProps,
  isLoading,
  onPage,
  onPerPage,
  onSort,
}: DataTableProps<T>) => {
  const [order, setOrder] = useState<PaginationOrder>();

  const sort = (columnName: string) => {
    if (order?.by !== columnName) {
      setOrder({ by: columnName, dir: 'ASC' });
      onSort?.({ by: columnName, dir: 'ASC' });
    } else if (order.dir === 'ASC') {
      setOrder({ by: columnName, dir: 'DESC' });
      onSort?.({ by: columnName, dir: 'DESC' });
    } else if (order) {
      setOrder(undefined);
      onSort?.(undefined);
    }
  };

  const handleFilterDisplay = ({ display }: Column<T>) =>
    display === undefined ? true : display;

  return (
    <Paper elevation={0} sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader {...tableProps}>
          <TableHead>
            <TableRow>
              {columns
                ?.filter(handleFilterDisplay)
                .map(({ render, sortable, display, ...column }, i) => (
                  <TableCell
                    {...column}
                    sx={{ fontWeight: 'bold', ...column.sx }}
                    key={i}
                  >
                    {column.label}
                    {sortable && (
                      <IconButton onClick={() => sort(column.name)}>
                        {order?.by !== column.name ? (
                          <ArrowUpwardIcon
                            sx={{
                              fontSize: 16,
                              opacity: 0.6,
                            }}
                          />
                        ) : order?.dir === 'ASC' ? (
                          <ArrowUpwardIcon
                            sx={{
                              fontSize: 16,
                            }}
                          />
                        ) : (
                          <ArrowDownwardIcon
                            sx={{
                              fontSize: 16,
                            }}
                          />
                        )}
                      </IconButton>
                    )}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns?.length}>
                  <Typography sx={{ textAlign: 'center' }}>
                    Loading...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {data?.map((row: T, i: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      {columns
                        ?.filter(handleFilterDisplay)
                        .map(({ display, ...column }, j) => {
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
                      <Typography sx={{ textAlign: 'center' }}>
                        No data
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </>
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
