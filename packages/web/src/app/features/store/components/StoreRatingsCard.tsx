import { StarRating, useTsQueryClient } from '@/core';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardProps,
  Typography,
} from '@mui/material';
import { Store } from '@nx-monorepo-template/global';
import { format } from 'date-fns';

export interface StoreRatingsCardCardProps extends CardProps {
  store: Store;
}

export const StoreRatingsCard = ({
  store,
  ...props
}: StoreRatingsCardCardProps) => {
  const tsQueryClient = useTsQueryClient();

  const { data: ratingsResult } = tsQueryClient.storeRating.getAll.useQuery(
    ['getStoreRatings'],
    {
      query: {
        store: store?.id,
        perPage: 2,
        orderBy: 'createdAt',
        orderDir: 'DESC',
      },
    }
  );

  const ratings = ratingsResult?.body;

  return (
    <Card {...props}>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h4">Ratings</Typography>
          <Button variant="contained" disabled={!store.rating}>
            See more
          </Button>
        </Box>
        <Box sx={{ flex: 1 }}>
          {!store.rating && (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5">No rating yet</Typography>
            </Box>
          )}
          {store.rating && (
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography variant="h2" sx={{ fontWeight: 400 }}>
                  {store.rating}
                </Typography>
                <StarRating rating={store.rating} size="large" />
              </Box>
              <Typography variant="caption">Overall Rating</Typography>
            </Box>
          )}
          {ratings?.list.map((rating, i) => {
            return (
              <Box sx={{ mb: 2 }} key={i}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {rating.user.firstName.charAt(0)}
                  </Avatar>
                  <Typography>
                    {rating.user.firstName + ' ' + rating.user.lastName}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StarRating rating={rating.rating} />
                  <Typography variant="caption">
                    {format(new Date(rating.createdAt), 'MMMM dd, Y')}
                  </Typography>
                </Box>
                {rating.comment && (
                  <Typography variant="body2">{rating.comment}</Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};
