import { FormGenerator, useTsQueryClient } from '@/core';
import { Box, Drawer, Toolbar, Typography } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import {
  Store,
  StoreConfig,
  UpdateStoreConfig,
} from '@nx-monorepo-template/global';
import { useParams } from 'react-router-dom';

export const EditorDialog = ({
  value,
  open,
  onChange,
  onClose,
}: {
  value: StoreConfig;
  open: boolean;
  onChange?: (v: StoreConfig) => void;
  onClose?: () => void;
}) => {
  const params = useParams();
  const tsQueryClient = useTsQueryClient();

  const { mutate: updateConfig } =
    tsQueryClient.store.updateConfig.useMutation();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Toolbar></Toolbar>
      <Toolbar>
        <Typography>Editor</Typography>
      </Toolbar>
      <Box sx={{ p: 1 }}>
        <FormGenerator<Store, UpdateStoreConfig>
          initialValues={value}
          successMessage={'Store Theme updated'}
          onChange={onChange}
          onSubmit={(v, options) => {
            updateConfig(
              { params: { id: params.storeId as string }, body: v },
              options
            );
          }}
          items={[
            {
              label: 'Primary Color',
              name: 'primaryColor',
              component: (options) => {
                return (
                  <MuiColorInput
                    label={options.label}
                    value={options.value}
                    onChange={(v) =>
                      options.context?.setFieldValue(options.name, v)
                    }
                    size="small"
                  />
                );
              },
            },
            {
              label: 'Secondary Color',
              name: 'secondaryColor',
              component: (options) => {
                return (
                  <MuiColorInput
                    label={options.label}
                    value={options.value}
                    onChange={(v) =>
                      options.context?.setFieldValue(options.name, v)
                    }
                    size="small"
                  />
                );
              },
            },
            {
              label: 'Header Text Color',
              name: 'headerTextColor',
              component: (options) => {
                return (
                  <MuiColorInput
                    label={options.label}
                    value={options.value}
                    onChange={(v) =>
                      options.context?.setFieldValue(options.name, v)
                    }
                    size="small"
                  />
                );
              },
            },
          ]}
        />
      </Box>
    </Drawer>
  );
};
