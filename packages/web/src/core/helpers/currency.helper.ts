import { app } from '@nx-monorepo-template/global';

export const formatCurrency = (amount?: number) => {
  console.log(amount);
  const displayAmount = [undefined, null, 0].includes(amount)
    ? 0
    : amount?.toFixed(2);
  return app.currencySymbol + displayAmount;
};
