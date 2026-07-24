import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { StockMovement } from '../types';

export const inventoryService = {
  async updateStock(productId: string, newStock: number): Promise<boolean> {
    if (!isSupabaseConfigured()) return true;

    const { error } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', productId);

    if (error) {
      console.error('Error updating stock in Supabase:', error);
      return false;
    }
    return true;
  },

  async logStockMovement(movement: Omit<StockMovement, 'id' | 'createdAt'>): Promise<boolean> {
    if (!isSupabaseConfigured()) return true;

    const { error } = await supabase
      .from('stock_movements')
      .insert({
        product_id: movement.productId,
        quantity: movement.quantity,
        type: movement.type,
        reason: movement.reason
      });

    return !error;
  },

  async getStockMovements(): Promise<StockMovement[]> {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase
      .from('stock_movements')
      .select('*, products(name)')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error || !data) return [];

    return data.map((item: any) => ({
      id: item.id,
      productId: item.product_id,
      productName: item.products?.name || 'Produit Inconnu',
      quantity: item.quantity,
      type: item.type,
      reason: item.reason || '',
      createdBy: item.created_by || 'Système',
      createdAt: item.created_at
    }));
  }
};
