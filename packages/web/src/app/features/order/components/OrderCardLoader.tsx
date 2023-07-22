import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';

export const OrderCardLoader = () => {
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent sx={{ position: 'relative' }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm="auto"
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={150}
              height={150}
            />
          </Grid>
          <Grid item xs={12} sm="auto">
            <Skeleton variant="text" animation="wave" sx={{ width: 150 }} />
            <Skeleton variant="text" animation="wave" sx={{ width: 150 }} />
            <Skeleton variant="text" animation="wave" sx={{ width: 150 }} />
            <Skeleton variant="text" animation="wave" sx={{ width: 150 }} />
          </Grid>
        </Grid>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex' }}>
          <Typography fontSize={[12, 16]} sx={{ fontWeight: 700 }}>
            Product
          </Typography>
          <Typography
            fontSize={[12, 16]}
            sx={{ flex: 1, textAlign: 'right', fontWeight: 700 }}
          >
            Total Price
          </Typography>
        </Box>
        <Box>
          {Array.from(Array(5)).map((_, i: number) => {
            return (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton variant="text" animation="wave" sx={{ width: 300 }} />
                <Skeleton variant="text" animation="wave" sx={{ width: 150 }} />
              </Box>
            );
          })}
        </Box>
        <Divider sx={{ mt: 1 }} />
      </CardContent>

      <CardActions>
        <Box>
          <Typography
            variant="h6"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            Total Cost:{' '}
            <Skeleton variant="text" animation="wave" sx={{ width: 150 }} />
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
};
