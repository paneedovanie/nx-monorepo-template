import { Box, BoxProps, Chip } from '@mui/material';
import { PriceRange } from '@nx-monorepo-template/global';
import { useEffect, useState } from 'react';

export interface PriceRangesProps extends Omit<BoxProps, 'onChange'> {
  onChange?: (range?: PriceRange) => void;
}

export const PriceRanges = ({ onChange, ...props }: PriceRangesProps) => {
  const ranges = [
    {
      minPrice: 1,
      maxPrice: 100,
    },
    {
      minPrice: 101,
      maxPrice: 200,
    },
    {
      minPrice: 201,
      maxPrice: 300,
    },
    {
      minPrice: 301,
      maxPrice: 400,
    },
    {
      minPrice: 401,
      maxPrice: 500,
    },
  ];
  const [selectedRange, setSelectedRange] = useState<PriceRange>();

  useEffect(() => {
    onChange?.(selectedRange);
  }, [selectedRange, onChange]);

  return (
    <Box {...props} sx={{ display: 'flex', gap: '3px', ...props.sx }}>
      {ranges?.map((range, i: number) => {
        const isSelected = selectedRange?.minPrice === range.minPrice;
        return (
          <Chip
            key={i}
            variant={isSelected ? 'filled' : 'outlined'}
            color="primary"
            size="small"
            label={`${range.minPrice} - ${range.maxPrice}`}
            onClick={() => {
              setSelectedRange(isSelected ? undefined : range);
            }}
          />
        );
      })}
    </Box>
  );
};
