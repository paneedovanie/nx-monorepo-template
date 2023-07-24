import {
  FormGenerator,
  QrcodeDialog,
  Tags,
  usePagination,
  useTsQueryClient,
} from '@/core';
import {
  Edit as EditIcon,
  Store as StoreIcon,
  MoreVert as MoreVertIcon,
  Share as ShareIcon,
  ListAlt as ListAltIcon,
  AvTimer as AvTimerIcon,
  Web as WebIcon,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardProps,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  UpdateStore,
  Store,
  UpdateStoreSchema,
  generateColor,
  Tag,
} from '@nx-monorepo-template/global';
import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface StoreDetailsCard extends CardProps {
  store: Store;
  onUpdate?: () => void;
}

export const StoreDetailsCard = ({
  store,
  onUpdate,
  ...props
}: StoreDetailsCard) => {
  const tsQueryClient = useTsQueryClient();
  const navigate = useNavigate();
  const [editable, setEditable] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [qrOpen, setQrOpen] = useState(false);

  const { search, perPage, page, setSearch } = usePagination();

  const { data: tagsResult } = tsQueryClient.tag.getAll.useQuery(
    ['getTags', search],
    {
      query: {
        search,
        type: 'product',
        perPage,
        page,
      },
    },
    {
      cacheTime: 0,
    }
  );

  const tags = tagsResult?.body;

  const { mutate } = tsQueryClient.store.update.useMutation({
    onSuccess: () => {
      onUpdate?.();
      setEditable(false);
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card {...props}>
      <CardContent>
        {editable && store ? (
          <>
            <Typography sx={{ mb: 1 }} variant="h5">
              Edit Store Profile
            </Typography>
            <FormGenerator<Store, UpdateStore>
              initialValues={{
                title: store.title,
                description: store.description,
                owner: store.owner.id,
                tags: store.tags.map(({ id }: Tag) => id),
              }}
              schema={UpdateStoreSchema}
              onSubmit={(v, options) => {
                mutate({ params: { id: store.id }, body: v }, options);
              }}
              successMessage="Store Profile Updated"
              onCancel={() => setEditable(false)}
              items={[
                {
                  label: 'Image',
                  name: 'image',
                  component: 'FileField',
                },
                {
                  label: 'Title',
                  name: 'title',
                  component: 'TextField',
                },
                {
                  label: 'Description',
                  name: 'description',
                  component: 'TextField',
                  props: {
                    multiline: true,
                    rows: 2,
                  },
                },
                {
                  label: 'Tags',
                  name: 'tags',
                  valueKey: 'id',
                  labelKey: 'title',
                  component: 'AutoComplete',
                  props: {
                    freeSolo: true,
                    multiple: true,
                    defaultValue: store?.tags,
                    options: tags?.list ?? [],
                    onInputChange: (event: SyntheticEvent, value: string) => {
                      setSearch(value);
                    },
                  },
                },
              ]}
            />
          </>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                backgroundColor: generateColor(store.title),
                borderRadius: '50%',
                color: 'white',
                width: 150,
                height: 150,
                overflow: 'hidden',
                mb: 1,
              }}
            >
              {store?.image ? (
                <Box
                  sx={{
                    width: 150,
                    height: 150,
                    backgroundImage: `url('${store.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              ) : (
                <StoreIcon
                  sx={{
                    height: 150,
                    width: 150,
                    mb: 4,
                  }}
                  color="inherit"
                />
              )}
            </Box>
            <IconButton
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>{' '}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem
                onClick={() => {
                  navigate(`/manage/stores/${store.id}/edit`);
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.open(
                    `/stores/${store.id}/status`,
                    '_blank',
                    'rel=noopener noreferrer'
                  );
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <ListAltIcon fontSize="small" />
                </ListItemIcon>
                Status Screen
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.open(
                    `/stores/${store.id}/preparation`,
                    '_blank',
                    'rel=noopener noreferrer'
                  );
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <AvTimerIcon fontSize="small" />
                </ListItemIcon>
                Preparation Screen
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.open(`/stores/${store.id}`, '_blank');
                }}
              >
                <ListItemIcon>
                  <WebIcon fontSize="small" />
                </ListItemIcon>
                Store Page
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setQrOpen(true);
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <ShareIcon fontSize="small" />
                </ListItemIcon>
                Share
              </MenuItem>
            </Menu>
            <Tags tags={store?.tags} />
            <Typography variant="h4">{store?.title}</Typography>
            <Typography>{store?.description}</Typography>
            <QrcodeDialog
              displayTrigger={false}
              filename={store.title + '-qrcode'}
              text={`${window.location.href.replace('/manage', '')}`}
              open={qrOpen}
              onClose={() => setQrOpen(false)}
              store={store}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
