import { app } from '../constant';
import { Notification, NotificationType } from '../interfaces';

export const notificationMessage: Record<
  NotificationType,
  {
    title: string;
    description: string;
    to: string;
  }
> = {
  [NotificationType.AccountCreated]: {
    title: 'Account Created',
    description: 'You successfully created an account',
    to: '/manage',
  },
  [NotificationType.AccountUpdated]: {
    title: 'Account Updated',
    description: 'You successfully updated your account',
    to: '/manage',
  },
  [NotificationType.AmountReceived]: {
    title: 'Amount Received',
    description: `You received ${app.currencySymbol}:amount from :user`,
    to: '/manage/wallet',
  },
  [NotificationType.AmountSent]: {
    title: 'Amount Sent',
    description: `You sent ${app.currencySymbol}:amount to :user`,
    to: '/manage/wallet',
  },
  [NotificationType.OrderCreated]: {
    title: 'Order Created',
    description: 'Your order with reference id: :refId is created',
    to: '/manage/orders/:orderId',
  },
  [NotificationType.OrderUpdated]: {
    title: 'Order Updated',
    description: 'Your order with reference id: :refId is updated',
    to: '/manage/orders/:orderId',
  },
  [NotificationType.OrderDeleted]: {
    title: 'Order Delete',
    description: 'Your order with reference id: :refId is delete',
    to: '/manage/orders',
  },
  [NotificationType.StoreOrderCreated]: {
    title: 'Store Order Created',
    description: 'An order with reference id: :refId is created',
    to: '/manage/stores/:storeId/orders/:orderId',
  },
  [NotificationType.StoreOrderUpdated]: {
    title: 'Store Order Updated',
    description: 'You successfully updated order with reference id: :refId',
    to: '/manage/stores/:storeId/orders/:orderId',
  },
  [NotificationType.StoreOrderDeleted]: {
    title: 'Store Order Deleted',
    description: 'You successfully deleted order with reference id: :refId',
    to: '/manage/stores/:storeId/orders',
  },
};

export const getNotificationMessages = (notification: Notification) => {
  const metadata = notification.metadata;

  const messages = { ...notificationMessage[notification.type] };
  messages.description = messages.description
    .replace(':refId', metadata.order?.ref.toString() ?? '')
    .replace(':user', metadata.user?.firstName ?? '')
    .replace(':amount', metadata.amount?.toString() ?? '0');
  messages.to = messages.to
    .replace(':orderId', metadata.orderId ?? '')
    .replace(':storeId', metadata.storeId ?? '');

  return messages;
};
