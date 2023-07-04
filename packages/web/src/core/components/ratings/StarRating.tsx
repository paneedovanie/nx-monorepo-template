import { Star as StarIcon } from '@mui/icons-material';
import { Box } from '@mui/material';

export const StarRating = ({ rating }: { rating: number }) => {
  const activeStarCount = Math.ceil(rating);

  return (
    <Box>
      {Array.from({ length: 5 }, (_, index) => index).map((item) => {
        return (
          <StarIcon
            key={item}
            color={item < activeStarCount ? 'warning' : 'inherit'}
            fontSize="small"
          />
        );
      })}
    </Box>
  );
};
