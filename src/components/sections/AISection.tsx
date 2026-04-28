import { Brain, Zap, ArrowRight, Monitor, Cpu } from 'lucide-react';
import MediaBackground from '../common/MediaBackground';
import { AI_SOLUTIONS } from '../../config/site.config';

interface AISectionProps {
  language: string;
}

export default function AISection({ language }: AISectionProps) {
  const t = AI_SOLUTIONS;
  const isRtl = language === 'ar';

  return (
    <section id="ai" className="relative overflow-hidden bg-black">
      <MediaBackground
        backgroundImage="/backgrounds/clients/ai-bg.png"
        overlayOpacity={0.8}
        className="py-24 lg:py-32"
      >
        {/* Cinematic Lighting Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-black/60 to-blue-950/30 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric-blue/8 rounded-full blur-[140px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fusion-teal/6 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header - The Bridge */}
          <div className="mb-20 text-center lg:text-left rtl:lg:text-right">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-sm font-medium tracking-widest uppercase mb-6 animate-fade-in">
              <Brain size={18} />
              <span>{t.subtitle[language as keyof typeof t.subtitle]}</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight max-w-4xl">
              {t.title[language as keyof typeof t.title]}
            </h2>
          </div>

          {/* Main Content Layout - Split View */}
          <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Left Content / Mission */}
            <div className="space-y-8 animate-fade-in-up">
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-light">
                {t.description[language as keyof typeof t.description]}
              </p>
              
              <div className="flex flex-col gap-6">
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group inline-flex items-center gap-3 text-white font-semibold text-lg hover:text-red-500 transition-colors w-fit"
                >
                  <span>{language === 'ar' ? 'استكشف حلولنا' : 'Explore Our Solutions'}</span>
                  <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-2 ${isRtl ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
                </button>
              </div>
            </div>

            {/* Right Content / Digital Products Cards */}
            <div className="grid sm:grid-cols-2 gap-6 relative">
              {/* Asymmetric Product Grid */}
              {t.features.map((feature, index) => (
                <div 
                  key={feature.id}
                  className={`group relative p-8 rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl hover:bg-white/[0.10] hover:border-cinema-red/30 transition-all duration-500 flex flex-col justify-between ${
                    index === 0 ? 'lg:-translate-y-6' : 'lg:translate-y-6'
                  }`}
                >
                  <div className="mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform duration-500 group-hover:scale-110 ${
                      feature.id === 'apps' 
                        ? 'bg-gradient-to-br from-electric-blue to-blue-900 shadow-blue-500/20' 
                        : 'bg-gradient-to-br from-fusion-teal to-cyan-900 shadow-cyan-500/20'
                    }`}>
                      {feature.id === 'apps' ? <Monitor className="text-white" size={28} /> : <Cpu className="text-white" size={28} />}
                    </div>
                    <h3 className={`text-2xl font-bold text-white mb-4 transition-colors ${
                      feature.id === 'apps' ? 'group-hover:text-electric-blue' : 'group-hover:text-fusion-teal'
                    }`}>
                      {feature.title[language as keyof typeof feature.title]}
                    </h3>
                    <p className="text-gray-400 leading-relaxed font-light">
                      {feature.desc[language as keyof typeof feature.desc]}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className={`text-sm font-medium ${
                       feature.id === 'apps' ? 'text-electric-blue' : 'text-fusion-teal'
                     }`}>{language === 'ar' ? 'اعرف المزيد' : 'Learn More'}</span>
                  </div>
                </div>
              ))}
              
              {/* Subtle Decorative element */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-600/5 blur-[100px] pointer-events-none"></div>
            </div>

          </div>

          {/* Bottom Trust/Innovation Banner */}
          <div className="mt-32 pt-16 border-t border-white/5 flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
             {/* Here we can place small tech logos later if needed */}
             <div className="text-white font-mono tracking-tighter text-sm uppercase">Innovation Center</div>
             <div className="text-white font-mono tracking-tighter text-sm uppercase">Smart Automation</div>
             <div className="text-white font-mono tracking-tighter text-sm uppercase">AI Engineering</div>
             <div className="text-white font-mono tracking-tighter text-sm uppercase">Creative Tech</div>
          </div>
        </div>
      </MediaBackground>
    </section>
  );
}