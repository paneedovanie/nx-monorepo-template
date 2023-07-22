import {
  useCartContext,
  usePagination,
  Loading,
  Empty,
  useTsQueryClient,
  TopBar,
  LayoutLoader,
} from '@/core';
import {
  FilterAlt as FilterAltIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import {
  Box,
  Checkbox,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Pagination,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  BaseSyntheticEvent,
  Fragment,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  CartDialog,
  PriceRanges,
  ProductCard,
  ProductsLoader,
} from '../components';
import {
  Category,
  PriceRange,
  Product,
  Store,
} from '@nx-monorepo-template/global';

const Container = styled(Box)`
  padding: ${({ theme }) => theme.padding.md};
`;

const RenderTree = ({
  store,
  node,
  parentActive,
  categoryIds,
  onSelect,
}: {
  store?: Store;
  node: Category;
  parentActive?: boolean;
  categoryIds?: string[];
  onSelect?: (v: string[]) => void;
}) => {
  const tsQueryClient = useTsQueryClient();
  const active =
    (categoryIds?.some((id) => [node.id, node.parent].includes(id)) ||
      parentActive) ??
    false;

  const hasChildren = !!node.children?.length;

  const { data: categoriesResult } = tsQueryClient.category.getAll.useQuery(
    [`getProductsCategories${node.id}`, store?.id],
    {
      query: {
        store: store?.id,
        perPage: -1,
        type: 'product',
        parent: node.id,
      },
    },
    {
      enabled: hasChildren,
    }
  );

  const categories = categoriesResult?.body;

  return (
    <Fragment>
      <ListItem
        secondaryAction={
          <Checkbox
            disabled={parentActive}
            checked={active}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const catSet = new Set<string>(categoryIds);
              if (e.target.checked) {
                catSet.add(node.id);
              } else {
                catSet.delete(node.id);
              }
              onSelect?.(Array.from(catSet));
            }}
          />
        }
      >
        <ListItemText primary={node.title} />
      </ListItem>
      {hasChildren && (
        <List dense sx={{ ml: 2 }} disablePadding>
          {categories?.list.map((node) => (
            <RenderTree
              key={node.id}
              store={store}
              node={node}
              parentActive={active}
              categoryIds={categoryIds}
              onSelect={onSelect}
            />
          ))}
        </List>
      )}
    </Fragment>
  );
};

export const PublicStoreViewPage = () => {
  const tsQueryClient = useTsQueryClient();
  const { store, isFetchingStore } = useCartContext();
  const { search, page, perPage, setSearch, setPage } = usePagination();
  const [priceRange, setPriceRange] = useState<PriceRange>();
  const [categoryIds, setCategoryIds] = useState<string[]>();
  const navigate = useNavigate();
  const drawerWidth = 250;

  const container =
    window !== undefined ? () => window.document.body : undefined;
  const [filterOpen, setFilterOpen] = useState(false);

  const { data: productsResult, isFetching: isFetchingProducts } =
    tsQueryClient.product.getAll.useQuery(
      [
        'getProducts',
        search,
        store?.id,
        categoryIds,
        page,
        store?.id,
        priceRange?.minPrice,
        priceRange?.maxPrice,
      ],
      {
        query: {
          store: store?.id,
          categoryIds,
          search,
          perPage,
          page,
          minPrice: priceRange?.minPrice,
          maxPrice: priceRange?.maxPrice,
        },
      }
    );
  const products = productsResult?.body;
  const count = Math.floor((products?.count ?? 0) / (products?.perPage ?? 10));

  const { data: categoriesResult } = tsQueryClient.category.getAll.useQuery(
    ['getCategories', store?.id],
    {
      query: {
        store: store?.id,
        perPage: -1,
        type: 'product',
        isRoot: true,
      },
    }
  );

  const categories = categoriesResult?.body;

  const pageCount = useMemo(() => {
    const count = products?.count ?? 0;
    const perPage = products?.perPage ?? 0;
    return Math.ceil(count / perPage);
  }, [products]);

  const drawer = (
    <>
      <Toolbar />
      <Box sx={{ p: 1 }}>
        <Typography variant="h6">Category</Typography>
      </Box>
      <List dense>
        {categories?.list.map((node) => (
          <RenderTree
            key={node.id}
            store={store}
            node={node}
            categoryIds={categoryIds}
            onSelect={(v) => setCategoryIds(v)}
          />
        ))}
      </List>
    </>
  );

  useEffect(() => {
    if (store?.id) {
      localStorage.setItem('storeId', store?.id);
    }
  }, [store]);

  if (isFetchingStore) {
    return <LayoutLoader color={store?.config?.primaryColor} />;
  } else if (!store) {
    navigate('/');
    return null;
  }

  return (
    <>
      <TopBar store={store} />
      <Box component="main" sx={{ display: 'flex' }}>
        <Box sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
          <Drawer
            container={container}
            variant="temporary"
            open={filterOpen}
            onClose={() => {
              setFilterOpen(false);
            }}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              background: 'white',
              gap: 1,
            }}
          >
            <IconButton
              onClick={() => {
                setFilterOpen(true);
              }}
              sx={{ display: ['inline', null, 'none'] }}
            >
              <FilterAltIcon />
            </IconButton>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
              <CartDialog />
            </Box>
          </Toolbar>
          <Container>
            <Box sx={{ mb: 1, overflowX: 'auto', maxWidth: '100%' }}>
              <PriceRanges onChange={setPriceRange} />
            </Box>
            <Box>
              {isFetchingProducts ? (
                <ProductsLoader />
              ) : (
                <Grid container spacing={1}>
                  {products?.list?.map((item: Product, i: number) => {
                    return (
                      <Grid item xs={6} sm={4} lg={3} xl={2} key={i}>
                        <ProductCard data={item} />
                      </Grid>
                    );
                  })}
                  {!products?.list.length && (
                    <Grid item xs={12}>
                      <Empty size="small" />
                    </Grid>
                  )}
                </Grid>
              )}
              {!!count && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
                  <Pagination
                    sx={{ m: 'auto' }}
                    page={products?.page}
                    count={pageCount}
                    onChange={(e: BaseSyntheticEvent, value: number) => {
                      setPage(value);
                    }}
                    color="primary"
                  />
                </Box>
              )}
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};
