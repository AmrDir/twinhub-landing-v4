import { Brain, Video, Camera, Palette, Users, Award, ChevronRight } from 'lucide-react';
import MediaBackground from '../common/MediaBackground';
import { SERVICES_CONTENT } from '../../config/site.config';

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
  const t = SERVICES_CONTENT[language as keyof typeof SERVICES_CONTENT] || SERVICES_CONTENT.en;
  const isRtl = language === 'ar';

  return (
    <section id="services" className="relative py-24 bg-black overflow-hidden">
      {/* Background with cinematic depth */}
      <div className="absolute inset-0 z-0">
        <MediaBackground
          backgroundImage="/backgrounds/services/services-bg.jpg"
          overlayOpacity={0.92}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
            {isRtl ? (
              <>خدماتنا <span className="text-red-600">الإبداعية</span></>
            ) : (
              <>Our <span className="text-red-600">Services</span></>
            )}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            {t.subtitle}
          </p>
        </div>

        {/* Dynamic Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {t.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div 
                key={service.id}
                className="group relative bg-white/[0.03] border border-white/5 rounded-3xl p-8 lg:p-10 hover:bg-white/[0.07] hover:border-red-500/30 transition-all duration-500 transform hover:-translate-y-2"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute -inset-px bg-gradient-to-br from-red-600/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Icon Section */}
                <div className="mb-8 relative">
                  <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.3)] group-hover:scale-110 transition-transform duration-500">
                    {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed font-light h-20 overflow-hidden">
                  {service.description}
                </p>

                {/* Features List with Visual Rhythm */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Link */}
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 text-red-500 font-medium group/btn"
                >
                  <span>{t.learnMore}</span>
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