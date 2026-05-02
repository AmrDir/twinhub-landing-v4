import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Type, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Save,
  CheckCircle2,
  AlertCircle,
  Package,
  Trash2,
  Plus,
  Brain,
  Info,
  Phone,
  Upload,
  Users
} from 'lucide-react';
import { signOut } from '../../lib/supabase';
import { useSiteData } from '../../context/SiteContext';
import { 
  updateHeroContent, 
  updateProduct, 
  updateSiteSettings, 
  updateService,
  addGalleryItem,
  deleteGalleryItem,
  getClients,
  addClient,
  deleteClient,
  uploadMedia
} from '../../lib/api';

interface DashboardProps {
  session: any;
}

export default function Dashboard({ session }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'success' | 'error' | null>(null);
  
  const { hero, products, settings, services, gallery, clients, refreshData } = useSiteData();

  // Local state for editing
  const [editedHero, setEditedHero] = useState<any>(null);
  const [editedProducts, setEditedProducts] = useState<any[]>([]);
  const [editedSettings, setEditedSettings] = useState<any>(null);
  const [editedServices, setEditedServices] = useState<any[]>([]);
  
  // Local state for additions
  const [newGalleryItem, setNewGalleryItem] = useState({ media: '', media_type: 'image', category: 'all', alt_text: 'Gallery Item' });
  const [newClientItem, setNewClientItem] = useState({ logo_url: '', name: '' });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // File upload handler
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    setUploadProgress('');
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(`Uploading ${i + 1}/${files.length}: ${file.name}`);
        
        const isVideo = file.type.startsWith('video/');
        const url = await uploadMedia(file, 'gallery');
        
        await addGalleryItem({
          media: url,
          media_type: isVideo ? 'video' : 'image',
          category: newGalleryItem.category || 'all',
          alt_text: file.name.replace(/\.[^.]+$/, ''),
          sort_order: gallery.length + i,
        });
      }
      
      await refreshData();
      setUploadProgress('');
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err: any) {
      console.error('Upload error:', err);
      setSaveStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleHeroFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string = 'hero_bg_media') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    setUploadProgress(`Uploading ${file.name}...`);
    
    try {
      const url = await uploadMedia(file, 'backgrounds');
      if (fieldName === 'hero_bg_media') {
        if (editedHero) setEditedHero({ ...editedHero, background_media: url });
      } else {
        if (editedSettings) setEditedSettings({ ...editedSettings, [fieldName]: url });
      }
      
      setUploadProgress('Upload complete!');
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress('');
      }, 2000);
    } catch (err: any) {
      console.error('Background upload error:', err);
      setUploadProgress('Upload failed');
      setTimeout(() => setIsUploading(false), 3000);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  useEffect(() => {
    if (hero) setEditedHero(hero);
    if (products) setEditedProducts(products);
    if (settings) setEditedSettings(settings);
    if (services) setEditedServices(services);
  }, [hero, products, settings, services]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      if (activeTab === 'hero' && editedHero) {
        // Save Hero Content
        await updateHeroContent(editedHero.id, {
          subtitle_en: editedHero.subtitle_en,
          subtitle_ar: editedHero.subtitle_ar,
          background_media: editedHero.background_media,
          we_create_en: editedHero.we_create_en,
          we_create_ar: editedHero.we_create_ar,
          texts_en: editedHero.texts_en,
          texts_ar: editedHero.texts_ar,
        });
        
        // Save Opacity (which is in site_settings)
        if (editedSettings) {
          await updateSiteSettings(editedSettings.id, {
            hero_bg_opacity: editedSettings.hero_bg_opacity
          });
        }
      } else if (activeTab === 'products') {
        for (const p of editedProducts) {
          await updateProduct(p.id, {
            name_en: p.name_en,
            name_ar: p.name_ar,
            desc_en: p.desc_en,
            desc_ar: p.desc_ar,
            media: p.media,
            media_type: p.media_type,
            features_en: p.features_en,
            features_ar: p.features_ar,
            link: p.link,
          });
        }
      } else if ((activeTab === 'settings' || activeTab === 'ai' || activeTab === 'about' || activeTab === 'contact') && editedSettings) {
        await updateSiteSettings(editedSettings.id, {
          primary_color: editedSettings.primary_color,
          secondary_color: editedSettings.secondary_color,
          accent_color: editedSettings.accent_color,
          services_bg_media: editedSettings.services_bg_media,
          services_bg_opacity: editedSettings.services_bg_opacity,
          products_bg_media: editedSettings.products_bg_media,
          products_bg_opacity: editedSettings.products_bg_opacity,
          products_showreel_url: editedSettings.products_showreel_url,
          gallery_bg_media: editedSettings.gallery_bg_media,
          gallery_bg_opacity: editedSettings.gallery_bg_opacity,
          clients_bg_media: editedSettings.clients_bg_media,
          clients_bg_opacity: editedSettings.clients_bg_opacity,
          about_bg_media: editedSettings.about_bg_media,
          about_bg_opacity: editedSettings.about_bg_opacity,
          about_stats: editedSettings.about_stats,
          contact_email: editedSettings.contact_email,
          contact_phone: editedSettings.contact_phone,
          contact_whatsapp: editedSettings.contact_whatsapp,
          social_instagram: editedSettings.social_instagram,
          social_facebook: editedSettings.social_facebook,
          ai_features: editedSettings.ai_features,
          innovation_keywords: editedSettings.innovation_keywords,
          ai_title_en: editedSettings.ai_title_en,
          ai_title_ar: editedSettings.ai_title_ar,
          ai_subtitle_en: editedSettings.ai_subtitle_en,
          ai_subtitle_ar: editedSettings.ai_subtitle_ar,
          ai_desc_en: editedSettings.ai_desc_en,
          ai_desc_ar: editedSettings.ai_desc_ar,
          ai_bg_media: editedSettings.ai_bg_media,
          ai_bg_opacity: editedSettings.ai_bg_opacity,
          about_vision_title_en: editedSettings.about_vision_title_en,
          about_vision_title_ar: editedSettings.about_vision_title_ar,
          about_vision_text_en: editedSettings.about_vision_text_en,
          about_vision_text_ar: editedSettings.about_vision_text_ar,
          about_mission_title_en: editedSettings.about_mission_title_en,
          about_mission_title_ar: editedSettings.about_mission_title_ar,
          about_mission_text_en: editedSettings.about_mission_text_en,
          about_mission_text_ar: editedSettings.about_mission_text_ar,
          contact_phone2: editedSettings.contact_phone2,
          address_en: editedSettings.address_en,
          address_ar: editedSettings.address_ar,
          map_url: editedSettings.map_url,
          schedule: editedSettings.schedule,
          social_youtube: editedSettings.social_youtube,
          social_vimeo: editedSettings.social_vimeo,
          social_twitter: editedSettings.social_twitter,
          social_linkedin: editedSettings.social_linkedin,
          hero_bg_opacity: editedSettings.hero_bg_opacity,
        });
        // Immediately update CSS variables
        document.documentElement.style.setProperty('--color-primary', editedSettings.primary_color);
        document.documentElement.style.setProperty('--color-secondary', editedSettings.secondary_color);
        document.documentElement.style.setProperty('--color-accent', editedSettings.accent_color);
      } else if (activeTab === 'services') {
        for (const s of editedServices) {
          await updateService(s.id, {
            title_en: s.title_en,
            title_ar: s.title_ar,
            desc_en: s.desc_en,
            desc_ar: s.desc_ar,
            features_en: s.features_en,
            features_ar: s.features_ar,
          });
        }
      }
      
      await refreshData();
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddGallery = async () => {
    if (!newGalleryItem.media) return;
    setIsSaving(true);
    try {
      await addGalleryItem(newGalleryItem);
      await refreshData();
      setNewGalleryItem({ media: '', media_type: 'image', category: 'all', alt_text: 'Gallery Item' });
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error(error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this media?')) return;
    setIsSaving(true);
    try {
      await deleteGalleryItem(id);
      await refreshData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddClient = async () => {
    if (!newClientItem.logo_url) return;
    setIsSaving(true);
    try {
      await addClient({
        ...newClientItem,
        sort_order: clients.length
      });
      setNewClientItem({ logo_url: '', name: '' });
      await refreshData();
      setSaveStatus('success');
    } catch (error) {
      console.error(error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!window.confirm('Delete this client logo?')) return;
    setIsSaving(true);
    try {
      await deleteClient(id);
      await refreshData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const menuItems = [
    { id: 'hero', label: 'Hero Section', icon: Type },
    { id: 'products', label: 'Smart Products', icon: Package },
    { id: 'services', label: 'Services', icon: LayoutDashboard },
    { id: 'ai', label: 'AI Section', icon: Brain },
    { id: 'about', label: 'About Section', icon: Info },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'contact', label: 'Contact Info', icon: Phone },
    { id: 'settings', label: 'General Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans selection:bg-cinema-red selection:text-white">
      {/* Sidebar */}
      <aside className="w-80 bg-black border-r border-white/5 flex flex-col p-8 fixed inset-y-0 z-20">
        <div className="flex items-center gap-4 mb-16 px-2 group cursor-pointer" onClick={() => window.location.href = '/'}>
          <div className="w-12 h-12 bg-cinema-red rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.3)] group-hover:scale-110 transition-transform duration-500">
            <LayoutDashboard size={24} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl tracking-tighter leading-none">TwinHub</span>
            <span className="text-cinema-red-light text-xs font-bold uppercase tracking-[0.2em] mt-1">Control Hub</span>
          </div>
        </div>

        <nav className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between p-5 rounded-[1.5rem] transition-all duration-500 group ${
                activeTab === item.id 
                ? 'bg-cinema-red text-white shadow-[0_10px_30px_rgba(220,38,38,0.25)] scale-[1.02]' 
                : 'text-gray-500 hover:bg-white/[0.03] hover:text-gray-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={22} className={activeTab === item.id ? 'text-white' : 'group-hover:text-cinema-red transition-colors'} />
                <span className="font-bold tracking-tight text-lg">{item.label}</span>
              </div>
              <ChevronRight size={18} className={`transition-all duration-500 ${activeTab === item.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5 mt-auto">
          <button 
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 p-5 text-gray-500 hover:text-white hover:bg-red-950/20 rounded-[1.5rem] transition-all duration-500 group"
          >
            <LogOut size={20} className="group-hover:text-cinema-red transition-colors" />
            <span className="font-bold tracking-tight">System Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-80 p-10 lg:p-16 max-w-[1600px]">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
           <div className="animate-fade-in-up">
              <div className="flex items-center gap-2 mb-2">
                 <div className="w-2 h-2 rounded-full bg-cinema-red animate-pulse"></div>
                 <span className="text-cinema-red-light font-bold uppercase tracking-widest text-xs">Live Environment</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold uppercase tracking-tighter leading-none">
                <span className="text-gray-500">Edit</span> {activeTab}
              </h2>
           </div>
           
           <div className="flex items-center gap-6 animate-fade-in-up delay-300">
              {saveStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-400 font-bold text-sm bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                  <CheckCircle2 size={16} /> Saved Changes
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="flex items-center gap-2 text-cinema-red-light font-bold text-sm bg-cinema-red/10 px-4 py-2 rounded-full border border-cinema-red/20">
                  <AlertCircle size={16} /> Sync Failed
                </div>
              )}
              {activeTab !== 'gallery' && (
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-[1.5rem] font-bold text-lg hover:bg-cinema-red hover:text-white transition-all duration-500 disabled:opacity-50 shadow-xl hover:shadow-cinema-red/20 group"
                >
                  {isSaving ? (
                    <div className="w-6 h-6 border-3 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save size={20} className="group-hover:scale-110 transition-transform" />
                      Publish to Live Site
                    </>
                  )}
                </button>
              )}
           </div>
        </header>

        {/* Form Content Area */}
        <div className="cinematic-card p-10 lg:p-14 relative group">
           <div className="inner-glow"></div>
           
           {/* HERO TAB */}
           {activeTab === 'hero' && editedHero && (
             <div className="space-y-8 animate-fade-in">
               <h3 className="text-xl font-bold border-b border-white/10 pb-4">Hero Content Configuration</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Subtitle (English)</label>
                    <textarea 
                      value={editedHero.subtitle_en}
                      onChange={e => setEditedHero({...editedHero, subtitle_en: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red focus:ring-1 focus:ring-cinema-red/50 outline-none h-32 transition-all"
                    />
                 </div>
                 <div className="space-y-2 rtl text-right">
                    <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Subtitle (Arabic)</label>
                    <textarea 
                      value={editedHero.subtitle_ar}
                      onChange={e => setEditedHero({...editedHero, subtitle_ar: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red focus:ring-1 focus:ring-cinema-red/50 outline-none h-32 transition-all"
                      dir="rtl"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Rotating Headlines (English, one per line)</label>
                    <textarea
                      value={(editedHero.texts_en || []).join('\n')}
                      onChange={e => setEditedHero({...editedHero, texts_en: e.target.value.split('\n').filter((s: string) => s.trim())})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red focus:ring-1 focus:ring-cinema-red/50 outline-none h-28 transition-all"
                    />
                 </div>
                 <div className="space-y-2 rtl text-right">
                    <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Rotating Headlines (Arabic, one per line)</label>
                    <textarea
                      value={(editedHero.texts_ar || []).join('\n')}
                      onChange={e => setEditedHero({...editedHero, texts_ar: e.target.value.split('\n').filter((s: string) => s.trim())})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red focus:ring-1 focus:ring-cinema-red/50 outline-none h-28 transition-all"
                      dir="rtl"
                    />
                 </div>
                 <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Background Media Control</label>
                    <div className="flex gap-4">
                       <input
                         type="text"
                         value={editedHero.background_media}
                         onChange={e => setEditedHero({...editedHero, background_media: e.target.value})}
                         className="flex-1 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none transition-all"
                         placeholder="Media URL or Upload..."
                       />
                       <label className="bg-white/10 hover:bg-cinema-red px-6 py-4 rounded-xl cursor-pointer transition-all flex items-center gap-2">
                          <Upload size={20} />
                          <span>Upload</span>
                          <input type="file" className="hidden" accept="video/*,image/*" onChange={handleHeroFileUpload} />
                       </label>
                    </div>
                 </div>
                 {editedSettings && (
                   <div className="space-y-4 md:col-span-2 bg-black/30 p-6 rounded-2xl border border-white/5">
                     <div className="flex justify-between items-center">
                       <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Background Black Layer (Opacity)</label>
                       <span className="text-cinema-red font-bold">{Math.round((editedSettings.hero_bg_opacity || 0.2) * 100)}%</span>
                     </div>
                     <input 
                       type="range" min="0" max="1" step="0.01"
                       value={editedSettings.hero_bg_opacity || 0.2}
                       onChange={e => setEditedSettings({...editedSettings, hero_bg_opacity: parseFloat(e.target.value)})}
                       className="w-full accent-cinema-red"
                     />
                     <p className="text-xs text-gray-500 italic">20% is recommended for best clarity. Higher values make the video darker.</p>
                   </div>
                 )}
               </div>
             </div>
           )}

           {/* PRODUCTS TAB */}
           {activeTab === 'products' && editedProducts.length > 0 && (
             <div className="space-y-12 animate-fade-in">
               <div className="bg-black/40 p-8 rounded-[2rem] border border-cinema-red/20 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-cinema-red/5 blur-3xl -z-10 group-hover:bg-cinema-red/10 transition-colors"></div>
                 <div className="flex items-center gap-4 mb-6">
                   <div className="p-3 bg-cinema-red/10 rounded-xl text-cinema-red">
                     <Upload size={24} />
                   </div>
                   <div>
                     <h4 className="text-xl font-bold text-white tracking-tight">Featured Showreel</h4>
                     <p className="text-gray-400 text-sm">Main promotional video for the products section</p>
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Video Embed Link (YouTube/Vimeo)</label>
                   <input 
                     type="text"
                     value={editedSettings?.products_showreel_url || ""}
                     onChange={e => setEditedSettings({...editedSettings, products_showreel_url: e.target.value})}
                     placeholder="https://www.youtube.com/embed/..."
                     className="w-full bg-black/60 border border-white/5 rounded-2xl p-5 text-white focus:border-cinema-red focus:ring-1 focus:ring-cinema-red/30 outline-none transition-all placeholder:text-white/10"
                   />
                 </div>
               </div>
               <h3 className="text-xl font-bold border-b border-white/10 pb-4">Products & Platforms Configuration</h3>
               {editedProducts.map((p, index) => (
                 <div key={p.id} className="bg-black/30 p-6 rounded-2xl border border-white/5 space-y-6">
                   <h4 className="text-cinema-red font-bold uppercase tracking-widest">{p.key_id}</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                       <label className="text-sm text-gray-400">Name (English)</label>
                       <input 
                         type="text"
                         value={p.name_en}
                         onChange={e => {
                           const newProducts = [...editedProducts];
                           newProducts[index].name_en = e.target.value;
                           setEditedProducts(newProducts);
                         }}
                         className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none"
                       />
                     </div>
                     <div className="space-y-2 rtl text-right">
                       <label className="text-sm text-gray-400">Name (Arabic)</label>
                       <input 
                         type="text"
                         value={p.name_ar}
                         onChange={e => {
                           const newProducts = [...editedProducts];
                           newProducts[index].name_ar = e.target.value;
                           setEditedProducts(newProducts);
                         }}
                         className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none"
                         dir="rtl"
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm text-gray-400">Description (English)</label>
                       <textarea 
                         value={p.desc_en}
                         onChange={e => {
                           const newProducts = [...editedProducts];
                           newProducts[index].desc_en = e.target.value;
                           setEditedProducts(newProducts);
                         }}
                         className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-24"
                       />
                     </div>
                     <div className="space-y-2 rtl text-right">
                       <label className="text-sm text-gray-400">Description (Arabic)</label>
                       <textarea 
                         value={p.desc_ar}
                         onChange={e => {
                           const newProducts = [...editedProducts];
                           newProducts[index].desc_ar = e.target.value;
                           setEditedProducts(newProducts);
                         }}
                         className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-24"
                         dir="rtl"
                       />
                     </div>
                     <div className="space-y-2 md:col-span-2">
                       <label className="text-sm text-gray-400">Media URL (.mp4 / .jpg)</label>
                       <input
                         type="text"
                         value={p.media}
                         onChange={e => {
                           const newProducts = [...editedProducts];
                           newProducts[index].media = e.target.value;
                           setEditedProducts(newProducts);
                         }}
                         className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none"
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Media Type</label>
                       <select
                         value={p.media_type || 'image'}
                         onChange={e => {
                           const newProducts = [...editedProducts];
                           newProducts[index].media_type = e.target.value;
                           setEditedProducts(newProducts);
                         }}
                         className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red focus:ring-1 focus:ring-cinema-red/50 outline-none transition-all appearance-none"
                       >
                         <option value="image">Image</option>
                         <option value="video">Video</option>
                       </select>
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Product Link URL</label>
                       <input
                         type="text"
                         value={p.link || ''}
                         onChange={e => {
                           const newProducts = [...editedProducts];
                           newProducts[index].link = e.target.value;
                           setEditedProducts(newProducts);
                         }}
                         className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red focus:ring-1 focus:ring-cinema-red/50 outline-none transition-all"
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Features (English, one per line)</label>
                       <textarea
                         value={(p.features_en || []).join('\n')}
                         onChange={e => {
                           const newProducts = [...editedProducts];
                           newProducts[index].features_en = e.target.value.split('\n').filter((s: string) => s.trim());
                           setEditedProducts(newProducts);
                         }}
                         className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red focus:ring-1 focus:ring-cinema-red/50 outline-none h-28 transition-all"
                       />
                     </div>
                     <div className="space-y-2 rtl text-right">
                       <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Features (Arabic, one per line)</label>
                       <textarea
                         value={(p.features_ar || []).join('\n')}
                         onChange={e => {
                           const newProducts = [...editedProducts];
                           newProducts[index].features_ar = e.target.value.split('\n').filter((s: string) => s.trim());
                           setEditedProducts(newProducts);
                         }}
                         className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red focus:ring-1 focus:ring-cinema-red/50 outline-none h-28 transition-all"
                         dir="rtl"
                       />
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           )}

           {/* SETTINGS TAB */}
           {activeTab === 'settings' && editedSettings && (
             <div className="space-y-8 animate-fade-in">
               <h3 className="text-xl font-bold border-b border-white/10 pb-4">Theme & Background Configurations</h3>
               
               <div className="bg-black/30 p-6 rounded-2xl border border-white/5 space-y-6">
                 <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm">Theme Colors</h4>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Primary Color</label>
                     <div className="flex gap-4">
                       <input type="color" value={editedSettings.primary_color} onChange={e => setEditedSettings({...editedSettings, primary_color: e.target.value})} className="w-16 h-16 rounded-2xl cursor-pointer bg-transparent border-0 p-0 shadow-lg" />
                       <input type="text" value={editedSettings.primary_color} onChange={e => setEditedSettings({...editedSettings, primary_color: e.target.value})} className="flex-1 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none font-mono text-sm" />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Secondary Color</label>
                     <div className="flex gap-4">
                       <input type="color" value={editedSettings.secondary_color || '#3B82F6'} onChange={e => setEditedSettings({...editedSettings, secondary_color: e.target.value})} className="w-16 h-16 rounded-2xl cursor-pointer bg-transparent border-0 p-0 shadow-lg" />
                       <input type="text" value={editedSettings.secondary_color || '#3B82F6'} onChange={e => setEditedSettings({...editedSettings, secondary_color: e.target.value})} className="flex-1 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none font-mono text-sm" />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Accent Color</label>
                     <div className="flex gap-4">
                       <input type="color" value={editedSettings.accent_color || '#0D9488'} onChange={e => setEditedSettings({...editedSettings, accent_color: e.target.value})} className="w-16 h-16 rounded-2xl cursor-pointer bg-transparent border-0 p-0 shadow-lg" />
                       <input type="text" value={editedSettings.accent_color || '#0D9488'} onChange={e => setEditedSettings({...editedSettings, accent_color: e.target.value})} className="flex-1 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none font-mono text-sm" />
                     </div>
                   </div>
                 </div>

                 <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm pt-8 border-t border-white/5">Background Control Panel</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                   {/* Services Background */}
                   <div className="space-y-4">
                      <label className="text-sm font-bold text-gray-300 uppercase tracking-widest block">Services Background Media (Upload Below)</label>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-black/50 border border-white/10 rounded-xl p-4 text-gray-400 text-sm truncate">
                          {editedSettings.services_bg_media || 'Default Background'}
                        </div>
                        <button
                          onClick={() => document.getElementById('services_bg_upload')?.click()}
                          className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl text-white text-sm font-bold transition-all flex items-center gap-2"
                        >
                          <Upload size={18} /> Upload
                        </button>
                        <input id="services_bg_upload" type="file" className="hidden" accept="image/*,video/*" onChange={(e) => handleHeroFileUpload(e, 'services_bg_media')} />
                      </div>
                      <div className="flex items-center gap-6 p-4 bg-black/50 border border-white/10 rounded-xl mt-4">
                         <input 
                           type="range" min="0" max="1" step="0.05"
                           value={editedSettings.services_bg_opacity ?? 0.85}
                           onChange={e => setEditedSettings({...editedSettings, services_bg_opacity: parseFloat(e.target.value)})}
                           className="flex-1 accent-cinema-red"
                         />
                         <span className="text-cinema-red font-mono font-bold w-12 text-center">{Math.round((editedSettings.services_bg_opacity ?? 0.85) * 100)}%</span>
                       </div>
                    </div>

                    {/* Products Background */}
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Products Background Media (Upload Below)</label>
                     <div className="flex items-center gap-4">
                       <div className="flex-1 bg-black/50 border border-white/10 rounded-xl p-4 text-gray-400 text-sm truncate">
                         {editedSettings.products_bg_media || 'Default Background'}
                       </div>
                       <button
                         onClick={() => document.getElementById('products_bg_upload')?.click()}
                         className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl text-white text-sm font-bold transition-all flex items-center gap-2"
                       >
                         <Upload size={18} /> Upload
                       </button>
                       <input id="products_bg_upload" type="file" className="hidden" accept="image/*,video/*" onChange={(e) => handleHeroFileUpload(e, 'products_bg_media')} />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Products Opacity: {editedSettings.products_bg_opacity}</label>
                     <input 
                       type="range" min="0" max="1" step="0.01"
                       value={editedSettings.products_bg_opacity}
                       onChange={e => setEditedSettings({...editedSettings, products_bg_opacity: parseFloat(e.target.value)})}
                       className="w-full mt-4 accent-cinema-red"
                     />
                   </div>

                   {/* Gallery Background */}
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Gallery Background Media (Upload Below)</label>
                     <div className="flex items-center gap-4">
                       <div className="flex-1 bg-black/50 border border-white/10 rounded-xl p-4 text-gray-400 text-sm truncate">
                         {editedSettings.gallery_bg_media || 'Default Background'}
                       </div>
                       <button
                         onClick={() => document.getElementById('gallery_bg_upload')?.click()}
                         className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl text-white text-sm font-bold transition-all flex items-center gap-2"
                       >
                         <Upload size={18} /> Upload
                       </button>
                       <input id="gallery_bg_upload" type="file" className="hidden" accept="image/*,video/*" onChange={(e) => handleHeroFileUpload(e, 'gallery_bg_media')} />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Gallery Opacity: {editedSettings.gallery_bg_opacity}</label>
                     <input 
                       type="range" min="0" max="1" step="0.01"
                       value={editedSettings.gallery_bg_opacity}
                       onChange={e => setEditedSettings({...editedSettings, gallery_bg_opacity: parseFloat(e.target.value)})}
                       className="w-full mt-4 accent-cinema-red"
                     />
                   </div>

                   {/* Clients Background */}
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Clients Background Media (Upload Below)</label>
                     <div className="flex items-center gap-4">
                       <div className="flex-1 bg-black/50 border border-white/10 rounded-xl p-4 text-gray-400 text-sm truncate">
                         {editedSettings.clients_bg_media || 'Default Background'}
                       </div>
                       <button
                         onClick={() => document.getElementById('clients_bg_upload')?.click()}
                         className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl text-white text-sm font-bold transition-all flex items-center gap-2"
                       >
                         <Upload size={18} /> Upload
                       </button>
                       <input id="clients_bg_upload" type="file" className="hidden" accept="image/*,video/*" onChange={(e) => handleHeroFileUpload(e, 'clients_bg_media')} />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Clients Opacity: {editedSettings.clients_bg_opacity}</label>
                     <input 
                       type="range" min="0" max="1" step="0.01"
                       value={editedSettings.clients_bg_opacity}
                       onChange={e => setEditedSettings({...editedSettings, clients_bg_opacity: parseFloat(e.target.value)})}
                       className="w-full mt-4 accent-cinema-red"
                     />
                   </div>

                   {/* About Background */}
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">About Background Media (Upload Below)</label>
                     <div className="flex items-center gap-4">
                       <div className="flex-1 bg-black/50 border border-white/10 rounded-xl p-4 text-gray-400 text-sm truncate">
                         {editedSettings.about_bg_media || 'Default Background'}
                       </div>
                       <button
                         onClick={() => document.getElementById('about_bg_upload')?.click()}
                         className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl text-white text-sm font-bold transition-all flex items-center gap-2"
                       >
                         <Upload size={18} /> Upload
                       </button>
                       <input id="about_bg_upload" type="file" className="hidden" accept="image/*,video/*" onChange={(e) => handleHeroFileUpload(e, 'about_bg_media')} />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">About Opacity: {editedSettings.about_bg_opacity}</label>
                     <input 
                       type="range" min="0" max="1" step="0.01"
                       value={editedSettings.about_bg_opacity}
                       onChange={e => setEditedSettings({...editedSettings, about_bg_opacity: parseFloat(e.target.value)})}
                       className="w-full mt-4 accent-cinema-red"
                     />
                   </div>
                 </div>
               </div>

                <div className="bg-black/30 p-8 rounded-3xl border border-white/5 space-y-8">
                  <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm flex items-center gap-3">
                    <Target size={18} /> Vision & Mission Statements
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Vision */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Our Vision (English)</label>
                        <textarea 
                          value={editedSettings.about_vision_text_en || ''}
                          onChange={e => setEditedSettings({...editedSettings, about_vision_text_en: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:border-cinema-red outline-none h-32 text-sm leading-relaxed"
                        />
                      </div>
                      <div className="space-y-2 rtl text-right">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">رؤيتنا (Arabic)</label>
                        <textarea 
                          value={editedSettings.about_vision_text_ar || ''}
                          onChange={e => setEditedSettings({...editedSettings, about_vision_text_ar: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:border-cinema-red outline-none h-32 text-sm leading-relaxed"
                          dir="rtl"
                        />
                      </div>
                    </div>
                    {/* Mission */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Our Mission (English)</label>
                        <textarea 
                          value={editedSettings.about_mission_text_en || ''}
                          onChange={e => setEditedSettings({...editedSettings, about_mission_text_en: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:border-cinema-red outline-none h-32 text-sm leading-relaxed"
                        />
                      </div>
                      <div className="space-y-2 rtl text-right">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">رسالتنا (Arabic)</label>
                        <textarea 
                          value={editedSettings.about_mission_text_ar || ''}
                          onChange={e => setEditedSettings({...editedSettings, about_mission_text_ar: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:border-cinema-red outline-none h-32 text-sm leading-relaxed"
                          dir="rtl"
                        />
                      </div>
                    </div>
                  </div>
                </div>

               <div className="bg-black/30 p-6 rounded-2xl border border-white/5 space-y-6">
                 <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm">Contact Information</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Contact Email</label>
                     <input 
                       type="email"
                       value={editedSettings.contact_email}
                       onChange={e => setEditedSettings({...editedSettings, contact_email: e.target.value})}
                       className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red focus:ring-1 focus:ring-cinema-red/50 outline-none transition-all"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Contact Phone</label>
                     <input 
                       type="text"
                       value={editedSettings.contact_phone}
                       onChange={e => setEditedSettings({...editedSettings, contact_phone: e.target.value})}
                       className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red focus:ring-1 focus:ring-cinema-red/50 outline-none transition-all"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">WhatsApp Number</label>
                     <input
                       type="text"
                       value={editedSettings.contact_whatsapp}
                       onChange={e => setEditedSettings({...editedSettings, contact_whatsapp: e.target.value})}
                       className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red focus:ring-1 focus:ring-cinema-red/50 outline-none transition-all"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Instagram Handle URL</label>
                     <input
                       type="text"
                       value={editedSettings.social_instagram || ''}
                       onChange={e => setEditedSettings({...editedSettings, social_instagram: e.target.value})}
                       className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red focus:ring-1 focus:ring-cinema-red/50 outline-none transition-all"
                       placeholder="https://instagram.com/..."
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Facebook Page URL</label>
                     <input
                       type="text"
                       value={editedSettings.social_facebook || ''}
                       onChange={e => setEditedSettings({...editedSettings, social_facebook: e.target.value})}
                       className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red focus:ring-1 focus:ring-cinema-red/50 outline-none transition-all"
                       placeholder="https://facebook.com/..."
                     />
                   </div>
                 </div>
               </div>
             </div>
           )}

           {/* SERVICES TAB */}
           {activeTab === 'services' && editedServices.length > 0 && (
             <div className="space-y-12 animate-fade-in">
               <h3 className="text-xl font-bold border-b border-white/10 pb-4">Services Configuration</h3>
               {editedServices.map((s, index) => (
                 <div key={s.id} className="bg-black/30 p-6 rounded-2xl border border-white/5 space-y-6">
                   <h4 className="text-cinema-red font-bold uppercase tracking-widest">{s.key_id}</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                       <label className="text-sm text-gray-400">Title (English)</label>
                       <input
                         type="text"
                         title="Service title in English"
                         value={s.title_en}
                         onChange={e => {
                           const newServ = [...editedServices];
                           newServ[index].title_en = e.target.value;
                           setEditedServices(newServ);
                         }}
                         className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none"
                       />
                     </div>
                     <div className="space-y-2 rtl text-right">
                       <label className="text-sm text-gray-400">Title (Arabic)</label>
                       <input
                         type="text"
                         title="Service title in Arabic"
                         value={s.title_ar}
                         onChange={e => {
                           const newServ = [...editedServices];
                           newServ[index].title_ar = e.target.value;
                           setEditedServices(newServ);
                         }}
                         className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none"
                         dir="rtl"
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm text-gray-400">Description (English)</label>
                       <textarea
                         title="Service description in English"
                         value={s.desc_en}
                         onChange={e => {
                           const newServ = [...editedServices];
                           newServ[index].desc_en = e.target.value;
                           setEditedServices(newServ);
                         }}
                         className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-24"
                       />
                     </div>
                     <div className="space-y-2 rtl text-right">
                       <label className="text-sm text-gray-400">Description (Arabic)</label>
                       <textarea
                         title="Service description in Arabic"
                         value={s.desc_ar}
                         onChange={e => {
                           const newServ = [...editedServices];
                           newServ[index].desc_ar = e.target.value;
                           setEditedServices(newServ);
                         }}
                         className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-24"
                         dir="rtl"
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Features (English, one per line)</label>
                       <textarea
                         title="Service features in English, one per line"
                         placeholder="Feature one&#10;Feature two&#10;Feature three"
                         value={(s.features_en || []).join('\n')}
                         onChange={e => {
                           const newServ = [...editedServices];
                           newServ[index].features_en = e.target.value.split('\n').filter((s: string) => s.trim());
                           setEditedServices(newServ);
                         }}
                         className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red focus:ring-1 focus:ring-cinema-red/50 outline-none h-28 transition-all"
                       />
                     </div>
                     <div className="space-y-2 rtl text-right">
                       <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Features (Arabic, one per line)</label>
                       <textarea
                         title="Service features in Arabic, one per line"
                         placeholder="ميزة أولى&#10;ميزة ثانية&#10;ميزة ثالثة"
                         value={(s.features_ar || []).join('\n')}
                         onChange={e => {
                           const newServ = [...editedServices];
                           newServ[index].features_ar = e.target.value.split('\n').filter((s: string) => s.trim());
                           setEditedServices(newServ);
                         }}
                         className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red focus:ring-1 focus:ring-cinema-red/50 outline-none h-28 transition-all"
                         dir="rtl"
                       />
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           )}

           {/* GALLERY TAB */}
           {/* AI SECTION TAB */}
           {activeTab === 'ai' && editedSettings && (
             <div className="space-y-12 animate-fade-in">
               <h3 className="text-xl font-bold border-b border-white/10 pb-4">AI Section & Innovation Control</h3>
               
               <div className="bg-black/30 p-8 rounded-3xl border border-white/5 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Section Title (EN)</label>
                     <input type="text" value={editedSettings.ai_title_en} onChange={e => setEditedSettings({...editedSettings, ai_title_en: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                   </div>
                   <div className="space-y-2 rtl text-right">
                     <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">العنوان (AR)</label>
                     <input type="text" dir="rtl" value={editedSettings.ai_title_ar} onChange={e => setEditedSettings({...editedSettings, ai_title_ar: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Description (EN)</label>
                     <textarea value={editedSettings.ai_desc_en} onChange={e => setEditedSettings({...editedSettings, ai_desc_en: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-32" />
                   </div>
                   <div className="space-y-2 rtl text-right">
                     <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">الوصف (AR)</label>
                     <textarea dir="rtl" value={editedSettings.ai_desc_ar} onChange={e => setEditedSettings({...editedSettings, ai_desc_ar: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-32" />
                   </div>
                 </div>

                 <div className="pt-8 border-t border-white/5">
                   <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm mb-6">Innovation Keywords (4 items)</h4>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {[0,1,2,3].map(idx => (
                       <input 
                         key={idx} 
                         type="text" 
                         placeholder={`Keyword ${idx+1}`}
                         value={editedSettings.innovation_keywords?.[idx] || ""} 
                         onChange={e => {
                           const newKeys = [...(editedSettings.innovation_keywords || ["","","",""])];
                           newKeys[idx] = e.target.value;
                           setEditedSettings({...editedSettings, innovation_keywords: newKeys});
                         }} 
                         className="bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cinema-red outline-none text-sm" 
                       />
                     ))}
                   </div>
                 </div>
               </div>

               <div className="space-y-6">
                 <h4 className="text-xl font-bold flex items-center gap-3">
                   <Brain className="text-cinema-red" size={24} /> AI Feature Cards
                 </h4>
                 {(editedSettings.ai_features || []).map((feat: any, idx: number) => (
                   <div key={idx} className="bg-black/30 p-8 rounded-3xl border border-white/5 space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <input type="text" value={feat.title_en} placeholder="Feature Title (EN)" onChange={e => {
                         const newFeats = [...editedSettings.ai_features];
                         newFeats[idx].title_en = e.target.value;
                         setEditedSettings({...editedSettings, ai_features: newFeats});
                       }} className="bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                       <input type="text" dir="rtl" value={feat.title_ar} placeholder="العنوان (AR)" onChange={e => {
                         const newFeats = [...editedSettings.ai_features];
                         newFeats[idx].title_ar = e.target.value;
                         setEditedSettings({...editedSettings, ai_features: newFeats});
                       }} className="bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                       <textarea value={feat.desc_en} placeholder="Feature Description (EN)" onChange={e => {
                         const newFeats = [...editedSettings.ai_features];
                         newFeats[idx].desc_en = e.target.value;
                         setEditedSettings({...editedSettings, ai_features: newFeats});
                       }} className="bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-24" />
                       <textarea dir="rtl" value={feat.desc_ar} placeholder="الوصف (AR)" onChange={e => {
                         const newFeats = [...editedSettings.ai_features];
                         newFeats[idx].desc_ar = e.target.value;
                         setEditedSettings({...editedSettings, ai_features: newFeats});
                       }} className="bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-24" />
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* ABOUT SECTION TAB */}
           {activeTab === 'about' && editedSettings && (
             <div className="space-y-12 animate-fade-in">
               <h3 className="text-xl font-bold border-b border-white/10 pb-4">About Section Management</h3>
               
               <div className="bg-black/30 p-8 rounded-3xl border border-white/5 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Vision Text (EN)</label>
                     <textarea value={editedSettings.about_vision_text_en} onChange={e => setEditedSettings({...editedSettings, about_vision_text_en: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-32" />
                   </div>
                   <div className="space-y-2 rtl text-right">
                     <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">الرؤية (AR)</label>
                     <textarea dir="rtl" value={editedSettings.about_vision_text_ar} onChange={e => setEditedSettings({...editedSettings, about_vision_text_ar: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-32" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Mission Text (EN)</label>
                     <textarea value={editedSettings.about_mission_text_en} onChange={e => setEditedSettings({...editedSettings, about_mission_text_en: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-32" />
                   </div>
                   <div className="space-y-2 rtl text-right">
                     <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">المهمة (AR)</label>
                     <textarea dir="rtl" value={editedSettings.about_mission_text_ar} onChange={e => setEditedSettings({...editedSettings, about_mission_text_ar: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-32" />
                   </div>
                 </div>
               </div>

               <div className="space-y-6">
                 <h4 className="text-xl font-bold flex items-center gap-3">
                   <Info className="text-cinema-red" size={24} /> Performance Stats (4 items)
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {(editedSettings.about_stats || []).map((stat: any, idx: number) => (
                     <div key={idx} className="bg-black/30 p-8 rounded-3xl border border-white/5 space-y-6">
                       <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase">Stat Value</label>
                           <input type="text" value={stat.value} placeholder="e.g. 150+" onChange={e => {
                             const newStats = [...editedSettings.about_stats];
                             newStats[idx].value = e.target.value;
                             setEditedSettings({...editedSettings, about_stats: newStats});
                           }} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cinema-red outline-none font-mono" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase">Icon Name</label>
                           <input type="text" value={stat.icon} placeholder="Lucide Icon" onChange={e => {
                             const newStats = [...editedSettings.about_stats];
                             newStats[idx].icon = e.target.value;
                             setEditedSettings({...editedSettings, about_stats: newStats});
                           }} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cinema-red outline-none font-mono" />
                         </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase">Label (EN)</label>
                           <input type="text" value={stat.label_en} onChange={e => {
                             const newStats = [...editedSettings.about_stats];
                             newStats[idx].label_en = e.target.value;
                             setEditedSettings({...editedSettings, about_stats: newStats});
                           }} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cinema-red outline-none" />
                         </div>
                         <div className="space-y-2 rtl text-right">
                           <label className="text-xs font-bold text-gray-500 uppercase">العنوان (AR)</label>
                           <input type="text" dir="rtl" value={stat.label_ar} onChange={e => {
                             const newStats = [...editedSettings.about_stats];
                             newStats[idx].label_ar = e.target.value;
                             setEditedSettings({...editedSettings, about_stats: newStats});
                           }} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cinema-red outline-none" />
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           )}

           {activeTab === 'clients' && (
             <div className="space-y-8 animate-fade-in">
               <div className="flex items-center justify-between border-b border-white/10 pb-4">
                 <h3 className="text-xl font-bold">Clients & Partners Logos</h3>
               </div>
               
               <div className="bg-black/30 p-6 rounded-2xl border border-white/5 space-y-6">
                 <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm">Add New Client Logo</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-sm text-gray-400">Logo URL</label>
                     <input type="text" value={newClientItem.logo_url} onChange={e => setNewClientItem({...newClientItem, logo_url: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" placeholder="e.g. client-logo.png" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm text-gray-400">Client Name</label>
                     <input type="text" value={newClientItem.name} onChange={e => setNewClientItem({...newClientItem, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" placeholder="Client Name" />
                   </div>
                 </div>
                 <button type="button" onClick={handleAddClient} disabled={isSaving || !newClientItem.logo_url} className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-cinema-red transition-all">
                   <Plus size={18} /> Add Client
                 </button>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                 {clients.map(client => (
                   <div key={client.id} className="group relative bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col items-center">
                     <img src={client.logo_url.startsWith('http') ? client.logo_url : `/backgrounds/clients/${client.logo_url}`} className="h-16 w-auto object-contain mb-2 filter grayscale group-hover:grayscale-0 transition-all" alt={client.name} />
                     <p className="text-xs text-gray-400 truncate w-full text-center">{client.name}</p>
                     <button onClick={() => handleDeleteClient(client.id)} className="absolute -top-2 -right-2 p-1.5 bg-red-600 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                       <Trash2 size={12} />
                     </button>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {activeTab === 'contact' && editedSettings && (
             <div className="space-y-8 animate-fade-in">
               <h3 className="text-xl font-bold border-b border-white/10 pb-4">Contact Info & Social Media</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-black/30 p-8 rounded-3xl border border-white/5 space-y-6">
                   <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm">Core Contact</h4>
                   <div className="space-y-4">
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                       <input type="email" value={editedSettings.contact_email} onChange={e => setEditedSettings({...editedSettings, contact_email: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <label className="text-xs font-bold text-gray-500 uppercase">Phone 1</label>
                         <input type="text" value={editedSettings.contact_phone} onChange={e => setEditedSettings({...editedSettings, contact_phone: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-bold text-gray-500 uppercase">Phone 2</label>
                         <input type="text" value={editedSettings.contact_phone2 || ''} onChange={e => setEditedSettings({...editedSettings, contact_phone2: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                       </div>
                     </div>
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500 uppercase">WhatsApp (International format)</label>
                       <input type="text" value={editedSettings.contact_whatsapp} onChange={e => setEditedSettings({...editedSettings, contact_whatsapp: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                     </div>
                   </div>
                 </div>

                 <div className="bg-black/30 p-8 rounded-3xl border border-white/5 space-y-6">
                   <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm">Social Media Links</h4>
                   <div className="grid grid-cols-1 gap-4">
                     <input type="text" placeholder="Instagram URL" value={editedSettings.social_instagram} onChange={e => setEditedSettings({...editedSettings, social_instagram: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cinema-red outline-none" />
                     <input type="text" placeholder="Facebook URL" value={editedSettings.social_facebook} onChange={e => setEditedSettings({...editedSettings, social_facebook: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cinema-red outline-none" />
                     <input type="text" placeholder="YouTube URL" value={editedSettings.social_youtube || ''} onChange={e => setEditedSettings({...editedSettings, social_youtube: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cinema-red outline-none" />
                     <input type="text" placeholder="LinkedIn URL" value={editedSettings.social_linkedin || ''} onChange={e => setEditedSettings({...editedSettings, social_linkedin: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cinema-red outline-none" />
                   </div>
                 </div>
               </div>

               <div className="bg-black/30 p-8 rounded-3xl border border-white/5 space-y-8">
                 <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm">Location & Address</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">Physical Address (EN)</label>
                     <textarea value={editedSettings.address_en || ''} onChange={e => setEditedSettings({...editedSettings, address_en: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-24" />
                   </div>
                   <div className="space-y-2 text-right">
                     <label className="text-xs font-bold text-gray-500 uppercase">العنوان بالتفصيل (AR)</label>
                     <textarea dir="rtl" value={editedSettings.address_ar || ''} onChange={e => setEditedSettings({...editedSettings, address_ar: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-24" />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500 uppercase">Google Maps URL</label>
                   <input type="text" value={editedSettings.map_url || ''} onChange={e => setEditedSettings({...editedSettings, map_url: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                 </div>
               </div>
             </div>
           )}

           {activeTab === 'gallery' && (
             <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold">Gallery Management</h3>
                </div>

                {/* Drag & Drop Upload Zone */}
                <div 
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-[2rem] p-12 text-center transition-all duration-500 group overflow-hidden ${
                    dragActive 
                      ? 'border-cinema-red bg-cinema-red/10 scale-[0.99] shadow-[0_0_50px_rgba(229,9,20,0.2)]' 
                      : 'border-white/10 bg-black/20 hover:border-white/20'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-cinema-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="relative z-10 space-y-4">
                    <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center transition-all duration-500 ${
                      dragActive ? 'bg-cinema-red text-white scale-110 rotate-12' : 'bg-white/5 text-gray-500 group-hover:text-gray-300'
                    }`}>
                      <Upload size={32} />
                    </div>
                    <div>
                      <p className="text-xl font-bold tracking-tight">
                        {dragActive ? 'Drop files to start upload' : 'Drag & drop media anywhere'}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">Supports High-Res Images & Cinematic Videos</p>
                    </div>
                    <div className="flex items-center justify-center gap-4 pt-4">
                      <label className="bg-white text-black px-8 py-3 rounded-xl font-bold text-sm cursor-pointer hover:bg-cinema-red hover:text-white transition-all shadow-xl">
                        Select Files
                        <input type="file" multiple className="hidden" onChange={(e) => handleFileUpload(e.target.files)} />
                      </label>
                    </div>
                  </div>

                  {isUploading && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-center items-center justify-center p-12">
                      <div className="w-full max-w-md space-y-4 text-center">
                        <div className="w-16 h-16 border-4 border-cinema-red border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-cinema-red font-bold animate-pulse tracking-widest uppercase text-sm">{uploadProgress}</p>
                      </div>
                    </div>
                  )}
                </div>
               
               {/* Add New Gallery Item */}
               <div className="bg-black/30 p-6 rounded-2xl border border-white/5 space-y-6">
                 <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm">Add New Media</h4>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                   <div className="space-y-2 md:col-span-2">
                     <label className="text-sm text-gray-400">Media URL (e.g., /gallery/img1.jpg)</label>
                     <input 
                       type="text"
                       value={newGalleryItem.media}
                       onChange={e => setNewGalleryItem({...newGalleryItem, media: e.target.value})}
                       className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none"
                       placeholder="URL path..."
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm text-gray-400">Type</label>
                     <select
                       title="Media type"
                       value={newGalleryItem.media_type}
                       onChange={e => setNewGalleryItem({...newGalleryItem, media_type: e.target.value})}
                       className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none appearance-none"
                     >
                       <option value="image">Image</option>
                       <option value="video">Video</option>
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm text-gray-400">Category</label>
                     <select
                       title="Media category"
                       value={newGalleryItem.category}
                       onChange={e => setNewGalleryItem({...newGalleryItem, category: e.target.value})}
                       className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none appearance-none"
                     >
                       <option value="all">All</option>
                       <option value="branding">Branding</option>
                       <option value="photography">Photography</option>
                       <option value="video">Video</option>
                       <option value="events">Events</option>
                     </select>
                   </div>
                   <div className="space-y-2 md:col-span-2">
                     <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Alt Text</label>
                     <input
                       type="text"
                       value={newGalleryItem.alt_text}
                       onChange={e => setNewGalleryItem({...newGalleryItem, alt_text: e.target.value})}
                       className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red focus:ring-1 focus:ring-cinema-red/50 outline-none transition-all"
                       placeholder="Descriptive alt text..."
                     />
                   </div>
                 </div>
                 <button
                   type="button"
                   onClick={handleAddGallery}
                   disabled={isSaving || !newGalleryItem.media}
                   className="mt-4 flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-cinema-red transition-all disabled:opacity-50"
                 >
                   <Plus size={18} /> Add Media
                 </button>
               </div>

               {/* Existing Gallery Grid */}
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                 {gallery.map(item => (
                   <div key={item.id} className="group relative aspect-square rounded-xl overflow-hidden bg-black/50 border border-white/10">
                     {item.media_type === 'image' ? (
                       <img src={item.media} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Gallery" />
                     ) : (
                       <video src={item.media} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" muted />
                     )}
                     <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button
                         type="button"
                         onClick={() => handleDeleteGallery(item.id)}
                         className="p-2 bg-red-600 rounded-lg text-white hover:bg-red-700"
                         title="Delete item"
                         aria-label="Delete gallery item"
                       >
                         <Trash2 size={16} />
                       </button>
                     </div>
                     <div className="absolute bottom-0 inset-x-0 p-2 bg-black/80 text-xs text-gray-400 capitalize">
                       {item.category} • {item.media_type}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

        </div>
      </main>
    </div>
  );
}
