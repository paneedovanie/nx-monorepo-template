import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BreadcrumbsContextProvider,
  SnackbarContextProvider,
  AuthContextProvider,
  NotificationContextProvider,
  muiTheme,
  theme,
  EventContextProvider,
} from '@/core';
import { Layout } from './Layout';
import { useEffect } from 'react';
import { app } from '@nx-monorepo-template/global';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

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
      <StyledThemeProvider theme={theme}>
        <ThemeProvider theme={muiTheme}>
          <BreadcrumbsContextProvider>
            <SnackbarContextProvider>
              <AuthContextProvider>
                <EventContextProvider>
                  <NotificationContextProvider>
                    <Layout />
                  </NotificationContextProvider>
                </EventContextProvider>
              </AuthContextProvider>
            </SnackbarContextProvider>
          </BreadcrumbsContextProvider>
        </ThemeProvider>
      </StyledThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
