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
  AlertCircle
} from 'lucide-react';
import { signOut } from '../../lib/supabase';

interface DashboardProps {
  session: any;
}

export default function Dashboard({ session }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'success' | 'error' | null>(null);

  // Mock handle save (will connect to Supabase later)
  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      // Logic to update Supabase will go here
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSaveStatus('success');
    } catch (err) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const menuItems = [
    { id: 'hero', label: 'Hero Section', icon: Type },
    { id: 'services', label: 'Services', icon: LayoutDashboard },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'settings', label: 'General Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-black border-r border-white/5 flex flex-col p-6 fixed inset-y-0">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
            <LayoutDashboard size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight">TwinHub <span className="text-red-600">Admin</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                activeTab === item.id 
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                : 'text-gray-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight size={16} className={activeTab === item.id ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5">
          <div className="flex items-center gap-3 mb-6 px-2">
             <img src={session.user.user_metadata.avatar_url} className="w-10 h-10 rounded-full border border-white/10" alt="Admin" />
             <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{session.user.user_metadata.full_name}</p>
                <p className="text-[10px] text-gray-500 truncate">{session.user.email}</p>
             </div>
          </div>
          <button 
            onClick={() => signOut()}
            className="w-full flex items-center gap-2 p-4 text-gray-500 hover:text-red-500 hover:bg-red-500/5 rounded-2xl transition-all"
          >
            <LogOut size={18} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-12">
        <header className="flex justify-between items-center mb-12">
           <div>
              <h2 className="text-3xl font-bold mb-2 uppercase tracking-tighter">
                Managing: <span className="text-red-600">{activeTab}</span>
              </h2>
              <p className="text-gray-500 font-light">Customise your cinema experience live.</p>
           </div>
           
           <div className="flex items-center gap-4">
              {saveStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-500 text-sm animate-fade-in">
                  <CheckCircle2 size={16} /> Saved successfully
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-500 text-sm animate-fade-in">
                  <AlertCircle size={16} /> Save failed
                </div>
              )}
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition-all disabled:opacity-50"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save size={18} />
                    Publish Changes
                  </>
                )}
              </button>
           </div>
        </header>

        {/* Content Area Placeholder */}
        <div className="bg-white/5 border border-white/5 rounded-3xl p-8 min-h-[400px]">
           <div className="flex flex-col items-center justify-center h-full text-gray-600 py-20">
              <Type size={64} className="mb-4 opacity-10" />
              <p className="text-lg">Editor for <span className="text-red-600 font-bold uppercase">{activeTab}</span> is being initialised...</p>
              <p className="text-sm mt-2">Connecting to Supabase Table: <code className="bg-white/10 px-2 py-0.5 rounded text-white italic">site_config</code></p>
           </div>
        </div>
      </main>
    </div>
  );
}
