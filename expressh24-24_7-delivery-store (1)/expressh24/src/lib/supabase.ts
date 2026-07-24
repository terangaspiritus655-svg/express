import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve default credentials from Vite environment variables or localStorage
const getStoredCredentials = () => {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL as string | undefined;
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string | undefined;

  const localUrl = typeof window !== 'undefined' ? localStorage.getItem('EXPRESSH24_SUPABASE_URL') : null;
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('EXPRESSH24_SUPABASE_ANON_KEY') : null;

  const url = localUrl || envUrl || '';
  const key = localKey || envKey || '';

  const isDummyUrl = !url || url.includes('your-project.supabase.co');
  const isDummyKey = !key || key === 'your-anon-key';

  return {
    url,
    key,
    isConfigured: !isDummyUrl && !isDummyKey && url.startsWith('http')
  };
};

const creds = getStoredCredentials();

// Initialize Supabase Client
export const supabase: SupabaseClient = createClient(
  creds.isConfigured ? creds.url : 'https://placeholder.supabase.co',
  creds.isConfigured ? creds.key : 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      }
    }
  }
);

export const isSupabaseConfigured = (): boolean => {
  return getStoredCredentials().isConfigured;
};

export const getSupabaseConfig = () => {
  return getStoredCredentials();
};

export const saveSupabaseCredentials = (url: string, key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('EXPRESSH24_SUPABASE_URL', url.trim());
    localStorage.setItem('EXPRESSH24_SUPABASE_ANON_KEY', key.trim());
    window.location.reload();
  }
};

export const clearSupabaseCredentials = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('EXPRESSH24_SUPABASE_URL');
    localStorage.removeItem('EXPRESSH24_SUPABASE_ANON_KEY');
    window.location.reload();
  }
};

// STORAGE BUCKETS CONFIGURATION & HELPERS
export const STORAGE_BUCKETS = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  AVATARS: 'avatars',
  DOCUMENTS: 'documents',
  BANNERS: 'banners',
  INVOICES: 'invoices',
  DRIVERS: 'drivers'
} as const;

export async function uploadStorageFile(bucket: string, path: string, file: File): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });

    if (error) {
      console.error(`Storage Upload Error [${bucket}]:`, error);
      return null;
    }

    const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    return publicData.publicUrl;
  } catch (err) {
    console.error('Failed to upload storage file:', err);
    return null;
  }
}
