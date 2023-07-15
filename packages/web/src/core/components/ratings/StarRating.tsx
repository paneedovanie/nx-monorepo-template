import { Star as StarIcon } from '@mui/icons-material';
import { Box } from '@mui/material';

export const StarRating = ({
  rating,
  size = 'small',
}: {
  rating: number;
  size?: 'small' | 'inherit' | 'medium' | 'large';
}) => {
  const activeStarCount = Math.ceil(rating);

  return (
    <Box>
      {Array.from({ length: 5 }, (_, index) => index).map((item) => {
        return (
          <StarIcon
            key={item}
            color={item < activeStarCount ? 'warning' : 'inherit'}
            fontSize={size}
          />
        );
      })}
    </Box>
  );
};
