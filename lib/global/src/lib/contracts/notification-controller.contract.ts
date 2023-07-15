import { initContract } from '@ts-rest/core';
import {
  NotificationSchema,
  GetNotificationsOptionsSchema,
  GetNotificationsResponseSchema,
} from '../schemas';
import { z } from 'zod';

const prefix = `/api/v1/notifications`;

export const notification = initContract().router({
  get: {
    method: 'GET',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    responses: {
      200: NotificationSchema,
    },
    summary: 'Get a notification by id',
  },
  getAll: {
    method: 'GET',
    path: `${prefix}`,
    query: GetNotificationsOptionsSchema,
    responses: {
      200: GetNotificationsResponseSchema,
    },
    summary: 'Get a paginated list of notifications',
  },
  delete: {
    method: 'DELETE',
    path: `${prefix}/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    body: z.any().optional(),
    responses: {
      204: z.any().optional(),
    },
    summary: 'Delete notification',
  },
  read: {
    method: 'PATCH',
    path: `${prefix}/:id/read`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    body: z.any().optional(),
    responses: {
      201: z.any().optional(),
    },
    summary: 'Read notification',
  },
  readAll: {
    method: 'PATCH',
    path: `${prefix}/read-all`,
    body: z.any().optional(),
    responses: {
      201: z.any().optional(),
    },
    summary: 'Read all notifications',
  },
});
