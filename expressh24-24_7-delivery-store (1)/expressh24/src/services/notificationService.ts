import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { NotificationItem, SupportTicket, CompanySetting, ActivityLog } from '../types';

export const notificationService = {
  async getNotifications(userId?: string): Promise<NotificationItem[]> {
    if (!isSupabaseConfigured()) return [];

    let query = supabase.from('notifications').select('*').order('created_at', { ascending: false });
    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error || !data) return [];

    return data.map((n: any) => ({
      id: n.id,
      userId: n.user_id,
      title: n.title,
      message: n.message,
      type: n.type,
      read: n.read,
      createdAt: n.created_at
    }));
  },

  async createNotification(notification: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>): Promise<boolean> {
    if (!isSupabaseConfigured()) return true;

    const { error } = await supabase.from('notifications').insert({
      user_id: notification.userId || null,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      read: false
    });

    return !error;
  }
};

export const supportService = {
  async createTicket(ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>): Promise<boolean> {
    if (!isSupabaseConfigured()) return true;

    const { error } = await supabase.from('support_tickets').insert({
      customer_id: ticket.customerId || null,
      customer_name: ticket.customerName,
      customer_phone: ticket.customerPhone,
      subject: ticket.subject,
      message: ticket.message,
      priority: ticket.priority,
      status: 'open'
    });

    return !error;
  },

  async getTickets(): Promise<SupportTicket[]> {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase.from('support_tickets').select('*').order('created_at', { ascending: false });
    if (error || !data) return [];

    return data.map((t: any) => ({
      id: t.id,
      customerId: t.customer_id,
      customerName: t.customer_name,
      customerPhone: t.customer_phone,
      subject: t.subject,
      message: t.message,
      status: t.status,
      priority: t.priority,
      createdAt: t.created_at
    }));
  }
};

export const settingsService = {
  async getCompanySettings(): Promise<CompanySetting[]> {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase.from('company_settings').select('*');
    if (error || !data) return [];

    return data.map((s: any) => ({
      id: s.id,
      key: s.key,
      value: s.value,
      description: s.description
    }));
  },

  async logActivity(action: string, entityType: string, details?: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return true;

    const { error } = await supabase.from('activity_logs').insert({
      action,
      entity_type: entityType,
      details: details || null
    });

    return !error;
  }
};
