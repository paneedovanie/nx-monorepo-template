import {
  useTsQueryClient,
  useAuthContext,
  FormGenerator,
  FormGeneratorItem,
} from '@/core';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import {
  CreateStoreRating,
  CreateStoreRatingSchema,
  StoreRating,
} from '@nx-monorepo-template/global';
import {
  ShoppingCart as ShoppingCartIcon,
  RateReview as RateViewIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useState } from 'react';

export const StoreRatingDialog = ({
  storeId,
  onSuccess,
}: {
  storeId: string;
  onSuccess?: (data: StoreRating) => void;
}) => {
  const tsQueryClient = useTsQueryClient();
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutate: create } = tsQueryClient.storeRating.create.useMutation({
    onSuccess: (v) => {
      onSuccess?.(v.body);
      handleClose();
    },
  });

  const value = {
    user: user?.id as string,
    store: storeId,
    rating: 0,
    comment: '',
  };

  const items: FormGeneratorItem[] = [
    {
      label: 'Rating',
      name: 'rating',
      component: (options) => {
        return (
          <Box>
            {Array.from({ length: 5 }, (_, index) => index).map((item) => {
              return (
                <StarIcon
                  key={item}
                  color={item < options.value ? 'warning' : 'inherit'}
                  fontSize="small"
                  onClick={() =>
                    options.context?.setFieldValue(options.name, item + 1)
                  }
                />
              );
            })}
          </Box>
        );
      },
    },
    {
      label: 'Comment',
      name: 'comment',
      component: 'TextField',
      props: {
        multiline: true,
        rows: 2,
      },
    },
  ];

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ display: 'flex', alignItems: 'center' }}
        variant="outlined"
      >
        <StarIcon />
        <Typography sx={{ ml: 1, display: ['none', 'inline'] }}>
          Rate
        </Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography>Store Rating</Typography>
        </DialogTitle>

        <DialogContent>
          {/* {data?.id ? (
            <FormGenerator<StoreRating, UpdateStoreRating>
              initialValues={value}
              schema={UpdateStoreRatingSchema}
              successMessage={'Product updated'}
              onSubmit={(v, options) => {
                update({ params: { id: data.id }, body: v }, options);
              }}
              items={items}
            />
          ) : ( */}
          <FormGenerator<StoreRating, CreateStoreRating>
            initialValues={value}
            schema={CreateStoreRatingSchema}
            successMessage={'Product created'}
            onSubmit={(v, options) => {
              create({ body: v }, options);
            }}
            items={items}
            onCancel={handleClose}
          />
          {/* )} */}
        </DialogContent>
      </Dialog>
    </>
  );
};
