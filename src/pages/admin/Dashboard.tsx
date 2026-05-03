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
  Users,
  Target,
  Play,
  MapPin,
  Mail,
  Smartphone
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
  uploadMedia,
  updateGalleryItem
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
  const [newGalleryItem, setNewGalleryItem] = useState({ media: '', media_type: 'image', category: 'all', alt_text: 'Gallery Item', is_featured: false });
  const [newClientItem, setNewClientItem] = useState({ logo_url: '', name: '' });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Sync local state when data loads
  useEffect(() => {
    if (hero) setEditedHero({ ...hero });
    if (products.length > 0) setEditedProducts([...products]);
    if (settings) setEditedSettings({ ...settings });
    if (services.length > 0) setEditedServices([...services]);
  }, [hero, products, settings, services]);

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
          is_featured: newGalleryItem.is_featured
        });
      }
      
      await refreshData();
      setUploadProgress('');
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err: any) {
      console.error('Upload error:', err);
      setSaveStatus('error');
      alert(`Gallery upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleHeroFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(`Uploading ${file.name}...`);
    try {
      const folder = fieldName.includes('logo') ? 'clients' : 'backgrounds';
      const url = await uploadMedia(file, folder);
      
      if (fieldName === 'hero_bg_media' || fieldName === 'background_media') {
        setEditedHero(prev => ({ ...prev, background_media: url }));
      } else {
        setEditedSettings(prev => ({ ...prev, [fieldName]: url }));
      }
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err: any) {
      console.error('Upload error:', err);
      setSaveStatus('error');
      alert(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress('');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      if (activeTab === 'hero' && editedHero) {
        await updateHeroContent(editedHero.id, {
          subtitle_en: editedHero.subtitle_en,
          subtitle_ar: editedHero.subtitle_ar,
          background_media: editedHero.background_media,
          texts_en: editedHero.texts_en,
          texts_ar: editedHero.texts_ar,
        });
        
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
      } else if (['settings', 'ai', 'about', 'contact'].includes(activeTab) && editedSettings) {
        await updateSiteSettings(editedSettings.id, {
          ...editedSettings
        });
        
        // Update CSS variables
        document.documentElement.style.setProperty('--color-primary', editedSettings.primary_color);
        if (editedSettings.secondary_color) document.documentElement.style.setProperty('--color-secondary', editedSettings.secondary_color);
        if (editedSettings.accent_color) document.documentElement.style.setProperty('--color-accent', editedSettings.accent_color);
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

  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm('Delete this item from gallery?')) return;
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

  const handleToggleFeatured = async (item: any) => {
    try {
      await updateGalleryItem(item.id, { is_featured: !item.is_featured });
      await refreshData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddClient = async () => {
    if (!newClientItem.logo_url) return;
    setIsSaving(true);
    try {
      await addClient({
        name: newClientItem.name || 'New Client',
        logo_url: newClientItem.logo_url,
        sort_order: clients.length
      });
      setNewClientItem({ logo_url: '', name: '' });
      await refreshData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
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
                  <CheckCircle2 size={16} /> Operation Successful
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="flex items-center gap-2 text-cinema-red-light font-bold text-sm bg-cinema-red/10 px-4 py-2 rounded-full border border-cinema-red/20">
                  <AlertCircle size={16} /> Operation Failed
                </div>
              )}
              {!['gallery', 'clients'].includes(activeTab) && (
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
        <div className="cinematic-card p-10 lg:p-14 relative group min-h-[600px]">
           <div className="inner-glow"></div>
           
           {isUploading && (
             <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center rounded-[2.5rem]">
               <div className="text-center space-y-4">
                 <div className="w-16 h-16 border-4 border-cinema-red border-t-transparent rounded-full animate-spin mx-auto"></div>
                 <p className="text-xl font-bold tracking-widest uppercase animate-pulse">{uploadProgress}</p>
               </div>
             </div>
           )}

           {/* HERO TAB */}
           {activeTab === 'hero' && editedHero && (
             <div className="space-y-12 animate-fade-in">
               <h3 className="text-xl font-bold border-b border-white/10 pb-4">Hero Content Configuration</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Subtitle (English)</label>
                    <textarea 
                      value={editedHero.subtitle_en}
                      onChange={e => setEditedHero({...editedHero, subtitle_en: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-white focus:border-cinema-red outline-none h-40 text-lg leading-relaxed"
                    />
                 </div>
                 <div className="space-y-4 rtl text-right">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">الترجمة (Arabic)</label>
                    <textarea 
                      value={editedHero.subtitle_ar}
                      onChange={e => setEditedHero({...editedHero, subtitle_ar: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-white focus:border-cinema-red outline-none h-40 text-lg leading-relaxed text-right"
                      dir="rtl"
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Rotating Headlines (EN, one per line)</label>
                    <textarea
                      value={(editedHero.texts_en || []).join('\n')}
                      onChange={e => setEditedHero({...editedHero, texts_en: e.target.value.split('\n').filter((s: string) => s.trim())})}
                      className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-white focus:border-cinema-red outline-none h-32 font-mono"
                    />
                 </div>
                 <div className="space-y-4 rtl text-right">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">العناوين المتحركة (AR, سطر لكل جملة)</label>
                    <textarea
                      value={(editedHero.texts_ar || []).join('\n')}
                      onChange={e => setEditedHero({...editedHero, texts_ar: e.target.value.split('\n').filter((s: string) => s.trim())})}
                      className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-white focus:border-cinema-red outline-none h-32 font-mono text-right"
                      dir="rtl"
                    />
                 </div>

                 <div className="md:col-span-2 space-y-4 pt-10 border-t border-white/5">
                   <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Hero Background Media</label>
                   <div className="flex items-center gap-6">
                     <div className="flex-1 bg-black/50 border border-white/10 rounded-2xl p-5 text-gray-400 truncate">
                        {editedHero.background_media || 'Default Background'}
                     </div>
                     <button
                        onClick={() => document.getElementById('hero_bg_upload_tab')?.click()}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl text-white font-bold transition-all flex items-center gap-3"
                     >
                       <Upload size={20} /> Change Media
                     </button>
                     <input id="hero_bg_upload_tab" type="file" className="hidden" accept="video/*,image/*" onChange={(e) => handleHeroFileUpload(e, 'hero_bg_media')} />
                   </div>
                 </div>
               </div>
             </div>
           )}

           {/* PRODUCTS TAB */}
           {activeTab === 'products' && (
             <div className="space-y-12 animate-fade-in">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4">Product Catalog Management</h3>
                <div className="grid grid-cols-1 gap-10">
                  {editedProducts.map((p, index) => (
                    <div key={p.id} className="bg-black/30 p-10 rounded-[2.5rem] border border-white/5 space-y-10 group/item relative">
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-cinema-red/10 rounded-xl flex items-center justify-center text-cinema-red font-bold font-mono">0{index+1}</div>
                           <h4 className="text-2xl font-bold tracking-tight">{p.name_en}</h4>
                         </div>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Name (EN)</label>
                           <input type="text" value={p.name_en} onChange={e => {
                             const newProducts = [...editedProducts];
                             newProducts[index].name_en = e.target.value;
                             setEditedProducts(newProducts);
                           }} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                         </div>
                         <div className="space-y-2 rtl text-right">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">الاسم (AR)</label>
                           <input type="text" dir="rtl" value={p.name_ar} onChange={e => {
                             const newProducts = [...editedProducts];
                             newProducts[index].name_ar = e.target.value;
                             setEditedProducts(newProducts);
                           }} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none text-right" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Description (EN)</label>
                           <textarea value={p.desc_en} onChange={e => {
                             const newProducts = [...editedProducts];
                             newProducts[index].desc_en = e.target.value;
                             setEditedProducts(newProducts);
                           }} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-24" />
                         </div>
                         <div className="space-y-2 rtl text-right">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">الوصف (AR)</label>
                           <textarea dir="rtl" value={p.desc_ar} onChange={e => {
                             const newProducts = [...editedProducts];
                             newProducts[index].desc_ar = e.target.value;
                             setEditedProducts(newProducts);
                           }} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-24 text-right" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Features (EN, one per line)</label>
                            <textarea
                              value={(p.features_en || []).join('\n')}
                              onChange={e => {
                                const newProducts = [...editedProducts];
                                newProducts[index].features_en = e.target.value.split('\n').filter((s: string) => s.trim());
                                setEditedProducts(newProducts);
                              }}
                              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-32"
                            />
                         </div>
                         <div className="space-y-2 rtl text-right">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">المميزات (AR, سطر لكل ميزة)</label>
                            <textarea
                              value={(p.features_ar || []).join('\n')}
                              onChange={e => {
                                const newProducts = [...editedProducts];
                                newProducts[index].features_ar = e.target.value.split('\n').filter((s: string) => s.trim());
                                setEditedProducts(newProducts);
                              }}
                              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-32 text-right"
                              dir="rtl"
                            />
                         </div>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
           )}

           {/* SERVICES TAB */}
           {activeTab === 'services' && (
             <div className="space-y-12 animate-fade-in">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4">Services Configuration</h3>
                <div className="grid grid-cols-1 gap-10">
                  {editedServices.map((s, index) => (
                    <div key={s.id} className="bg-black/30 p-10 rounded-[2.5rem] border border-white/5 space-y-10 group/item relative">
                       <h4 className="text-cinema-red font-bold uppercase tracking-[0.3em] text-xs">{s.key_id}</h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase">Title (EN)</label>
                           <input type="text" value={s.title_en} onChange={e => {
                             const newServ = [...editedServices];
                             newServ[index].title_en = e.target.value;
                             setEditedServices(newServ);
                           }} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none text-xl font-bold" />
                         </div>
                         <div className="space-y-2 rtl text-right">
                           <label className="text-xs font-bold text-gray-500 uppercase">العنوان (AR)</label>
                           <input type="text" dir="rtl" value={s.title_ar} onChange={e => {
                             const newServ = [...editedServices];
                             newServ[index].title_ar = e.target.value;
                             setEditedServices(newServ);
                           }} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none text-xl font-bold text-right" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase">Description (EN)</label>
                           <textarea value={s.desc_en} onChange={e => {
                             const newServ = [...editedServices];
                             newServ[index].desc_en = e.target.value;
                             setEditedServices(newServ);
                           }} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-24" />
                         </div>
                         <div className="space-y-2 rtl text-right">
                           <label className="text-xs font-bold text-gray-500 uppercase">الوصف (AR)</label>
                           <textarea dir="rtl" value={s.desc_ar} onChange={e => {
                             const newServ = [...editedServices];
                             newServ[index].desc_ar = e.target.value;
                             setEditedServices(newServ);
                           }} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-24 text-right" />
                         </div>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
           )}

           {/* AI TAB */}
           {activeTab === 'ai' && editedSettings && (
             <div className="space-y-12 animate-fade-in">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4">AI Section & Innovation Control</h3>
                <div className="bg-black/30 p-10 rounded-[2.5rem] border border-white/5 space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-400 uppercase">Section Title (EN)</label>
                       <input type="text" value={editedSettings.ai_title_en || ''} onChange={e => setEditedSettings({...editedSettings, ai_title_en: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                     </div>
                     <div className="space-y-2 rtl text-right">
                       <label className="text-sm font-bold text-gray-400 uppercase">العنوان (AR)</label>
                       <input type="text" dir="rtl" value={editedSettings.ai_title_ar || ''} onChange={e => setEditedSettings({...editedSettings, ai_title_ar: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none text-right" />
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-400 uppercase">Description (EN)</label>
                       <textarea value={editedSettings.ai_desc_en || ''} onChange={e => setEditedSettings({...editedSettings, ai_desc_en: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-32" />
                     </div>
                     <div className="space-y-2 rtl text-right">
                       <label className="text-sm font-bold text-gray-400 uppercase">الوصف (AR)</label>
                       <textarea dir="rtl" value={editedSettings.ai_desc_ar || ''} onChange={e => setEditedSettings({...editedSettings, ai_desc_ar: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none h-32 text-right" />
                     </div>
                   </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xl font-bold flex items-center gap-3">
                    <Brain className="text-cinema-red" size={24} /> AI Feature Cards
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {(editedSettings.ai_features || []).map((feat: any, idx: number) => (
                      <div key={idx} className="bg-black/30 p-8 rounded-3xl border border-white/5 space-y-6">
                         <div className="flex items-center gap-3 mb-4">
                           <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400">#0{idx+1}</div>
                         </div>
                         <div className="space-y-4">
                           <input type="text" value={feat.title_en} placeholder="Title (EN)" onChange={e => {
                             const newFeats = [...editedSettings.ai_features];
                             newFeats[idx].title_en = e.target.value;
                             setEditedSettings({...editedSettings, ai_features: newFeats});
                           }} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cinema-red outline-none" />
                           <input type="text" dir="rtl" value={feat.title_ar} placeholder="العنوان (AR)" onChange={e => {
                             const newFeats = [...editedSettings.ai_features];
                             newFeats[idx].title_ar = e.target.value;
                             setEditedSettings({...editedSettings, ai_features: newFeats});
                           }} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cinema-red outline-none text-right" />
                           <textarea value={feat.desc_en} placeholder="Description (EN)" onChange={e => {
                             const newFeats = [...editedSettings.ai_features];
                             newFeats[idx].desc_en = e.target.value;
                             setEditedSettings({...editedSettings, ai_features: newFeats});
                           }} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cinema-red outline-none h-20 text-sm" />
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
           )}

           {/* ABOUT TAB */}
           {activeTab === 'about' && editedSettings && (
             <div className="space-y-12 animate-fade-in">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4">About Section Management</h3>
                <div className="bg-black/30 p-10 rounded-[2.5rem] border border-white/5 space-y-10">
                   <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm flex items-center gap-3">
                     <Target size={18} /> Vision & Mission Statements
                   </h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Our Vision (EN)</label>
                        <textarea value={editedSettings.about_vision_text_en || ''} onChange={e => setEditedSettings({...editedSettings, about_vision_text_en: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-white focus:border-cinema-red outline-none h-40" />
                     </div>
                     <div className="space-y-4 rtl text-right">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">رؤيتنا (AR)</label>
                        <textarea dir="rtl" value={editedSettings.about_vision_text_ar || ''} onChange={e => setEditedSettings({...editedSettings, about_vision_text_ar: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-white focus:border-cinema-red outline-none h-40 text-right" />
                     </div>
                     <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Our Mission (EN)</label>
                        <textarea value={editedSettings.about_mission_text_en || ''} onChange={e => setEditedSettings({...editedSettings, about_mission_text_en: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-white focus:border-cinema-red outline-none h-40" />
                     </div>
                     <div className="space-y-4 rtl text-right">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">رسالتنا (AR)</label>
                        <textarea dir="rtl" value={editedSettings.about_mission_text_ar || ''} onChange={e => setEditedSettings({...editedSettings, about_mission_text_ar: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-white focus:border-cinema-red outline-none h-40 text-right" />
                     </div>
                   </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xl font-bold flex items-center gap-3">
                    <Info className="text-cinema-red" size={24} /> Performance Stats
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {(editedSettings.about_stats || []).map((stat: any, idx: number) => (
                      <div key={idx} className="bg-black/30 p-6 rounded-3xl border border-white/5 space-y-4">
                        <input type="text" value={stat.value} placeholder="Value (e.g. 150+)" onChange={e => {
                          const newStats = [...editedSettings.about_stats];
                          newStats[idx].value = e.target.value;
                          setEditedSettings({...editedSettings, about_stats: newStats});
                        }} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cinema-red outline-none font-bold" />
                        <input type="text" value={stat.label_en} placeholder="Label (EN)" onChange={e => {
                          const newStats = [...editedSettings.about_stats];
                          newStats[idx].label_en = e.target.value;
                          setEditedSettings({...editedSettings, about_stats: newStats});
                        }} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cinema-red outline-none text-sm" />
                        <input type="text" dir="rtl" value={stat.label_ar} placeholder="العنوان (AR)" onChange={e => {
                          const newStats = [...editedSettings.about_stats];
                          newStats[idx].label_ar = e.target.value;
                          setEditedSettings({...editedSettings, about_stats: newStats});
                        }} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cinema-red outline-none text-sm text-right" />
                      </div>
                    ))}
                  </div>
                </div>
             </div>
           )}

           {/* GALLERY TAB */}
           {activeTab === 'gallery' && (
             <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold">Gallery Management</h3>
                </div>

                {/* Upload Zone */}
                <div 
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-[2.5rem] p-16 text-center transition-all duration-500 group ${
                    dragActive ? 'border-cinema-red bg-cinema-red/5' : 'border-white/10 hover:border-white/20 bg-black/20'
                  }`}
                >
                  <div className="relative z-10 space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-cinema-red transition-colors">
                      <Upload size={32} />
                    </div>
                    <div>
                      <p className="text-xl font-bold">Drag & drop media files here</p>
                      <p className="text-gray-500 text-sm mt-1">Supports High-Res Images & Cinematic Videos</p>
                    </div>
                    <label className="inline-block bg-white text-black px-10 py-4 rounded-2xl font-bold text-sm cursor-pointer hover:bg-cinema-red hover:text-white transition-all shadow-xl mt-4">
                      Select Files
                      <input type="file" multiple className="hidden" onChange={(e) => handleFileUpload(e.target.files)} />
                    </label>
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-10">
                   {gallery.map(item => (
                     <div key={item.id} className="group relative aspect-square rounded-[1.5rem] overflow-hidden bg-black border border-white/5">
                        {item.media_type === 'video' ? (
                          <video src={item.media} className="w-full h-full object-cover opacity-60" />
                        ) : (
                          <img src={item.media} className="w-full h-full object-cover opacity-60" alt="" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                           <div className="absolute top-3 right-3 flex gap-2">
                             <button onClick={() => handleToggleFeatured(item)} className={`p-2 rounded-lg transition-all ${item.is_featured ? 'bg-cinema-red text-white' : 'bg-black/60 text-white hover:bg-white hover:text-black'}`}>
                               <Target size={16} />
                             </button>
                             <button onClick={() => handleDeleteGallery(item.id)} className="p-2 bg-red-600 rounded-lg text-white hover:bg-red-700 shadow-lg">
                               <Trash2 size={16} />
                             </button>
                           </div>
                           <div className="absolute bottom-4 inset-x-0 text-center">
                             <span className="text-[10px] font-bold uppercase tracking-widest bg-black/80 px-3 py-1 rounded-full border border-white/10">
                               {item.media_type} | {item.category}
                             </span>
                           </div>
                        </div>
                        {item.is_featured && (
                          <div className="absolute top-3 left-3 px-3 py-1 bg-cinema-red text-[10px] font-bold uppercase rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                            Featured
                          </div>
                        )}
                     </div>
                   ))}
                </div>
             </div>
           )}

           {/* CLIENTS TAB */}
           {activeTab === 'clients' && (
             <div className="space-y-8 animate-fade-in">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4">Client Logos Management</h3>
                <div className="bg-black/30 p-10 rounded-[2.5rem] border border-white/5 space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                     <div className="space-y-4">
                       <label className="text-sm font-bold text-gray-400">Client Name</label>
                       <input type="text" value={newClientItem.name} onChange={e => setNewClientItem({...newClientItem, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:border-cinema-red outline-none" placeholder="Client Name" />
                     </div>
                     <div className="space-y-4">
                       <label className="text-sm font-bold text-gray-400">Logo Image</label>
                       <div className="flex gap-4">
                         <div className="flex-1 bg-black/50 border border-white/10 rounded-2xl p-4 text-gray-500 truncate text-sm">
                           {newClientItem.logo_url || 'No logo selected...'}
                         </div>
                         <button onClick={() => document.getElementById('new_client_logo')?.click()} className="bg-white/5 hover:bg-white/10 px-6 py-4 rounded-2xl text-white font-bold transition-all flex items-center gap-2">
                           <Upload size={18} />
                         </button>
                         <input id="new_client_logo" type="file" className="hidden" accept="image/*" onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setIsUploading(true);
                            setUploadProgress('Uploading client logo...');
                            try {
                              const url = await uploadMedia(file, 'clients');
                              setNewClientItem(prev => ({
                                ...prev, 
                                logo_url: url, 
                                name: prev.name || file.name.replace(/\.[^.]+$/, '')
                              }));
                              setSaveStatus('success');
                              setTimeout(() => setSaveStatus(null), 3000);
                            } catch (err: any) {
                              console.error('Logo upload error:', err);
                              setSaveStatus('error');
                              alert(`Logo upload failed: ${err.message}`);
                            } finally {
                              setIsUploading(false);
                              setUploadProgress('');
                            }
                          }} />
                       </div>
                     </div>
                   </div>
                   <button onClick={handleAddClient} disabled={isSaving || !newClientItem.logo_url} className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-2xl font-bold hover:bg-cinema-red hover:text-white transition-all disabled:opacity-50">
                     <Plus size={20} /> Add Client to Live List
                   </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-10">
                   {clients.map(client => (
                     <div key={client.id} className="group relative aspect-square rounded-[1.5rem] bg-white/5 border border-white/5 p-8 flex items-center justify-center">
                        <img src={client.logo_url} className="max-w-full max-h-full object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={client.name} />
                        <button onClick={() => handleDeleteClient(client.id)} className="absolute top-3 right-3 p-2 bg-red-600 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={14} />
                        </button>
                        <div className="absolute bottom-2 inset-x-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-[10px] text-gray-500 font-bold uppercase">{client.name}</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           )}

           {/* CONTACT TAB */}
           {activeTab === 'contact' && editedSettings && (
             <div className="space-y-12 animate-fade-in">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4">Contact & Social Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="bg-black/30 p-10 rounded-[2.5rem] border border-white/5 space-y-8">
                      <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm">Core Contact Info</h4>
                      <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                           <input type="email" value={editedSettings.contact_email} onChange={e => setEditedSettings({...editedSettings, contact_email: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
                           <input type="text" value={editedSettings.contact_phone} onChange={e => setEditedSettings({...editedSettings, contact_phone: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase">WhatsApp</label>
                           <input type="text" value={editedSettings.contact_whatsapp} onChange={e => setEditedSettings({...editedSettings, contact_whatsapp: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                        </div>
                      </div>
                   </div>

                   <div className="bg-black/30 p-10 rounded-[2.5rem] border border-white/5 space-y-8">
                      <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm">Social Handles</h4>
                      <div className="space-y-4">
                        <input type="text" placeholder="Instagram URL" value={editedSettings.social_instagram} onChange={e => setEditedSettings({...editedSettings, social_instagram: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                        <input type="text" placeholder="Facebook URL" value={editedSettings.social_facebook} onChange={e => setEditedSettings({...editedSettings, social_facebook: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                        <input type="text" placeholder="LinkedIn URL" value={editedSettings.social_linkedin || ''} onChange={e => setEditedSettings({...editedSettings, social_linkedin: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                        <input type="text" placeholder="YouTube Channel URL" value={editedSettings.social_youtube || ''} onChange={e => setEditedSettings({...editedSettings, social_youtube: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                      </div>
                   </div>
                </div>

                <div className="bg-black/30 p-10 rounded-[2.5rem] border border-white/5 space-y-10">
                   <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm flex items-center gap-3"><MapPin size={18} /> Location Details</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-500 uppercase">Address (EN)</label>
                        <textarea value={editedSettings.address_en || ''} onChange={e => setEditedSettings({...editedSettings, address_en: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-white focus:border-cinema-red outline-none h-32" />
                     </div>
                     <div className="space-y-4 rtl text-right">
                        <label className="text-xs font-bold text-gray-500 uppercase">العنوان (AR)</label>
                        <textarea dir="rtl" value={editedSettings.address_ar || ''} onChange={e => setEditedSettings({...editedSettings, address_ar: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-white focus:border-cinema-red outline-none h-32 text-right" />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">Google Maps Embed/URL</label>
                     <input type="text" value={editedSettings.map_url || ''} onChange={e => setEditedSettings({...editedSettings, map_url: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cinema-red outline-none" />
                   </div>
                </div>
             </div>
           )}

           {/* SETTINGS TAB */}
           {activeTab === 'settings' && editedSettings && (
             <div className="space-y-12 animate-fade-in">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4">General System Settings</h3>
                
                <div className="bg-black/30 p-10 rounded-[2.5rem] border border-white/5 space-y-10">
                   <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm">Design System Colors</h4>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-500 uppercase">Primary (Red)</label>
                        <div className="flex gap-4">
                          <input type="color" value={editedSettings.primary_color} onChange={e => setEditedSettings({...editedSettings, primary_color: e.target.value})} className="w-16 h-16 rounded-2xl cursor-pointer bg-transparent border-0 p-0" />
                          <input type="text" value={editedSettings.primary_color} onChange={e => setEditedSettings({...editedSettings, primary_color: e.target.value})} className="flex-1 bg-black/50 border border-white/10 rounded-xl p-4 text-white font-mono" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-500 uppercase">Secondary (Blue)</label>
                        <div className="flex gap-4">
                          <input type="color" value={editedSettings.secondary_color || '#3B82F6'} onChange={e => setEditedSettings({...editedSettings, secondary_color: e.target.value})} className="w-16 h-16 rounded-2xl cursor-pointer bg-transparent border-0 p-0" />
                          <input type="text" value={editedSettings.secondary_color || '#3B82F6'} onChange={e => setEditedSettings({...editedSettings, secondary_color: e.target.value})} className="flex-1 bg-black/50 border border-white/10 rounded-xl p-4 text-white font-mono" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-500 uppercase">Accent (Teal)</label>
                        <div className="flex gap-4">
                          <input type="color" value={editedSettings.accent_color || '#0D9488'} onChange={e => setEditedSettings({...editedSettings, accent_color: e.target.value})} className="w-16 h-16 rounded-2xl cursor-pointer bg-transparent border-0 p-0" />
                          <input type="text" value={editedSettings.accent_color || '#0D9488'} onChange={e => setEditedSettings({...editedSettings, accent_color: e.target.value})} className="flex-1 bg-black/50 border border-white/10 rounded-xl p-4 text-white font-mono" />
                        </div>
                      </div>
                   </div>
                </div>

                <div className="bg-black/30 p-10 rounded-[2.5rem] border border-white/5 space-y-10">
                   <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm">Background Media Assets</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {[
                       { label: 'Hero Background', field: 'hero_bg_media' },
                       { label: 'Services Background', field: 'services_bg_media' },
                       { label: 'Products Background', field: 'products_bg_media' },
                       { label: 'Gallery Background', field: 'gallery_bg_media' },
                       { label: 'Clients Background', field: 'clients_bg_media' },
                       { label: 'About Background', field: 'about_bg_media' },
                       { label: 'AI Background', field: 'ai_bg_media' }
                     ].map(bg => (
                       <div key={bg.field} className="space-y-3">
                         <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{bg.label}</label>
                         <div className="flex gap-4">
                           <div className="flex-1 bg-black/50 border border-white/10 rounded-xl p-4 text-gray-400 text-sm truncate">
                             {(bg.field === 'hero_bg_media' ? editedHero?.background_media : editedSettings[bg.field]) || 'Default Background'}
                           </div>
                           <button 
                             onClick={() => document.getElementById(`upload_${bg.field}`)?.click()}
                             className="bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl text-white transition-all flex items-center justify-center"
                             title="Upload New Media"
                           >
                             <Upload size={18} />
                           </button>
                           <input 
                             id={`upload_${bg.field}`} 
                             type="file" 
                             className="hidden" 
                             accept="image/*,video/*" 
                             onChange={(e) => handleHeroFileUpload(e, bg.field)} 
                           />
                         </div>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="bg-black/30 p-10 rounded-[2.5rem] border border-white/5 space-y-10">
                   <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm flex items-center gap-3">
                     <Brain size={18} /> TwinHub AI Assistant Configuration
                   </h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="md:col-span-2 flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10">
                        <div>
                          <p className="font-bold">Enable AI Chat Assistant</p>
                          <p className="text-sm text-gray-500">Toggle the floating AI chat widget on the live site.</p>
                        </div>
                        <button 
                          onClick={() => setEditedSettings({...editedSettings, ai_chat_enabled: !editedSettings.ai_chat_enabled})}
                          className={`w-14 h-8 rounded-full transition-all relative ${editedSettings.ai_chat_enabled ? 'bg-green-600' : 'bg-gray-700'}`}
                        >
                          <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${editedSettings.ai_chat_enabled ? 'left-7' : 'left-1'}`}></div>
                        </button>
                      </div>

                      <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-500 uppercase">AI Provider</label>
                        <select 
                          value={editedSettings.ai_provider || 'openai'} 
                          onChange={e => setEditedSettings({...editedSettings, ai_provider: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-cinema-red"
                        >
                          <option value="openai">OpenAI (GPT-4o / 3.5)</option>
                          <option value="groq">Groq (Llama 3 / Mixtral)</option>
                          <option value="ollama">Ollama (Local AI)</option>
                          <option value="anthropic">Anthropic (Claude 3)</option>
                          <option value="huggingface">Hugging Face (Open Source)</option>
                        </select>
                      </div>

                      <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          {editedSettings.ai_provider === 'ollama' ? 'Local API URL' : 'Model ID'}
                        </label>
                        <input 
                          type="text" 
                          value={editedSettings.ai_model_id || ''} 
                          placeholder={editedSettings.ai_provider === 'ollama' ? 'http://localhost:11434' : 'e.g. llama3.2:3b or gpt-4o'}
                          onChange={e => setEditedSettings({...editedSettings, ai_model_id: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-cinema-red" 
                        />
                      </div>

                      <div className="md:col-span-2 space-y-4">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          {editedSettings.ai_provider === 'ollama' ? 'Local Model Name' : 'API Key (Stored Securely)'}
                        </label>
                        <input 
                          type={editedSettings.ai_provider === 'ollama' ? 'text' : 'password'} 
                          value={editedSettings.ai_api_key || ''} 
                          placeholder={editedSettings.ai_provider === 'ollama' ? 'e.g. llama3.2:3b' : ''}
                          onChange={e => setEditedSettings({...editedSettings, ai_api_key: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-cinema-red" 
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-500 uppercase">System Prompt (EN)</label>
                        <textarea 
                          value={editedSettings.ai_system_prompt_en || ''} 
                          onChange={e => setEditedSettings({...editedSettings, ai_system_prompt_en: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-cinema-red h-32 text-sm" 
                        />
                      </div>

                      <div className="space-y-4 rtl text-right">
                        <label className="text-xs font-bold text-gray-500 uppercase">System Prompt (AR)</label>
                        <textarea 
                          dir="rtl"
                          value={editedSettings.ai_system_prompt_ar || ''} 
                          onChange={e => setEditedSettings({...editedSettings, ai_system_prompt_ar: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-cinema-red h-32 text-sm text-right" 
                        />
                      </div>
                   </div>
                </div>

                <div className="bg-black/30 p-10 rounded-[2.5rem] border border-white/5 space-y-10">
                   <h4 className="text-cinema-red font-bold uppercase tracking-widest text-sm">Global Opacity & Featured Assets</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {[
                        { label: 'Hero Overlay', field: 'hero_bg_opacity' },
                        { label: 'Services Overlay', field: 'services_bg_opacity' },
                        { label: 'Products Overlay', field: 'products_bg_opacity' },
                        { label: 'Gallery Overlay', field: 'gallery_bg_opacity' },
                        { label: 'Clients Overlay', field: 'clients_bg_opacity' },
                        { label: 'About Overlay', field: 'about_bg_opacity' },
                        { label: 'AI Overlay', field: 'ai_bg_opacity' }
                      ].map(ctrl => (
                        <div key={ctrl.field} className="space-y-4">
                           <div className="flex justify-between items-center">
                             <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">{ctrl.label}</label>
                             <span className="text-cinema-red font-mono font-bold text-lg">{Math.round((editedSettings[ctrl.field] ?? 0.9) * 100)}%</span>
                           </div>
                           <input 
                            type="range" min="0" max="1" step="0.01"
                            value={editedSettings[ctrl.field] ?? 0.9}
                            onChange={e => setEditedSettings({...editedSettings, [ctrl.field]: parseFloat(e.target.value)})}
                            className="w-full accent-cinema-red"
                           />
                        </div>
                      ))}

                      <div className="md:col-span-2 space-y-4 pt-10 border-t border-white/5">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest block">Featured Products Showreel (YouTube URL)</label>
                        <input 
                          type="text"
                          value={editedSettings.products_showreel_url || ''}
                          onChange={e => setEditedSettings({...editedSettings, products_showreel_url: e.target.value})}
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-5 text-white focus:border-cinema-red outline-none"
                          placeholder="https://www.youtube.com/watch?v=..."
                        />
                      </div>
                   </div>
                </div>
             </div>
           )}
        </div>
      </main>
    </div>
  );
}
