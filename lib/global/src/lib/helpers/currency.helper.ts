import { app } from '../constant';

export class TransformCurrency {
  to(v) {
    return v * 100;
  }
  from(v) {
    return v / 100;
  }
}

export const formatCurrency = (amount?: number) => {
  const displayAmount = [undefined, null, 0].includes(amount)
    ? 0
    : amount?.toFixed(2);
  return app.currencySymbol + displayAmount;
};
