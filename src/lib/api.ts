import { supabase } from './supabase';

// Hero Content
export const getHeroContent = async () => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('hero_content')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching hero content:', error);
    return null;
  }
  return data;
};

export const updateHeroContent = async (id: string, updates: any) => {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('hero_content')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Products
export const getProducts = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data;
};

export const updateProduct = async (id: string, updates: any) => {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const addProduct = async (productData: any) => {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteProduct = async (id: string) => {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

// Site Settings
export const getSiteSettings = async () => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
  return data;
};

export const updateSiteSettings = async (id: string, updates: any) => {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('site_settings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Services
export const getServices = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }
  return data;
};

export const updateService = async (id: string, updates: any) => {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Gallery
export const getGallery = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
  return data;
};

export const addGalleryItem = async (itemData: any) => {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('gallery')
    .insert([itemData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteGalleryItem = async (id: string) => {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

export const updateGalleryItem = async (id: string, updates: any) => {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('gallery')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Clients
export const getClients = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
  return data;
};

export const addClient = async (clientData: any) => {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('clients')
    .insert([clientData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteClient = async (id: string) => {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

// Media Upload to Supabase Storage
export const uploadMedia = async (file: File, folder: string = 'gallery'): Promise<string> => {
  if (!supabase) throw new Error('Supabase not configured');
  
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const safeName = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
  
  const { data, error } = await supabase.storage
    .from('media')
    .upload(safeName, file, {
      cacheControl: '3600',
      upsert: false,
    });
  
  if (error) throw error;
  
  // Get public URL
  const { data: urlData } = supabase.storage
    .from('media')
    .getPublicUrl(data.path);
  
  return urlData.publicUrl;
};

// Delete media from Supabase Storage  
export const deleteMedia = async (filePath: string): Promise<boolean> => {
  if (!supabase) throw new Error('Supabase not configured');
  
  // Extract path from full URL
  const bucketPath = filePath.includes('/storage/v1/object/public/media/')
    ? filePath.split('/storage/v1/object/public/media/')[1]
    : filePath;
  
  if (!bucketPath) return false;
  
  const { error } = await supabase.storage
    .from('media')
    .remove([bucketPath]);
  
  if (error) throw error;
  return true;
};
