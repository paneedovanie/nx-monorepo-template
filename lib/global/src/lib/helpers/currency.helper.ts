export class TransformCurrency {
  to(v) {
    return v * 100;
  }
  from(v) {
    return v / 100;
  }
}
