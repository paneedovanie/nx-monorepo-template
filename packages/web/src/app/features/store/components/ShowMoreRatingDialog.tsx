import { useTsQueryClient, usePagination, StarRating } from '@/core';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  Typography,
} from '@mui/material';
import { Store } from '@nx-monorepo-template/global';
import { format } from 'date-fns';
import { BaseSyntheticEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ShowMoreRatingDialog = ({ store }: { store: Store }) => {
  const tsQueryClient = useTsQueryClient();
  const navigate = useNavigate();
  const { page, perPage, setPerPage, setPage } = usePagination();
  const [open, setOpen] = useState(false);

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

  const pageCount = useMemo(() => {
    const count = ratings?.count ?? 0;
    const perPage = ratings?.perPage ?? 0;
    return Math.ceil(count / perPage);
  }, [ratings]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" disabled={!store.rating} onClick={handleOpen}>
        See more
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { maxWidth: 750, width: '100%' } }}
      >
        <DialogTitle
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h5">Store Ratings</Typography>
        </DialogTitle>
        <DialogContent>
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
          {!!pageCount && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
              <Pagination
                sx={{ m: 'auto' }}
                page={ratings?.page}
                count={pageCount}
                onChange={(e: BaseSyntheticEvent, value: number) => {
                  setPage(value);
                }}
                color="primary"
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            display: 'flex',
          }}
        >
          <Button
            variant="contained"
            sx={{ flex: [1, 'unset'], minWidth: 120 }}
            onClick={handleClose}
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
