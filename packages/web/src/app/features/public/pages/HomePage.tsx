import { useTsQueryClient, usePagination } from '@/core';
import { Store as StoreIcon } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
export const HomePage = () => {
  const tsQueryClient = useTsQueryClient();
  const navigate = useNavigate();
  const { page, perPage, search } = usePagination(undefined, {
    query: true,
  });

  const { data } = tsQueryClient.store.getAll.useQuery(['getStores'], {
    query: {
      search,
      perPage,
      page,
    },
  });

  const stores = data?.body;

  return (
    <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
      <Grid container spacing={2}>
        {stores?.list.map((item, i) => {
          return (
            <Grid item xs={12} md={6} xl={4} key={i}>
              <Card
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate(`/stores/${item.id}`);
                }}
              >
                {item.image ? (
                  <CardMedia
                    sx={{ height: 140 }}
                    image={item.image}
                    title="shop image"
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
                    <StoreIcon sx={{ height: 140, width: 140 }} />
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h5" mb={2}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption">Description</Typography>
                  <Typography>{item.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
