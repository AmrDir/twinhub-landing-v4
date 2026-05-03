import { CLIENTS_CONTENT } from '../../config/site.config';
import { useSiteData } from '../../context/SiteContext';
import MediaBackground from '../common/MediaBackground';

interface ClientsSectionProps {
  language: string;
}

export default function ClientsSection({ language }: ClientsSectionProps) {
  const { settings, clients } = useSiteData();
  const t = CLIENTS_CONTENT[language as keyof typeof CLIENTS_CONTENT] || CLIENTS_CONTENT.en;
  
  // Use DB clients or fallback to static logos
  // Merge DB clients with static logos
  const displayLogos = clients.map(c => {
    return { url: c.logo_url, name: c.name };
  });

  const staticLogos = CLIENTS_CONTENT.logos.map(l => ({ 
    url: `/backgrounds/clients/${l}`, 
    name: 'Client Logo'
  })).filter(sl => !displayLogos.some(dl => dl.url === sl.url));

  const allLogos = [...displayLogos, ...staticLogos];

  // مضاعفة الشعارات لضمان وجود حلقة مستمرة بدون فراغات
  const doubleLogos = [...allLogos, ...allLogos];

  const bgMedia = settings?.clients_bg_media || '/gallery/work25.jpg';
  const bgOpacity = settings?.clients_bg_opacity ?? 0.95;

  return (
    <section id="clients" className="relative py-16 overflow-hidden border-t border-white/5">
      <MediaBackground
        backgroundImage={bgMedia}
        overlayOpacity={bgOpacity}
        className="absolute inset-0 z-0"
      />

      {/* Ambient warm orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[800px] h-[400px] bg-cinema-red/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cinema-red/10 border border-cinema-red/20 text-cinema-red-light text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cinema-red animate-pulse inline-block"></span>
            {language === 'ar' ? 'عملاؤنا' : 'Our Clients'}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            {t.title}
          </h2>
          <div className="w-12 h-0.5 bg-cinema-red rounded-full mx-auto mb-4 opacity-70"></div>
          <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Infinite Marquee Section - Row 1 (Forward) */}
        <div className="relative py-4 overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-black before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-black after:to-transparent">
          <div className="flex gap-8 animate-infinite-scroll items-center">
            {[...allLogos.slice(0, 23), ...allLogos.slice(0, 23)].map((client, idx) => (
              <div key={`row1-${idx}`} className="flex-shrink-0 group relative">
                <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/20 p-4 rounded-2xl transition-all duration-500 group-hover:bg-[#1F2937]/90 group-hover:border-cinema-red/40 group-hover:scale-110 shadow-lg">
                  <img
                    src={client.url.startsWith('http') || client.url.startsWith('/') ? client.url : `/backgrounds/clients/${client.url}`}
                    alt={client.name}
                    className="h-14 sm:h-20 w-auto object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infinite Marquee Section - Row 2 (Reverse) */}
        <div className="relative py-4 overflow-hidden mt-6 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-black before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-black after:to-transparent">
          <div className="flex gap-8 animate-infinite-scroll-reverse items-center">
            {[...allLogos.slice(23), ...allLogos.slice(23)].map((client, idx) => (
              <div key={`row2-${idx}`} className="flex-shrink-0 group relative">
                <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/20 p-4 rounded-2xl transition-all duration-500 group-hover:bg-[#1F2937]/90 group-hover:border-cinema-red/40 group-hover:scale-110 shadow-lg">
                  <img
                    src={client.url.startsWith('http') || client.url.startsWith('/') ? client.url : `/backgrounds/clients/${client.url}`}
                    alt={client.name}
                    className="h-14 sm:h-20 w-auto object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}