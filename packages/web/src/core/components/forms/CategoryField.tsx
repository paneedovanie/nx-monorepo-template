import { useTsQueryClient } from '@/core/plugins';
import {
  Check as CheckIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import {
  List,
  Menu,
  TextField,
  TextFieldProps,
  Collapse,
  ListItemText,
  ListItemButton,
  FormControl,
} from '@mui/material';
import { Category, Store } from '@nx-monorepo-template/global';
import { MouseEventHandler, useRef, useState } from 'react';

type CategoryFieldProps = Omit<TextFieldProps, 'onSelect'> & {
  value?: Category;
  store?: Store;
  onSelect?: (v: Category) => void;
};

const RenderItem = ({
  store,
  value,
  item,
  onSelect,
}: {
  store?: Store;
  value?: Category;
  item: Category;
  onSelect?: (v: Category) => void;
}) => {
  const tsQueryClient = useTsQueryClient();
  const [open, setOpen] = useState(false);
  const hasChildren = !!item.children?.length;

  const { data: categoriesResult } = tsQueryClient.category.getAll.useQuery(
    [`getChildrenOf${item.id}`],
    {
      query: {
        store: store?.id,
        parent: item.id,
        perPage: -1,
        type: 'product',
      },
    },
    {
      enabled: hasChildren && open,
    }
  );

  const categories = categoriesResult?.body;

  const handleClick = () => {
    if (hasChildren) {
      setOpen((v) => !v);
    } else {
      onSelect?.(item);
    }
  };

  if (hasChildren) {
    return (
      <>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={item.title} />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        {hasChildren && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" sx={{ pl: 1 }}>
              {categories?.list.map((item) => (
                <RenderItem
                  store={store}
                  value={value}
                  item={item}
                  onSelect={onSelect}
                />
              ))}
            </List>
          </Collapse>
        )}
      </>
    );
  } else {
    return (
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={item.title} />
        {value?.id === item.id ? <CheckIcon fontSize="small" /> : null}
      </ListItemButton>
    );
  }
};

export const CategoryField = ({
  value: propsValue,
  onSelect,
  ...props
}: CategoryFieldProps) => {
  const tsQueryClient = useTsQueryClient();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<Category | undefined>(propsValue);
  const container = useRef<HTMLDivElement | null>(null);

  const { data: categoriesResult } = tsQueryClient.category.getAll.useQuery(
    ['getCategories', props.store],
    {
      query: {
        store: props.store?.id,
        perPage: -1,
        type: 'product',
        isRoot: true,
      },
    }
  );

  const categories = categoriesResult?.body;

  const handleOpen: MouseEventHandler<HTMLDivElement> = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <FormControl ref={container} sx={{ width: '100%', position: 'relative' }}>
      <TextField
        placeholder="Select category"
        {...props}
        onClick={handleOpen}
        value={value && `${value?.title}`}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          readOnly: true,
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        PaperProps={{ sx: { width: container.current?.clientWidth } }}
      >
        <List>
          {categories?.list.map((item, i) => (
            <RenderItem
              store={props.store}
              value={value}
              item={item}
              onSelect={(v) => {
                setValue(v);
                onSelect?.(v);
                handleClose();
              }}
              key={i}
            />
          ))}
        </List>
      </Menu>
    </FormControl>
  );
};
