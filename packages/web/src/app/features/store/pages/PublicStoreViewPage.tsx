import {
  useCartContext,
  usePagination,
  Loading,
  Empty,
  useTsQueryClient,
} from '@/core';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Store as StoreIcon,
  Delete as DeleteIcon,
  Category as CategoryIcon,
  Search as SearchIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
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
import { BaseSyntheticEvent, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CartDialog } from '../components';
import { Category } from '@nx-monorepo-template/global';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

const NumberField = styled(TextField)`
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    display: none;
  }
  padding: 0;
  max-width: 100px;
  text-align: center;
`;

export const PublicStoreViewPage = () => {
  const tsQueryClient = useTsQueryClient();
  const { cart, add, minus, set, remove } = useCartContext();
  const params = useParams();
  const { search, page, perPage, setSearch, setPage } = usePagination();
  const [categoryIds, setCategoryIds] = useState<string[]>();

  const id = params.id as string;

  const container =
    window !== undefined ? () => window.document.body : undefined;
  const [filterOpen, setFilterOpen] = useState(false);

  const { data: storeResult } = tsQueryClient.store.get.useQuery(
    ['getStore', id],
    {
      params: { id },
    }
  );
  const store = storeResult?.body;

  const { data: productsResult, isFetching: isFetchingProducts } =
    tsQueryClient.product.getAll.useQuery(['getProducts', store?.id], {
      query: {
        store: store?.id,
        categoryIds,
        search,
        perPage,
        page,
      },
    });
  const products = productsResult?.body;
  const count = Math.floor((products?.count ?? 0) / (products?.perPage ?? 10));

  const { data: categoriesResult } = tsQueryClient.category.getAll.useQuery(
    ['getCategories'],
    {
      query: {
        perPage: -1,
        type: 'product',
        isRoot: true,
      },
    }
  );

  const categories = categoriesResult?.body;

  const renderTree = (node: Category, parentActive?: boolean) => {
    const active =
      (categoryIds?.some((id) => [node.id, node.parent].includes(id)) ||
        parentActive) ??
      false;

    return (
      <Fragment key={node.id}>
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
                setCategoryIds(Array.from(catSet));
              }}
            />
          }
        >
          <ListItemText primary={node.title} />
        </ListItem>
        {!!node.children?.length && (
          <List dense sx={{ ml: 2 }} disablePadding>
            {node.children.map((node) => renderTree(node, active))}
          </List>
        )}
      </Fragment>
    );
  };

  return (
    <Container>
      <Drawer
        container={container}
        variant="temporary"
        open={filterOpen}
        onClose={() => {
          setFilterOpen(false);
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 1 }}>
          <Typography variant="h6">Category</Typography>
        </Box>
        <List dense>{categories?.list.map((node) => renderTree(node))}</List>
      </Drawer>
      <Grid container spacing={1} mb={1}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                {store?.image ? (
                  <img
                    src={store?.image}
                    alt="store"
                    height={150}
                    width={150}
                  />
                ) : (
                  <StoreIcon
                    sx={{
                      height: 150,
                      width: 150,
                      mb: 4,
                    }}
                  />
                )}
                <Typography variant="h4">{store?.title}</Typography>
                <Typography>{store?.description}</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box>
        <Toolbar
          sx={{
            display: 'flex',
            background: 'white',
            mb: 1,
            gap: 1,
          }}
        >
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
          <Button
            variant="outlined"
            onClick={() => {
              setFilterOpen(true);
            }}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <CategoryIcon />
            <Typography sx={{ ml: 1, display: ['none', 'inline'] }}>
              Filter
            </Typography>
          </Button>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
            <CartDialog storeId={id} />
          </Box>
        </Toolbar>

        {isFetchingProducts ? (
          <Loading size="small" text="Fetching..." />
        ) : (
          <Grid container spacing={1}>
            {products?.list?.map((item, i) => {
              return (
                <Grid item xs={12} md={6} xl={3} key={i}>
                  <Card>
                    {item.image ? (
                      <CardMedia
                        sx={{ height: 140 }}
                        image={item.image}
                        title="product image"
                      />
                    ) : (
                      <Box
                        sx={{
                          width: '100%',
                          height: 140,
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <InventoryIcon sx={{ height: 140, width: 140 }} />
                      </Box>
                    )}
                    <CardContent>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography variant="caption">
                          {item.description}
                        </Typography>
                      </Box>
                      <Typography>Price: {item.price}</Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        onClick={() => {
                          add(item.id);
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                      <NumberField
                        type="number"
                        size="small"
                        value={cart[item.id] ?? 0}
                        onChange={(e) => set(item.id, +e.target.value)}
                      />
                      <IconButton
                        disabled={!cart[item.id]}
                        onClick={() => {
                          minus(item.id);
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <IconButton
                        disabled={!cart[item.id]}
                        onClick={() => {
                          remove(item.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
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
          <Box>
            <Pagination
              sx={{ m: 'auto' }}
              page={products?.page}
              count={10}
              onChange={(e: BaseSyntheticEvent) => {
                setPage(e.target.value);
              }}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};
