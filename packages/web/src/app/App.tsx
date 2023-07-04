import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BreadcrumbsContextProvider,
  SnackbarContextProvider,
  theme,
  AuthContextProvider,
  NotificationContextProvider,
} from '@/core';
import { Layout } from './Layout';
import { useEffect } from 'react';
import { app } from '@nx-monorepo-template/global';

export const App = () => {
  useEffect(() => {
    document.title = app.title;
  }, []);

  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnMount: false,
              refetchOnWindowFocus: false,
              cacheTime: 0,
            },
          },
        })
      }
    >
      <ThemeProvider theme={theme}>
        <BreadcrumbsContextProvider>
          <SnackbarContextProvider>
            <AuthContextProvider>
              <NotificationContextProvider>
                <Layout />
              </NotificationContextProvider>
            </AuthContextProvider>
          </SnackbarContextProvider>
        </BreadcrumbsContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
