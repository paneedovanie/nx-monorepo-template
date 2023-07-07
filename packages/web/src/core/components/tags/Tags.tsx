import { Box, Chip } from '@mui/material';
import { Tag, generateColor } from '@nx-monorepo-template/global';
import { LocalOffer as LocalOfferIcon } from '@mui/icons-material';
import { useEffect, useMemo, useState } from 'react';

export const Tags = ({
  tags,
  input,
  onChange,
}: {
  tags?: Tag[];
  input?: boolean;
  onChange?: (tags?: string[]) => void;
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>();
  const unselectedColor = '#999999';
  const selectedSet = useMemo(() => {
    return new Set<string>(selectedTags ?? []);
  }, [selectedTags]);

  const handleRemove = (id: string) => {
    if (selectedSet.has(id)) {
      selectedSet.delete(id);
      setSelectedTags(selectedSet.size ? Array.from(selectedSet) : undefined);
    }
  };
  const handleAdd = (id: string) => {
    if (!selectedSet.has(id)) {
      setSelectedTags((v) => (Array.isArray(v) ? [...v, id] : [id]));
    }
  };

  useEffect(() => {
    onChange?.(selectedTags);
  }, [selectedTags, onChange]);

  return (
    <Box>
      {tags?.map((tag: Tag, i: number) => {
        const color =
          selectedSet.has(tag.id) || !input
            ? generateColor(tag.title)
            : unselectedColor;

        return (
          <Chip
            key={i}
            variant="outlined"
            icon={<LocalOfferIcon color="inherit" />}
            size="small"
            label={tag.title}
            sx={{ borderColor: color, color }}
            onClick={
              input
                ? () =>
                    input && selectedSet.has(tag.id)
                      ? handleRemove(tag.id)
                      : handleAdd(tag.id)
                : undefined
            }
          />
        );
      })}
    </Box>
  );
};
