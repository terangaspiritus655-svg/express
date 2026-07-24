import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Order, OrderStatus } from '../types';

export const orderService = {
  async getAllOrders(): Promise<Order[]> {
    if (!isSupabaseConfigured()) return [];

    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (ordersError || !ordersData) {
      console.error('Failed to fetch orders:', ordersError);
      return [];
    }

    const { data: itemsData } = await supabase
      .from('order_items')
      .select('*')
      .is('deleted_at', null);

    const itemsMap: Record<string, any[]> = {};
    if (itemsData) {
      itemsData.forEach((item) => {
        if (!itemsMap[item.order_id]) itemsMap[item.order_id] = [];
        itemsMap[item.order_id].push({
          product: {
            id: item.product_id,
            name: item.product_name,
            price: Number(item.unit_price),
            image: item.product_image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
            categoryId: 'cat-1',
            categoryName: 'General',
            description: '',
            stock: 50,
            unit: 'Unité',
            availability: 'in_stock'
          },
          quantity: item.quantity
        });
      });
    }

    return ordersData.map((o: any) => ({
      id: o.id,
      createdAt: o.created_at,
      customerName: o.customer_name,
      customerPhone: o.customer_phone,
      customerEmail: o.customer_email || undefined,
      address: o.address,
      neighborhood: o.neighborhood,
      instructions: o.instructions || undefined,
      deliveryType: o.delivery_type || 'express',
      deliveryFee: Number(o.delivery_fee),
      paymentMethod: o.payment_method || 'cash',
      paymentStatus: o.payment_status || 'pending',
      status: o.status || 'received',
      items: itemsMap[o.id] || [],
      subtotal: Number(o.subtotal),
      discount: Number(o.discount),
      total: Number(o.total),
      driverId: o.driver_id || undefined,
      estimatedMinutes: o.estimated_minutes || 20,
      trackingStep: o.tracking_step || 1
    }));
  },

  async createOrder(order: Order): Promise<boolean> {
    if (!isSupabaseConfigured()) return true;

    // Insert order parent record
    const orderPayload = {
      id: order.id,
      customer_name: order.customerName,
      customer_phone: order.customerPhone,
      customer_email: order.customerEmail || null,
      address: order.address,
      neighborhood: order.neighborhood,
      instructions: order.instructions || null,
      delivery_type: order.deliveryType,
      delivery_fee: order.deliveryFee,
      payment_method: order.paymentMethod,
      payment_status: order.paymentStatus,
      status: order.status,
      subtotal: order.subtotal,
      discount: order.discount,
      total: order.total,
      driver_id: order.driverId || null,
      estimated_minutes: order.estimatedMinutes,
      tracking_step: order.trackingStep
    };

    const { error: orderError } = await supabase
      .from('orders')
      .insert(orderPayload);

    if (orderError) {
      console.error('Error inserting order in Supabase:', orderError);
      return false;
    }

    // Insert order items
    if (order.items && order.items.length > 0) {
      const itemsPayload = order.items.map((it) => ({
        order_id: order.id,
        product_id: it.product.id,
        product_name: it.product.name,
        unit_price: it.product.price,
        quantity: it.quantity,
        total_price: it.product.price * it.quantity,
        product_image: it.product.image
      }));

      await supabase.from('order_items').insert(itemsPayload);
    }

    return true;
  },

  async updateOrderStatus(id: string, status: OrderStatus, step?: number): Promise<boolean> {
    if (!isSupabaseConfigured()) return true;

    const trackingStep = step || (status === 'received' ? 1 : status === 'preparing' ? 2 : status === 'on_the_way' ? 3 : 4);

    const { error } = await supabase
      .from('orders')
      .update({
        status,
        tracking_step: trackingStep
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating order status in Supabase:', error);
      return false;
    }
    return true;
  },

  subscribeToOrders(onUpdate: () => void) {
    if (!isSupabaseConfigured()) return () => {};

    const channel = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        onUpdate();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
};
