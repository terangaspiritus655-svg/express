import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Coupon } from '../types';

export const couponService = {
  async getAllCoupons(): Promise<Coupon[]> {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .is('deleted_at', null)
      .eq('active', true);

    if (error || !data) return [];

    return data.map((c: any) => ({
      id: c.id,
      code: c.code,
      discountType: c.discount_type,
      discountValue: Number(c.discount_value),
      minOrderAmount: Number(c.min_order_amount),
      active: c.active,
      expiresAt: c.expires_at || undefined
    }));
  },

  async validateCoupon(code: string): Promise<Coupon | null> {
    if (!isSupabaseConfigured()) return null;

    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('active', true)
      .is('deleted_at', null)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      code: data.code,
      discountType: data.discount_type,
      discountValue: Number(data.discount_value),
      minOrderAmount: Number(data.min_order_amount),
      active: data.active
    };
  }
};
