import { Award, Users, Clock, Target, Palette, CheckCircle2 } from 'lucide-react';
import MediaBackground from '../common/MediaBackground';
import { ABOUT_CONTENT, SERVICES_CONTENT } from '../../config/site.config';

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
  const t = ABOUT_CONTENT[language as keyof typeof ABOUT_CONTENT] || ABOUT_CONTENT.en;
  const s = SERVICES_CONTENT[language as keyof typeof SERVICES_CONTENT] || SERVICES_CONTENT.en;
  const isRtl = language === 'ar';

  return (
    <section id="about" className="relative py-24 bg-white overflow-hidden">
      <MediaBackground
        backgroundImage="/backgrounds/clients/about-bg.png"
        overlayOpacity={0.94}
        className="absolute inset-0"
      >
         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </MediaBackground>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Content Layout */}
        <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                {isRtl ? (
                  <>عن <span className="text-red-600">TwinHub</span></>
                ) : (
                  <>About <span className="text-red-600">TwinHub</span></>
                )}
              </h2>
              <p className="text-xl text-gray-600 font-light leading-relaxed italic border-l-4 border-red-600 pl-6 py-2">
                {t.description}
              </p>
            </div>

            <div className="space-y-6 text-lg text-gray-500 font-light leading-relaxed">
              <p>{t.aboutText}</p>
              <p>{t.locationText}</p>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid sm:grid-cols-2 gap-6 pt-6">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-red-200 transition-colors">
                 <div className="flex items-center gap-3 mb-4">
                   <Target className="text-red-600" size={24} />
                   <h4 className="font-bold text-gray-900">{t.visionTitle}</h4>
                 </div>
                 <p className="text-sm text-gray-500 leading-relaxed font-light">{t.visionText}</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-red-200 transition-colors">
                 <div className="flex items-center gap-3 mb-4">
                   <Award className="text-red-600" size={24} />
                   <h4 className="font-bold text-gray-900">{t.missionTitle}</h4>
                 </div>
                 <p className="text-sm text-gray-500 leading-relaxed font-light">{t.missionText}</p>
              </div>
            </div>
          </div>

          {/* Right: Visual Element & Stats */}
          <div className="relative">
            {/* Main Image with Frame */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="/backgrounds/clients/about-bg.png"
                alt="TwinHub Workspace"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              {/* Floating Stat Card */}
              <div className={`absolute bottom-8 ${isRtl ? 'left-8' : 'right-8'} bg-white p-6 rounded-2xl shadow-xl animate-pulse-slow`}>
                <p className="text-4xl font-bold text-red-600">20+</p>
                <p className="text-sm text-gray-400 uppercase tracking-widest">{isRtl ? 'سنة خبرة' : 'Years of Art'}</p>
              </div>
            </div>
            
            {/* Decorative Pulse Circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-50 -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
          </div>
        </div>

        {/* Stats Grid with Modern Aesthetic */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-t border-gray-100">
          {t.stats.map((stat: any) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap];
            return (
              <div key={stat.id} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-red-500/20">
                  <Icon size={24} />
                </div>
                <h5 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                  {stat.value}
                </h5>
                <p className="text-sm text-gray-400 font-light uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Short Summary of Services / What We Do */}
        <div className="mt-24 text-center">
            <div className="inline-block p-4 bg-red-50 rounded-2xl mb-6">
              <Palette className="text-red-600" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t.whatWeDoTitle}</h3>
            <p className="text-xl text-gray-400 font-light mb-12">{t.whatWeDoSubtitle}</p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {s.services.map((service: any) => (
                <div 
                  key={service.id} 
                  className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-full border border-gray-100 text-gray-600 hover:bg-white hover:border-red-200 hover:shadow-md transition-all cursor-default"
                >
                  <CheckCircle2 color="#DC2626" size={16} />
                  <span className="text-sm font-medium">{service.title}</span>
                </div>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}