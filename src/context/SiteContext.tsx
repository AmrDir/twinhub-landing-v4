import React, { createContext, useContext, useState, useEffect } from 'react';
import { getHeroContent, getProducts, getSiteSettings, getServices, getGallery, getClients, getLibrary } from '../lib/api';

// Define the shape of our data
interface HeroData {
  id: string;
  texts_en: string[];
  texts_ar: string[];
  we_create_en: string;
  we_create_ar: string;
  subtitle_en: string;
  subtitle_ar: string;
  background_media: string;
}

interface ProductData {
  id: string;
  key_id: string;
  sort_order: number;
  name_en: string;
  name_ar: string;
  desc_en: string;
  desc_ar: string;
  features_en: string[];
  features_ar: string[];
  media: string;
  media_type: string;
  link: string;
}

interface SiteSettings {
  id: string;
  logo_url: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  
  services_bg_media: string;
  services_bg_opacity: number;
  products_bg_media: string;
  products_bg_opacity: number;
  products_showreel_url?: string;
  gallery_bg_media: string;
  gallery_bg_opacity: number;
  clients_bg_media: string;
  clients_bg_opacity: number;
  about_bg_media: string;
  about_bg_opacity: number;
  ai_bg_media?: string;
  ai_bg_opacity?: number;
  hero_bg_opacity?: number;
  
  // AI Section
  ai_title_en?: string;
  ai_title_ar?: string;
  ai_subtitle_en?: string;
  ai_subtitle_ar?: string;
  ai_desc_en?: string;
  ai_desc_ar?: string;
  ai_features?: any[];
  innovation_keywords?: string[];
  
  // About Section
  about_title_en?: string;
  about_title_ar?: string;
  about_description_en?: string;
  about_description_ar?: string;
  about_text_en?: string;
  about_text_ar?: string;
  about_location_en?: string;
  about_location_ar?: string;
  about_vision_title_en?: string;
  about_vision_title_ar?: string;
  about_mission_title_en?: string;
  about_mission_title_ar?: string;
  about_vision_text_en?: string;
  about_vision_text_ar?: string;
  about_mission_text_en?: string;
  about_mission_text_ar?: string;
  about_stats: any;
  
  // Contact
  contact_email: string;
  contact_phone: string;
  contact_phone2?: string;
  contact_whatsapp: string;
  address_en?: string;
  address_ar?: string;
  map_url?: string;
  schedule?: any;
  
  // Social
  social_instagram: string;
  social_facebook: string;
  social_youtube?: string;
  social_vimeo?: string;
  social_twitter?: string;
  social_linkedin?: string;
}

interface ServiceData {
  id: string;
  key_id: string;
  sort_order: number;
  icon: string;
  title_en: string;
  title_ar: string;
  desc_en: string;
  desc_ar: string;
  features_en: string[];
  features_ar: string[];
}

interface GalleryData {
  id: string;
  sort_order: number;
  media: string;
  media_type: string;
  category: string;
  alt_text: string;
  is_featured?: boolean;
}

interface ClientData {
  id: string;
  sort_order: number;
  logo_url: string;
  name: string;
}

interface LibraryItem {
  id: string;
  title_en: string;
  title_ar: string;
  file_url: string;
  thumbnail_url?: string;
  created_at: string;
}

interface SiteContextType {
  hero: HeroData | null;
  products: ProductData[];
  settings: SiteSettings | null;
  services: ServiceData[];
  gallery: GalleryData[];
  clients: ClientData[];
  library: LibraryItem[];
  loading: boolean;
  refreshData: () => Promise<void>;
}

const SiteContext = createContext<SiteContextType>({
  hero: null,
  products: [],
  settings: null,
  services: [],
  gallery: [],
  clients: [],
  library: [],
  loading: true,
  refreshData: async () => {},
});

export const useSiteData = () => useContext(SiteContext);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [gallery, setGallery] = useState<GalleryData[]>([]);
  const [clients, setClients] = useState<ClientData[]>([]);
  const [library, setLibrary] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [heroData, productsData, settingsData, servicesData, galleryData, clientsData, libraryData] = await Promise.all([
        getHeroContent(),
        getProducts(),
        getSiteSettings(),
        getServices(),
        getGallery(),
        getClients(),
        getLibrary(),
      ]);
      
      if (heroData) setHero(heroData as HeroData);
      if (productsData) setProducts(productsData as ProductData[]);
      if (settingsData) {
        setSettings(settingsData as SiteSettings);
        document.documentElement.style.setProperty('--color-primary', settingsData.primary_color);
        if (settingsData.secondary_color) document.documentElement.style.setProperty('--color-secondary', settingsData.secondary_color);
        if (settingsData.accent_color) document.documentElement.style.setProperty('--color-accent', settingsData.accent_color);
      }
      if (servicesData) setServices(servicesData as ServiceData[]);
      if (galleryData) setGallery(galleryData as GalleryData[]);
      if (clientsData) setClients(clientsData as ClientData[]);
      if (libraryData) setLibrary(libraryData as LibraryItem[]);
    } catch (error) {
      console.error('Error fetching site data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SiteContext.Provider value={{ hero, products, settings, services, gallery, clients, library, loading, refreshData: fetchData }}>
      {children}
    </SiteContext.Provider>
  );
};
