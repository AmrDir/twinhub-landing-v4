import { Brain, Video, Camera, Palette, Users, Award, ChevronRight } from 'lucide-react';
import MediaBackground from '../common/MediaBackground';
import { SERVICES_CONTENT } from '../../config/site.config';
import { useSiteData } from '../../context/SiteContext';

interface ServicesSectionProps {
  language: string;
}

const iconMap = {
  Brain,
  Video,
  Camera,
  Palette,
  Users,
  Award
};

export default function ServicesSection({ language }: ServicesSectionProps) {
  const { services: dbServices, settings } = useSiteData();
  const defaultT = SERVICES_CONTENT[language as keyof typeof SERVICES_CONTENT] || SERVICES_CONTENT.en;
  const isRtl = language === 'ar';

  // Construct final services array
  const activeServices = dbServices.length > 0 ? dbServices.map(s => ({
    id: s.key_id,
    icon: s.icon,
    title: language === 'ar' ? s.title_ar : s.title_en,
    description: language === 'ar' ? s.desc_ar : s.desc_en,
    features: language === 'ar' ? s.features_ar : s.features_en
  })) : defaultT.services;

  const bgMedia = settings?.services_bg_media || '/backgrounds/services/services-bg.jpg';
  const bgOpacity = settings?.services_bg_opacity ?? 0.85;

  return (
    <section id="services" className="relative py-32 lg:py-48 bg-black overflow-hidden">
      {/* Top Edge Fasil (Cinematic Separation) */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
      
      {/* Background with cinematic depth */}
      <div className="absolute inset-0 z-0">
        <MediaBackground
          backgroundImage={bgMedia}
          overlayOpacity={bgOpacity}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
            {isRtl ? (
              <>خدماتنا <span className="text-cinema-red">الإبداعية</span></>
            ) : (
              <>Our <span className="text-cinema-red">Services</span></>
            )}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light opacity-90">
            {defaultT.subtitle}
          </p>
        </div>

        {/* Dynamic Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {activeServices.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Brain;
            return (
              <div 
                key={service.id}
                className="group relative cinematic-card p-8 lg:p-10 hover:border-cinema-red-light/40 transition-all duration-700 transform hover:-translate-y-3"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute -inset-px bg-gradient-to-br from-cinema-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <div className="inner-glow"></div>

                {/* Icon Section */}
                <div className="mb-8 relative">
                  <div className="w-16 h-16 bg-cinema-red rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.3)] group-hover:scale-110 transition-transform duration-500">
                    {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cinema-red-light transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed font-light h-20 overflow-hidden group-hover:text-white transition-colors">
                  {service.description}
                </p>

                {/* Features List with Visual Rhythm */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-cinema-red rounded-full flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Link */}
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 text-cinema-red-light font-medium group/btn"
                >
                  <span>{defaultT.learnMore}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform group-hover/btn:translate-x-1 ${isRtl ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}