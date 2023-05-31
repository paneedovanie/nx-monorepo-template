import { PaginationOrder } from '@nx-monorepo-template/global';
import { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const usePagination = (
  initial?: {
    perPage?: number;
    page?: number;
  },
  options?: {
    query?: boolean;
  }
) => {
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const [perPage, setPerPage] = useState(
    options?.query && +(query.get('perPage') ?? initial?.perPage ?? 5)
  );
  const [page, setPage] = useState(
    options?.query && +(query.get('page') ?? initial?.page ?? 1)
  );
  const [search, setSearch] = useState<string | null>(
    options?.query ? query.get('search') : null
  );
  const [order, setOrder] = useState<PaginationOrder | undefined>(
    options?.query && query.get('orderBy')
      ? {
          by: query.get('orderBy') as string,
          dir: (query.get('orderDir') ?? 'ASC') as 'ASC' | 'DESC',
        }
      : undefined
  );
  const searchDelayRef = useRef<NodeJS.Timeout>();

  const handlePerPage = (v: number) => {
    if (options?.query) {
      query.set('perPage', v.toString());
      query.set('page', '1');
      navigate({ search: query.toString() });
    }
    setPerPage(v);
  };

  const handlePage = (v: number) => {
    if (options?.query) {
      query.set('page', v.toString());
      navigate({ search: query.toString() });
    }
    setPage(v);
  };

  const handleSearch = (v: string) => {
    clearTimeout(searchDelayRef.current);
    searchDelayRef.current = setTimeout(() => {
      if (options?.query) {
        query.set('search', v);
        query.set('page', '1');
        navigate({ search: query.toString() });
      }
      setSearch(v);
    }, 300);
  };

  const handleOrder = (v?: PaginationOrder) => {
    if (options?.query) {
      if (v) {
        query.set('orderBy', v.by);
        query.set('orderDir', v.dir);
      } else {
        query.delete('orderBy');
        query.delete('orderDir');
      }
      navigate({ search: query.toString() });
    }
    setOrder(v);
  };

  return {
    perPage,
    page,
    search,
    order,
    setSearch: handleSearch,
    setPage: handlePage,
    setPerPage: handlePerPage,
    setOrder: handleOrder,
  };
};
