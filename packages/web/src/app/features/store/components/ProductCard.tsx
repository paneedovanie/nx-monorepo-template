import { useCartContext, formatCurrency } from '@/core';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  FilterAlt as FilterAltIcon,
  Inventory as InventoryIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  Dialog,
  DialogContent,
} from '@mui/material';
import { Category, Product, generateColor } from '@nx-monorepo-template/global';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

const NumberField = styled(TextField)`
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    display: none;
  }
  padding: 0;
  max-width: 100px;
  text-align: center;
`;

export const ProductCard = ({ data }: { data: Product }) => {
  const [open, setOpen] = useState(false);
  const { cart, add, minus, set, remove } = useCartContext();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          '&:hover': {
            boxShadow: '0 0 5px gray',
          },
          cursor: 'pointer',
        }}
        onClick={handleOpen}
      >
        {data.image ? (
          <CardMedia sx={{ height: 200 }} image={data.image} />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: 200,
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: generateColor(data.title),
              color: 'white',
            }}
          >
            <InventoryIcon sx={{ height: 200, width: 200 }} color="inherit" />
          </Box>
        )}
        <CardContent>
          <Tooltip title={data.title}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data.title}
            </Typography>
          </Tooltip>
          <Tooltip title={data.description}>
            <Typography
              color="gray"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data.description}
            </Typography>
          </Tooltip>
          <Typography fontWeight={600}>{formatCurrency(data.price)}</Typography>
        </CardContent>
      </Card>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            overflow: 'hidden',
            borderRadius: 4,
            position: 'relative',
            maxWidth: 480,
            width: '100%',
          },
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            width: '100%',
          }}
        >
          {data.image ? (
            <img src={data.image} alt="product" width="100%" />
          ) : (
            <Box
              sx={{
                width: '100%',
                backgroundColor: generateColor(data.title),
                display: 'flex',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <InventoryIcon sx={{ height: 200, width: 200 }} color="inherit" />
            </Box>
          )}
        </Box>
        <DialogContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {data.categories.map((category: Category, i) => {
              const color = generateColor(category.title);
              return (
                <Chip
                  key={i}
                  icon={<FilterAltIcon color="inherit" />}
                  label={category.title}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: color, color }}
                />
              );
            })}
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={700}>
              {data.title}
            </Typography>
            <Typography color="gray" fontSize={14}>
              {data.description}
            </Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption">Price:</Typography>
            <Typography fontWeight={600}>
              {formatCurrency(data.price)}
            </Typography>
          </Box>
          <Box>
            <IconButton
              onClick={() => {
                add(data.id);
              }}
            >
              <AddIcon />
            </IconButton>
            <NumberField
              type="number"
              size="small"
              value={cart[data.id] ?? 0}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                set(data.id, +e.target.value)
              }
            />
            <IconButton
              disabled={!cart[data.id]}
              onClick={() => {
                minus(data.id);
              }}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton
              disabled={!cart[data.id]}
              onClick={() => {
                remove(data.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
