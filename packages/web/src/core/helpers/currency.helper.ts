import { app } from '@nx-monorepo-template/global';

export const formatCurrency = (amount?: number) => {
  const displayAmount = +(amount?.toFixed(2) ?? 0);
  return app.currencySymbol + displayAmount?.toLocaleString('en-US');
};
