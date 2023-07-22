import { Card, CardContent, Grid, Skeleton } from '@mui/material';

export const ProductsLoader = () => {
  return (
    <Grid container spacing={1}>
      {Array.from(Array(6)).map((_, i) => {
        return (
          <Grid item xs={6} sm={4} lg={3} xl={2} key={i}>
            <Card>
              <Skeleton
                variant="rectangular"
                sx={{ height: [100, 200] }}
                animation="wave"
              />
              <CardContent>
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
