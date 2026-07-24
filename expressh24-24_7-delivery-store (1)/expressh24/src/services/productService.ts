import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Product, Category } from '../types';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.error('Failed to fetch products from Supabase:', error);
      return [];
    }

    return data.map((item: any) => ({
      id: item.id,
      sku: item.sku || `EXH-${item.id}`,
      barcode: item.barcode || '370000000000',
      slug: item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: item.name,
      categoryId: item.category_id,
      categoryName: item.category_name,
      price: item.price !== null && item.price !== undefined ? Number(item.price) : null,
      oldPrice: item.old_price ? Number(item.old_price) : undefined,
      currency: 'XOF',
      status: item.status || (item.price === null ? 'ADMIN_VALIDATION_REQUIRED' : 'ACTIVE'),
      needsValidation: item.needs_validation || item.price === null,
      brand: item.brand,
      image: item.image,
      description: item.description || '',
      stock: item.stock !== undefined ? Number(item.stock) : 100,
      unit: item.unit || 'Unité',
      isPopular: item.is_popular,
      isNew: item.is_new,
      featured: item.featured,
      badge: item.badge,
      keywords: item.keywords,
      availability: item.price === null ? 'out_of_stock' : (item.availability || 'in_stock')
    }));
  },

  async getAllCategories(): Promise<Category[]> {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .is('deleted_at', null)
      .order('name', { ascending: true });

    if (error || !data) {
      console.error('Failed to fetch categories from Supabase:', error);
      return [];
    }

    return data.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      iconName: cat.icon_name || 'ShoppingBag',
      description: cat.description || '',
      image: cat.image || '',
      itemCount: cat.item_count || 0
    }));
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product | null> {
    if (!isSupabaseConfigured()) return null;

    const payload = {
      sku: product.sku || `EXH-${Date.now()}`,
      barcode: product.barcode || '370000000000',
      slug: product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category_id: product.categoryId,
      category_name: product.categoryName,
      name: product.name,
      price: product.price,
      currency: product.currency || 'XOF',
      status: product.status || (product.price === null ? 'ADMIN_VALIDATION_REQUIRED' : 'ACTIVE'),
      needs_validation: product.needsValidation || product.price === null,
      brand: product.brand || null,
      old_price: product.oldPrice || null,
      image: product.image,
      description: product.description,
      stock: product.stock ?? 100,
      unit: product.unit || 'Unité',
      is_popular: product.isPopular || false,
      is_new: product.isNew || false,
      featured: product.featured || false,
      badge: product.badge || null,
      keywords: typeof product.keywords === 'string' ? product.keywords : (Array.isArray(product.keywords) ? product.keywords.join(' ') : ''),
      availability: product.price === null ? 'out_of_stock' : (product.availability || 'in_stock')
    };

    const { data, error } = await supabase
      .from('products')
      .insert(payload)
      .select()
      .single();

    if (error || !data) {
      console.error('Error creating product:', error);
      return null;
    }

    return {
      id: data.id,
      sku: data.sku || `EXH-${data.id}`,
      barcode: data.barcode || '370000000000',
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: data.name,
      categoryId: data.category_id,
      categoryName: data.category_name,
      price: data.price !== null && data.price !== undefined ? Number(data.price) : null,
      oldPrice: data.old_price ? Number(data.old_price) : undefined,
      currency: 'XOF',
      status: data.status || 'ACTIVE',
      needsValidation: data.needs_validation || data.price === null,
      brand: data.brand,
      image: data.image,
      description: data.description,
      stock: Number(data.stock),
      unit: data.unit,
      isPopular: data.is_popular,
      isNew: data.is_new,
      featured: data.featured,
      badge: data.badge,
      keywords: data.keywords,
      availability: data.availability
    };
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;

    const payload: any = {};
    if (updates.sku !== undefined) payload.sku = updates.sku;
    if (updates.barcode !== undefined) payload.barcode = updates.barcode;
    if (updates.slug !== undefined) payload.slug = updates.slug;
    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.categoryId !== undefined) payload.category_id = updates.categoryId;
    if (updates.categoryName !== undefined) payload.category_name = updates.categoryName;
    if (updates.price !== undefined) {
      payload.price = updates.price;
      if (updates.price !== null) {
        payload.status = 'ACTIVE';
        payload.needs_validation = false;
        payload.availability = 'in_stock';
      }
    }
    if (updates.status !== undefined) payload.status = updates.status;
    if (updates.needsValidation !== undefined) payload.needs_validation = updates.needsValidation;
    if (updates.brand !== undefined) payload.brand = updates.brand;
    if (updates.oldPrice !== undefined) payload.old_price = updates.oldPrice;
    if (updates.image !== undefined) payload.image = updates.image;
    if (updates.description !== undefined) payload.description = updates.description;
    if (updates.stock !== undefined) payload.stock = updates.stock;
    if (updates.unit !== undefined) payload.unit = updates.unit;
    if (updates.isPopular !== undefined) payload.is_popular = updates.isPopular;
    if (updates.isNew !== undefined) payload.is_new = updates.isNew;
    if (updates.featured !== undefined) payload.featured = updates.featured;
    if (updates.badge !== undefined) payload.badge = updates.badge;
    if (updates.keywords !== undefined) {
      payload.keywords = typeof updates.keywords === 'string' ? updates.keywords : (Array.isArray(updates.keywords) ? updates.keywords.join(' ') : '');
    }

    const { error } = await supabase
      .from('products')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error('Error updating product:', error);
      return false;
    }
    return true;
  },

  async softDeleteProduct(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;

    const { error } = await supabase
      .from('products')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    return !error;
  }
};
