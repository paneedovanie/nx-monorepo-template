import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Event,
  Order,
  StorePreparingEvent,
} from '@nx-monorepo-template/global';
import { useEventContext } from '@/core';
import { formatDistanceToNow } from 'date-fns';

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.md};
`;

const Sticker = ({ data }: { data: Order }) => {
  const [currDate, setCurrDate] = useState(new Date(data.createdAt));
  const timerRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrDate((v) => {
        v.setSeconds(v.getSeconds() + 1);
        return v;
      });
    }, 1000);
  });

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" key={data.ref}>
            #{data.ref}
          </Typography>
          <Typography variant="caption">
            {formatDistanceToNow(currDate)}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography fontWeight={600}>Product</Typography>
          <Typography fontWeight={600}>Quantity</Typography>
        </Box>
        {data.items.map((item) => {
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography>{item.title}</Typography>
              <Typography>x{item.count}</Typography>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};

export const StorePreparationPage = () => {
  const params = useParams();
  const storeId = params.storeId as string;
  const [preparing, setPreparing] = useState<Order[]>([]);
  const { socket } = useEventContext();

  const onPreparing = useCallback(
    (e: StorePreparingEvent) => {
      if (storeId === e.storeId) {
        setPreparing(e.preparing);
      }
    },
    [storeId]
  );

  useEffect(() => {
    socket?.on(Event.StorePreparation, onPreparing);
    socket?.emit(Event.StorePreparation, storeId);
  }, [socket, socket?.connected, storeId, onPreparing]);

  return (
    <Container>
      <Typography variant="h5" color="orange" sx={{ mb: 3 }}>
        Preparing
      </Typography>
      <Grid container spacing={1}>
        {preparing.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Sticker data={item} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
