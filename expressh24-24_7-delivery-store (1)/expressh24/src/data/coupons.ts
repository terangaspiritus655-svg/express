import { Coupon } from '../types';

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'EXPRESS10',
    discountType: 'percent',
    discountValue: 10,
    minOrderAmount: 5000,
    active: true
  },
  {
    code: 'DAKAR2026',
    discountType: 'fixed',
    discountValue: 1000, // 1000 FCFA off
    minOrderAmount: 8000,
    active: true
  },
  {
    code: 'WAVE500',
    discountType: 'fixed',
    discountValue: 500, // 500 FCFA off
    minOrderAmount: 3000,
    active: true
  }
];
