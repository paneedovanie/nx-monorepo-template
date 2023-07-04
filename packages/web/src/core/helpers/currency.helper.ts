import { app } from '@nx-monorepo-template/global';

export const formatCurrency = (amount?: number) => {
  const displayAmount = [undefined, null, 0].includes(amount) ? 0 : amount;
  return app.currencySymbol + displayAmount;
};
