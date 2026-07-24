import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Driver } from '../types';

export const driverService = {
  async getAllDrivers(): Promise<Driver[]> {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase
      .from('delivery_drivers')
      .select('*')
      .is('deleted_at', null)
      .order('rating', { ascending: false });

    if (error || !data) {
      console.error('Failed to fetch drivers from Supabase:', error);
      return [];
    }

    return data.map((d: any) => ({
      id: d.id,
      name: d.name,
      phone: d.phone,
      avatar: d.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      vehicle: d.vehicle,
      licensePlate: d.license_plate,
      status: d.status,
      rating: Number(d.rating),
      totalDeliveries: d.total_deliveries,
      currentOrderId: d.current_order_id
    }));
  },

  async updateDriverStatus(driverId: string, status: 'available' | 'delivering' | 'offline'): Promise<boolean> {
    if (!isSupabaseConfigured()) return true;

    const { error } = await supabase
      .from('delivery_drivers')
      .update({ status })
      .eq('id', driverId);

    return !error;
  },

  subscribeToDrivers(onUpdate: () => void) {
    if (!isSupabaseConfigured()) return () => {};

    const channel = supabase
      .channel('public:delivery_drivers')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'delivery_drivers' }, () => {
        onUpdate();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
};
