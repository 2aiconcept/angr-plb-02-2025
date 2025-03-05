// src/app/shared/pipes/total.pipe.spec.ts
import { TotalPipe } from './total.pipe';

describe('TotalPipe', () => {
  let pipe: TotalPipe;

  beforeEach(() => {
    pipe = new TotalPipe();
  });

  it('should calculate total excluding VAT when no argument is provided', () => {
    const order = { nbOfDays: 3, unitPrice: 100, vat: 20 };
    // Expected total = 3 * 100 = 300
    expect(pipe.transform(order)).toBe(300);
  });

  it('should calculate total including VAT when "incVat" argument is provided', () => {
    const order = { nbOfDays: 3, unitPrice: 100, vat: 20 };
    // Expected total including VAT = 3 * 100 * (1 + 20/100) = 300 * 1.2 = 360
    expect(pipe.transform(order, 'incVat')).toBe(360);
  });

  it('should return undefined when the input item is null or undefined', () => {
    expect(pipe.transform(null)).toBeUndefined();
    expect(pipe.transform(undefined)).toBeUndefined();
  });
});
