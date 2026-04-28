import React, { createContext, useContext, useState, useEffect } from 'react';
import { getHeroContent, getProducts, getSiteSettings, getServices, getGallery } from '../lib/api';

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
  primary_color: string;
  services_bg_media: string;
  services_bg_opacity: number;
  products_bg_media: string;
  products_bg_opacity: number;
  gallery_bg_media: string;
  gallery_bg_opacity: number;
  clients_bg_media: string;
  clients_bg_opacity: number;
  about_bg_media: string;
  about_bg_opacity: number;
  contact_email: string;
  contact_phone: string;
  contact_whatsapp: string;
  social_instagram: string;
  social_facebook: string;
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
}

interface SiteContextType {
  hero: HeroData | null;
  products: ProductData[];
  settings: SiteSettings | null;
  services: ServiceData[];
  gallery: GalleryData[];
  loading: boolean;
  refreshData: () => Promise<void>;
}

const SiteContext = createContext<SiteContextType>({
  hero: null,
  products: [],
  settings: null,
  services: [],
  gallery: [],
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
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [heroData, productsData, settingsData, servicesData, galleryData] = await Promise.all([
        getHeroContent(),
        getProducts(),
        getSiteSettings(),
        getServices(),
        getGallery(),
      ]);
      
      if (heroData) setHero(heroData as HeroData);
      if (productsData) setProducts(productsData as ProductData[]);
      if (settingsData) {
        setSettings(settingsData as SiteSettings);
        // Inject primary color dynamically
        document.documentElement.style.setProperty('--color-primary', settingsData.primary_color);
        // We also want to inject color-primary-rgb or rgba but CSS var hex parsing is hard without a library.
        // It's easiest to just set the main hex value.
      }
      if (servicesData) setServices(servicesData as ServiceData[]);
      if (galleryData) setGallery(galleryData as GalleryData[]);
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
    <SiteContext.Provider value={{ hero, products, settings, services, gallery, loading, refreshData: fetchData }}>
      {children}
    </SiteContext.Provider>
  );
};
