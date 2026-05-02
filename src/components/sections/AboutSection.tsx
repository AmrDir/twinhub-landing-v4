import { Award, Users, Clock, Target, Palette, CheckCircle2 } from 'lucide-react';
import MediaBackground from '../common/MediaBackground';
import { ABOUT_CONTENT, SERVICES_CONTENT } from '../../config/site.config';
import { useSiteData } from '../../context/SiteContext';
import DigitalLibrary from './DigitalLibrary';

interface AboutSectionProps {
  language: string;
}

const iconMap = {
  Award,
  Users,
  Clock,
  Target
};

export default function AboutSection({ language }: AboutSectionProps) {
  const { settings } = useSiteData();
  const t = ABOUT_CONTENT[language as keyof typeof ABOUT_CONTENT] || ABOUT_CONTENT.en;
  const s = SERVICES_CONTENT[language as keyof typeof SERVICES_CONTENT] || SERVICES_CONTENT.en;
  const visionText = language === 'ar' ? settings?.about_vision_text_ar : settings?.about_vision_text_en;
  const missionText = language === 'ar' ? settings?.about_mission_text_ar : settings?.about_mission_text_en;
  const isRtl = language === 'ar';
  const bgMedia = settings?.about_bg_media || '/backgrounds/about/about-bg.jpg';
  const bgOpacity = settings?.about_bg_opacity ?? 0.88;
  
  const stats = settings?.about_stats?.length ? settings.about_stats.map((s: any) => ({
    id: s.id,
    value: s.value,
    icon: s.icon,
    label: language === 'ar' ? s.label_ar : s.label_en
  })) : t.stats;

  return (
    <section id="about" className="relative py-10 overflow-hidden">
      <MediaBackground
        backgroundImage={bgMedia}
        overlayOpacity={bgOpacity}
        className="absolute inset-0"
      >
         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
      </MediaBackground>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Content Layout */}
        <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 
                className="font-bold text-white tracking-tight leading-tight"
                style={{ fontSize: 'var(--font-size-h2)' }}
              >
                {isRtl ? (
                  <>عن <span className="text-cinema-red">TwinHub</span></>
                ) : (
                  <>About <span className="text-cinema-red">TwinHub</span></>
                )}
              </h2>
              <p className="text-xl text-gray-200 font-light leading-relaxed italic bg-cinema-red/[0.06] border border-cinema-red/15 rounded-2xl px-6 py-4">
                {t.description}
              </p>
            </div>

            <div className="space-y-6 text-lg text-gray-300 font-light leading-relaxed">
              <p>{t.aboutText}</p>
              <p>{t.locationText}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-6">
              <div className="p-8 cinematic-card group hover:border-cinema-red/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] transition-all duration-700">
                 <div className="flex items-center gap-3 mb-4">
                   <Target className="text-cinema-red" size={24} />
                   <h4 className="font-bold text-white uppercase tracking-widest text-sm">{t.visionTitle}</h4>
                 </div>
                 <p className="text-sm text-gray-300 leading-relaxed font-light group-hover:text-white transition-colors">{visionText || t.visionText}</p>
              </div>
              <div className="p-8 cinematic-card group hover:border-electric-blue/50 hover:shadow-[0_0_30px_rgba(0,112,255,0.15)] transition-all duration-700">
                 <div className="flex items-center gap-3 mb-4">
                   <Award className="text-electric-blue" size={24} />
                   <h4 className="font-bold text-white uppercase tracking-widest text-sm">{t.missionTitle}</h4>
                 </div>
                 <p className="text-sm text-gray-300 leading-relaxed font-light group-hover:text-white transition-colors">{missionText || t.missionText}</p>
              </div>
            </div>
          </div>

          {/* Right: Visual Element & Stats */}
          <div className="relative">
            {/* Main Image with Frame */}
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10 group">
              <img
                src="/backgrounds/about/about-bg.png"
                alt="TwinHub Workspace"
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 via-transparent to-transparent" />
              
              {/* Floating Stat - Direct on Image (Resized) */}
              <div className="absolute bottom-10 right-10 z-30 text-right animate-fade-in pointer-events-none">
                <h3 className="text-4xl sm:text-5xl font-bold text-cinema-red drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] tracking-tighter">
                  {stats[0]?.value || '150+'}
                </h3>
                <p className="text-[10px] sm:text-xs text-white font-bold uppercase tracking-[0.3em] drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
                  {stats[0]?.label || (isRtl ? 'مشروع مكتمل' : 'Projects Completed')}
                </p>
              </div>
            </div>
            
            {/* Decorative Pulse Circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-50 -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
          </div>
        </div>

        {/* Stats Grid with Modern Aesthetic */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-t border-white/10">
          {stats.map((stat: any, statIdx: number) => {
            const Icon = (iconMap[stat.icon as keyof typeof iconMap] || Award) as any;
            const statColors = [
              { iconBg: 'bg-cinema-red/20 text-cinema-red shadow-[0_0_20px_rgba(220,38,38,0.2)]', iconHover: 'group-hover:bg-cinema-red', value: 'text-white' },
              { iconBg: 'bg-electric-blue/20 text-electric-blue shadow-[0_0_20px_rgba(59,130,246,0.2)]', iconHover: 'group-hover:bg-electric-blue', value: 'text-white' },
              { iconBg: 'bg-fusion-teal/20 text-fusion-teal shadow-[0_0_20px_rgba(13,148,136,0.2)]', iconHover: 'group-hover:bg-fusion-teal', value: 'text-white' },
              { iconBg: 'bg-cinema-red/20 text-cinema-red shadow-[0_0_20px_rgba(220,38,38,0.2)]', iconHover: 'group-hover:bg-cinema-red', value: 'text-white' },
            ];
            const sc = statColors[statIdx % statColors.length];
            return (
              <div key={stat.id || statIdx} className="text-center group cinematic-card p-6 border-white/5 hover:border-white/20 transition-all duration-500">
                <div className={`inline-flex items-center justify-center w-14 h-14 mb-4 rounded-2xl ${sc.iconBg} ${sc.iconHover} group-hover:text-white transition-all duration-500`}>
                  <Icon size={28} />
                </div>
                <h5 className={`text-4xl sm:text-5xl font-bold ${sc.value} mb-1 tracking-tighter`}>
                  {stat.value}
                </h5>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* TwinHub Digital Library (Replaces What We Do) */}
        <DigitalLibrary language={language} />
      </div>
    </section>
  );
}