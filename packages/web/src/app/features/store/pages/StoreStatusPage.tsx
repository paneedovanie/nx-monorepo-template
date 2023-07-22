import { Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Event, Order, StoreStatusEvent } from '@nx-monorepo-template/global';
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

  const onStatus = useCallback(
    (e: StoreStatusEvent) => {
      if (storeId === e.storeId) {
        setPreparing(e.preparing);
        setReady(e.ready);
      }
    },
    [storeId]
  );

  useEffect(() => {
    socket?.on(Event.StoreStatus, onStatus);
    socket?.on('connect', () => {
      socket?.emit(Event.StoreStatus, storeId);
    });
  }, [socket, socket?.connected, storeId, onStatus]);

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
