import { Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import { Socket, io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Order } from '@nx-monorepo-template/global';
import { apiBaseUrl } from '@/core';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

export const StoreStatusPage = () => {
  const socketRef = useRef<Socket>();
  const params = useParams();
  const storeId = params.id as string;
  const [preparing, setPreparing] = useState<Order[]>([]);
  const [ready, setReady] = useState<Order[]>([]);

  useEffect(() => {
    socketRef.current = io(apiBaseUrl + '/stores', {
      query: { storeId },
    });
    const onConnect = () => {
      console.log('Connected');
    };

    const onDisconnect = () => {
      console.log('Disconnected');
    };

    const onStatus = (e: { preparing: Order[]; ready: Order[] }) => {
      setPreparing(e.preparing);
      setReady(e.ready);
    };

    socketRef.current.on('connect', onConnect);
    socketRef.current.on('disconnect', onDisconnect);
    socketRef.current.on('status', onStatus);

    return () => {
      socketRef.current?.off('connect', onConnect);
      socketRef.current?.off('disconnect', onDisconnect);
      socketRef.current?.off('status', onStatus);
    };
  }, [storeId]);

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
