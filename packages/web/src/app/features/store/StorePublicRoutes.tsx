import { Route, Routes } from 'react-router-dom';
import {
  CheckoutPage,
  PublicStoreViewPage,
  StorePreparationPage,
  StoreStatusPage,
} from './pages';
import { EditorDialog } from './components';
import {
  CartContextProvider,
  muiTheme,
  theme,
  useAuthContext,
  useCartContext,
} from '@/core';
import { PublicOrderView } from '../order';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';

export const StorePublicRoutesContent = () => {
  const { user } = useAuthContext();
  const { store } = useCartContext();
  const [storeConfig, setStoreConfig] = useState({
    headerTextColor: theme.color.white,
    primaryColor: theme.color.primary,
    secondaryColor: theme.color.secondary,
  });
  const [openThemeEditor, setOpenThemeEditor] = useState(false);

  const storeTheme = createTheme({
    ...muiTheme,
    palette: {
      ...muiTheme.palette,
      primary: {
        main: storeConfig.primaryColor,
      },
      secondary: {
        main: storeConfig.secondaryColor,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            color: storeConfig.headerTextColor,
          },
        },
      },
    },
  });

  useEffect(() => {
    if (store?.config) {
      setStoreConfig(store?.config);
    }
  }, [store]);

  return (
    <>
      {store?.owner.id === user?.id && (
        <>
          <Button
            variant="contained"
            size="small"
            sx={{
              position: 'fixed',
              bottom: 1,
              right: 1,
              minWidth: 0,
              width: 30,
              height: 30,
              borderRadius: '50%',
            }}
            onClick={() => setOpenThemeEditor(true)}
          >
            <EditIcon fontSize="small" />
          </Button>
          <EditorDialog
            open={openThemeEditor}
            value={storeConfig}
            onChange={setStoreConfig}
            onClose={() => setOpenThemeEditor(false)}
          />
        </>
      )}
      <ThemeProvider theme={storeTheme}>
        <Routes>
          <Route path="/" element={<PublicStoreViewPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders/:orderId" element={<PublicOrderView />} />
          <Route path="/status" element={<StoreStatusPage />} />
          <Route path="/preparation" element={<StorePreparationPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export const StorePublicRoutes = () => {
  return (
    <CartContextProvider>
      <StorePublicRoutesContent />
    </CartContextProvider>
  );
};
