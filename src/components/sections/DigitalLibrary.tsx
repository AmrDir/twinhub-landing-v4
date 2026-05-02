import { FileText, Download, BookOpen, Layers, Sparkles, Film, Music, Cpu, Camera, Calendar } from 'lucide-react';
import { useSiteData } from '../../context/SiteContext';
import { useRef, useState } from 'react';

interface DigitalLibraryProps {
  language: string;
}

export default function DigitalLibrary({ language }: DigitalLibraryProps) {
  const { settings } = useSiteData();
  const isRtl = language === 'ar';
  
  // Static Magazines Data for initial build (Will be connected to DB later)
  const magazines = [
    {
      id: 'films',
      title: { en: 'Corporate Films & Factories', ar: 'أفلام الشركات والمصانع' },
      cover: '/backgrounds/magazines/films-cover.jpg',
      pdf: '/docs/twinhub-films.pdf',
      icon: Film,
      color: 'from-cinema-red to-red-900',
      tag: { en: 'Cinematic', ar: 'سينمائي' }
    },
    {
      id: 'events',
      title: { en: 'Exhibitions & Events', ar: 'المعارض والفعاليات والاحتفاليات' },
      cover: '/backgrounds/magazines/events-cover.jpg',
      pdf: '/docs/twinhub-events.pdf',
      icon: Calendar,
      color: 'from-blue-600 to-indigo-900',
      tag: { en: 'Experiential', ar: 'فعاليات' }
    },
    {
      id: 'ads',
      title: { en: 'Ads & Products', ar: 'الإعلانات والمنتجات' },
      cover: '/backgrounds/magazines/ads-cover.jpg',
      pdf: '/docs/twinhub-ads.pdf',
      icon: Camera,
      color: 'from-purple-600 to-fuchsia-900',
      tag: { en: 'Creative', ar: 'إبداعي' }
    },
    {
      id: 'ai',
      title: { en: 'AI World & Smart Solutions', ar: 'عالم الـ AI والحلول الذكية' },
      cover: '/backgrounds/magazines/ai-cover.jpg',
      pdf: '/docs/twinhub-ai.pdf',
      icon: Cpu,
      color: 'from-teal-500 to-emerald-900',
      tag: { en: 'Future', ar: 'مستقبلي' }
    },
    {
      id: 'music',
      title: { en: 'Music & Video Clips', ar: 'الموسيقى والكليب' },
      cover: '/backgrounds/magazines/music-cover.jpg',
      pdf: '/docs/twinhub-music.pdf',
      icon: Music,
      color: 'from-amber-500 to-orange-900',
      tag: { en: 'Artistic', ar: 'فني' }
    }
  ];

  return (
    <div className="mt-32 relative">
      {/* Header with Cinematic Flare */}
      <div className="text-center mb-20 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cinema-red/10 border border-cinema-red/20 text-cinema-red text-xs font-bold uppercase tracking-widest">
          <Sparkles size={14} className="animate-pulse" />
          <span>{language === 'ar' ? 'المكتبة الرقمية الدورية' : 'Periodic Digital Library'}</span>
        </div>
        <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">
          {language === 'ar' ? (
            <>إرث <span className="text-cinema-red">TwinHub</span> المعرفي</>
          ) : (
            <>TwinHub <span className="text-cinema-red">Knowledge</span> Legacy</>
          )}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-400 font-light text-lg lg:text-xl">
          {language === 'ar' 
            ? 'مجلة دورية فنية تكنولوجية سينمائية تستعرض أدق تفاصيل خدماتنا وحلولنا المبتكرة.'
            : 'A periodic artistic, technological, and cinematic magazine showcasing the finest details of our services and innovative solutions.'}
        </p>
      </div>

      {/* Magazine Rack Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {magazines.map((mag, idx) => (
          <div key={mag.id} className="group relative flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
            {/* The Magazine Book Structure */}
            <div className="relative w-full aspect-[3/4] rounded-r-lg rounded-l-sm overflow-hidden shadow-2xl transition-all duration-700 group-hover:scale-[1.03] group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-10px_rgba(229,9,20,0.3)] perspective-1000">
              {/* Spine Detail */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/40 z-20 border-r border-white/10"></div>
              
              {/* Cover Image */}
              <div className="absolute inset-0 bg-gray-900">
                <img 
                  src={mag.cover} 
                  alt={mag.title[language as keyof typeof mag.title]}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${mag.color} opacity-40 group-hover:opacity-20 transition-opacity`}></div>
              </div>

              {/* Cover Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                   <mag.icon className="text-white/80 group-hover:text-white transition-colors" size={28} />
                   <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold uppercase tracking-widest border border-white/10">
                     {mag.tag[language as keyof typeof mag.tag]}
                   </span>
                </div>
                
                <div className="space-y-3">
                  <h4 className={`text-xl lg:text-2xl font-bold text-white leading-tight ${isRtl ? 'text-right' : 'text-left'}`}>
                    {mag.title[language as keyof typeof mag.title]}
                  </h4>
                  <div className="h-1 w-12 bg-white/40 rounded-full group-hover:w-full group-hover:bg-white transition-all duration-700"></div>
                </div>
              </div>

              {/* Hover Overlay Buttons */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4 z-30">
                <a 
                  href={mag.pdf} 
                  download 
                  className="w-14 h-14 rounded-full bg-cinema-red text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xl shadow-cinema-red/20"
                  title={language === 'ar' ? 'تحميل الملف' : 'Download PDF'}
                >
                  <Download size={24} />
                </a>
                <span className="text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {language === 'ar' ? 'تحميل الآن' : 'Download Now'}
                </span>
              </div>
            </div>

            {/* Reflection Effect below */}
            <div className="w-[90%] h-4 bg-gradient-to-b from-white/10 to-transparent blur-md rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-20 flex flex-col items-center gap-4">
        <p className="text-gray-500 text-sm font-light italic">
          {language === 'ar' 
            ? '* يتم تحديث هذه المكتبة دورياً بأحدث إصداراتنا الفنية والتقنية.'
            : '* This library is periodically updated with our latest artistic and technical releases.'}
        </p>
        <button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="group flex items-center gap-3 text-white/60 hover:text-cinema-red transition-colors font-bold uppercase tracking-[0.2em] text-xs"
        >
          <BookOpen size={16} />
          <span>{language === 'ar' ? 'اطلب نسختك المطبوعة' : 'Request Printed Copy'}</span>
        </button>
      </div>
    </div>
  );
}
