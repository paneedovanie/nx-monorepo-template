import {
  useCartContext,
  usePagination,
  Loading,
  Empty,
  useTsQueryClient,
  StarRating,
  useAuthContext,
  formatCurrency,
  Tags,
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
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
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
  colors,
} from '@mui/material';
import { BaseSyntheticEvent, Fragment, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CartDialog, StoreRatingDialog } from '../components';
import { Category, Product, generateColor } from '@nx-monorepo-template/global';
import { format } from 'date-fns';

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
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const id = params.id as string;

  const container =
    window !== undefined ? () => window.document.body : undefined;
  const [filterOpen, setFilterOpen] = useState(false);

  const { data: storeResult, isFetching: isFetchingStore } =
    tsQueryClient.store.get.useQuery(['getStore', id], {
      params: { id },
    });
  const store = storeResult?.body;

  const { data: productsResult, isFetching: isFetchingProducts } =
    tsQueryClient.product.getAll.useQuery(
      ['getProducts', store?.id, categoryIds, page],
      {
        query: {
          store: store?.id,
          categoryIds,
          search,
          perPage,
          page,
        },
      }
    );
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

  const { data: ratingsResult, isFetching } =
    tsQueryClient.storeRating.getAll.useQuery(['getStoreRatings'], {
      query: {
        store: id,
      },
    });

  const ratings = ratingsResult?.body;

  const pageCount = useMemo(() => {
    const count = products?.count ?? 0;
    const perPage = products?.perPage ?? 0;
    return Math.ceil(count / perPage);
  }, [products]);

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

  if (isFetchingStore) {
    return <Loading />;
  } else if (!store) {
    navigate('/');
    return null;
  }

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
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: ['column', null, 'row'],
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: 200,
                      minWidth: 200,
                      maxHeight: 200,
                      minHeight: 200,
                      display: 'flex',
                      justifyContent: 'center',
                      backgroundColor: generateColor(store.title),
                      color: 'white',
                      borderRadius: '50%',
                      overflow: 'hidden',
                    }}
                  >
                    {store?.image ? (
                      <Box
                        sx={{
                          width: '100%',
                          height: 200,
                          backgroundImage: `url('${store.image}')`,
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
                  <Box>
                    <Tags tags={store?.tags} />
                    <Typography variant="h4">{store?.title}</Typography>
                    <StarRating rating={store?.rating ?? 0} />
                    <Typography>{store?.description}</Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItem: 'center',
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 1 }}>
                      Ratings and Reviews
                    </Typography>
                    {user && <StoreRatingDialog storeId={id} />}
                  </Box>
                  {ratings?.list.map((rating, i) => {
                    return (
                      <Box sx={{ mb: 1 }} key={i}>
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <Avatar sx={{ fontSize: 14, width: 24, height: 24 }}>
                            {rating.user.firstName.charAt(0)}
                          </Avatar>
                          <Typography variant="subtitle1">
                            {rating.user.firstName}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                        >
                          <StarRating rating={rating.rating} />
                          <Typography variant="caption">
                            {format(new Date(rating.createdAt), 'MMMM dd, Y')}
                          </Typography>
                        </Box>
                        <Typography>{rating.comment}</Typography>
                      </Box>
                    );
                  })}
                  {!ratings?.list.length && <Typography>No review</Typography>}
                </Box>
              </Box>
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
            {products?.list?.map((item: Product, i: number) => {
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
                          backgroundColor: generateColor(item.title),
                          color: 'white',
                        }}
                      >
                        <InventoryIcon
                          sx={{ height: 140, width: 140 }}
                          color="inherit"
                        />
                      </Box>
                    )}
                    <CardContent>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {item.categories.map((category: Category, i) => {
                          const color = generateColor(category.title);
                          return (
                            <Chip
                              key={i}
                              icon={<CategoryIcon color="inherit" />}
                              label={category.title}
                              size="small"
                              variant="outlined"
                              sx={{ borderColor: color, color }}
                            />
                          );
                        })}
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography variant="caption">
                          {item.description}
                        </Typography>
                      </Box>
                      <Typography>
                        Price: {formatCurrency(item.price)}
                      </Typography>
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
  );
};
