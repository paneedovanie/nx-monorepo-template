import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

export enum Media {
  ExtraSmall = 'xs',
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}

const defaultValue: Record<Media, boolean> = {
  [Media.ExtraSmall]: false,
  [Media.Small]: false,
  [Media.Medium]: false,
  [Media.Large]: false,
  [Media.ExtraLarge]: false,
};

export const useMedia = () => {
  const theme = useTheme();
  const [medias, setMedias] = useState<Record<Media, boolean>>(defaultValue);

  useEffect(() => {
    const getMediaValues = () => {
      const reducer = (curr: Record<Media, boolean>, key: Media) => ({
        ...curr,
        [key]: window.innerWidth >= theme.breakpoints.values[key],
      });
      setMedias((v) => Object.values(Media).reduce(reducer, defaultValue));
    };

    getMediaValues();

    window.onresize = getMediaValues;
  }, [theme]);

  return medias;
};
