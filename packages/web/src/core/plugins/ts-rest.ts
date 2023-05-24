import { contract } from '@nx-monorepo-template/global';
import { ApiFetcherArgs, initClient, tsRestFetchApi } from '@ts-rest/core';
import { apiBaseUrl } from '../constant';
import { initQueryClient } from '@ts-rest/react-query';
import { useMutation, useQuery } from 'react-query';

export const initTsRestClient = () =>
  initClient(contract, {
    baseUrl: apiBaseUrl,
    baseHeaders: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

const initRequests = (_client: any, contract: any): any => {
  return Object.fromEntries(
    Object.entries(_client).map(([key, subRouter]: [string, any]) => {
      if (typeof subRouter.query === 'function') {
        return [
          key,
          {
            ...subRouter,
            useQuery: (
              queryKey: never[],
              args: any,
              options?: Omit<any, 'queryKey'>
            ) =>
              useQuery<any>(
                queryKey,
                async () => {
                  const result = await subRouter.query(args);
                  if (!String(result.status).startsWith('2')) {
                    throw result;
                  }
                  return result;
                },
                options
              ),
            useMutation: (options?: Omit<any, 'queryKey'>) =>
              useMutation<any>(async (v) => {
                const result = await subRouter.mutation(v);
                if (!String(result.status).startsWith('2')) {
                  throw result;
                }
                return result;
              }, options),
          },
        ];
      } else {
        return [key, initRequests(subRouter, contract[key])];
      }
    })
  );
};

export const useTsQueryClient = (): typeof baseClient => {
  const baseClient = initQueryClient(contract, {
    baseUrl: apiBaseUrl,
    baseHeaders: {
      Accept: 'application/json',
    },
    api: async (args: ApiFetcherArgs) => {
      const token = localStorage.getItem('token');
      if (token) {
        args.headers.Authorization = `Bearer ${token}`;
      }

      return tsRestFetchApi(args);
    },
  });
  return initRequests(baseClient, contract);
};
