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
    +(query.get('page') ?? initial?.perPage ?? 5)
  );
  const [page, setPage] = useState(+(query.get('page') ?? initial?.page ?? 1));
  const [search, setSearch] = useState<string>();
  const searchDelayRef = useRef<NodeJS.Timeout>();

  const handlePerPage = (v: number) => {
    if (options?.query) {
      query.set('perPage', v.toString());
      query.set('page', '1');
    }
    navigate({ search: query.toString() });
    setPerPage(v);
  };

  const handlePage = (v: number) => {
    if (options?.query) {
      query.set('page', v.toString());
    }
    navigate({ search: query.toString() });
    setPage(v);
  };

  const handleSearch = (v: string) => {
    clearTimeout(searchDelayRef.current);
    searchDelayRef.current = setTimeout(() => {
      if (options?.query) {
        query.set('search', v);
        query.set('page', '1');
      }
      navigate({ search: query.toString() });
      setSearch(v);
    }, 300);
  };

  return {
    perPage,
    page,
    search,
    setSearch: handleSearch,
    setPage: handlePage,
    setPerPage: handlePerPage,
  };
};
