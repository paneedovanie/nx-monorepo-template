import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BreadcrumbsContextProvider,
  SnackbarContextProvider,
  theme,
  AuthContextProvider,
} from '@/core';
import { Layout } from './Layout';

export const App = () => {
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
              <Layout />
            </AuthContextProvider>
          </SnackbarContextProvider>
        </BreadcrumbsContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
