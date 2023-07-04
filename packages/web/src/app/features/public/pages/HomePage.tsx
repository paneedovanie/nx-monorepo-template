import {
  useTsQueryClient,
  usePagination,
  StarRating,
  Tags,
  formatCurrency,
} from '@/core';
import { Store as StoreIcon } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Pagination,
  TextField,
  Toolbar,
  Typography,
  colors,
} from '@mui/material';
import { Product, Store, generateColor } from '@nx-monorepo-template/global';
import { BaseSyntheticEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const HomePage = () => {
  const tsQueryClient = useTsQueryClient();
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<string[]>();
  const { page, perPage, search, setPage, setSearch } = usePagination(
    undefined,
    {
      query: true,
    }
  );

  const { data } = tsQueryClient.store.getAll.useQuery(
    ['getStores', page, search, selectedTags],
    {
      query: {
        unrestricted: true,
        search,
        perPage,
        page,
        tags: selectedTags,
      },
    }
  );

  const stores = data?.body;

  const { data: tagsResult } = tsQueryClient.tag.getAll.useQuery(
    ['getTags'],
    {
      query: {
        type: 'product',
        perPage: -1,
      },
    },
    {
      cacheTime: 0,
      staleTime: Infinity,
    }
  );

  const tags = tagsResult?.body;

  const pageCount = useMemo(() => {
    const count = stores?.count ?? 0;
    const perPage = stores?.perPage ?? 0;
    return Math.ceil(count / perPage);
  }, [stores]);

  return (
    <Box sx={{ p: 1 }}>
      <Toolbar
        sx={{
          backgroundColor: 'white',
          mb: 1,
          gap: 1,
          flexDirection: 'column',
          alignItems: 'start',
          p: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            defaultValue={search}
            size="small"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </Box>
        {!!tags?.list.length && (
          <>
            <Typography>Tags</Typography>
            <Box>
              <Tags tags={tags?.list} input onChange={setSelectedTags} />
            </Box>
          </>
        )}
      </Toolbar>
      <Grid container spacing={1} direction="column">
        {stores?.list.map((item: Store, i: number) => {
          return (
            <Grid item key={i}>
              <Card
                elevation={0}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: ['column', null, 'row'],
                  height: [null, null, 200],
                  '&:hover': {
                    transform: `scale(1.005)`,
                  },
                  transition: `all 0.3s ease`,
                }}
                onClick={() => {
                  navigate(`/stores/${item.id}`);
                }}
              >
                <Box
                  sx={{
                    maxWidth: 350,
                    minWidth: 350,
                    maxHeight: 200,
                    minHeight: 200,
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: generateColor(item.title),
                    color: 'white',
                  }}
                >
                  {item.image ? (
                    <Box
                      sx={{
                        width: '100%',
                        height: 200,
                        backgroundImage: `url('${item.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  ) : (
                    <StoreIcon
                      sx={{
                        width: '100%',
                        height: '100%',
                      }}
                      color="inherit"
                    />
                  )}
                </Box>
                <CardContent sx={{ flex: 1 }}>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Tags tags={item.tags} />
                      <Typography variant="h5">{item.title}</Typography>
                      <StarRating rating={item.rating} />
                      <Typography variant="caption">Description</Typography>
                      <Typography>{item.description}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="caption">Products</Typography>
                      {item.products.map((product: Product, i) => {
                        return (
                          <Typography key={i}>
                            {product.title}: {formatCurrency(product.price)}
                          </Typography>
                        );
                      })}
                      {!item.products.length && (
                        <Typography>No product</Typography>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {!stores?.list.length && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 5,
          }}
        >
          <Typography>No store</Typography>
        </Box>
      )}
      {!!pageCount && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
          <Pagination
            sx={{ m: 'auto' }}
            page={stores?.page}
            count={pageCount}
            onChange={(e: BaseSyntheticEvent, value: number) => {
              setPage(value);
            }}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};
