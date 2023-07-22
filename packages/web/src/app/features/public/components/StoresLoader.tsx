import { Box, Card, CardContent, Grid, Skeleton } from '@mui/material';

export const StoresLoader = () => {
  return (
    <Grid container spacing={1} direction="column">
      {Array.from(Array(5)).map((_, i: number) => {
        return (
          <Grid item key={i}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: ['column', null, 'row'],
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  pt: [2, 2, 0],
                }}
              >
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  sx={{
                    width: [150, 150, 350],
                    height: [150, 150, 200],
                    borderRadius: ['50%', null, 'unset'],
                  }}
                />
              </Box>
              <CardContent sx={{ flex: 1 }}>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
