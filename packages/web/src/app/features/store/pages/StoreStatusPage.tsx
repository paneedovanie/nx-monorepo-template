import { Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Event, Order } from '@nx-monorepo-template/global';
import { useEventContext } from '@/core';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const StoreStatusPage = () => {
  const params = useParams();
  const storeId = params.storeId as string;
  const [preparing, setPreparing] = useState<Order[]>([]);
  const [ready, setReady] = useState<Order[]>([]);
  const { socket } = useEventContext();

  const onStatus = (e: { preparing: Order[]; ready: Order[] }) => {
    setPreparing(e.preparing);
    setReady(e.ready);
  };

  useEffect(() => {
    socket?.on(Event.StoreStatus, onStatus);
    socket?.on('connect', () => {
      socket?.emit(Event.StoreStatus, storeId);
    });
  }, [socket, socket?.connected, storeId]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h5" color="orange">
            Preparing
          </Typography>
          {preparing.map(({ ref }) => (
            <Typography variant="h6" key={ref}>
              {ref}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" color="green">
            Ready
          </Typography>
          {ready.map(({ ref }) => (
            <Typography variant="h6" key={ref}>
              {ref}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};
