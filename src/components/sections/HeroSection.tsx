import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { HERO_CONTENT } from '../../config/site.config';
import { useSiteData } from '../../context/SiteContext';
import MediaBackground from '../common/MediaBackground';

interface HeroSectionProps {
  language: string;
}

export default function HeroSection({ language }: HeroSectionProps) {
  const [currentText, setCurrentText] = useState(0);
  const { hero, settings } = useSiteData();
  
  // Use DB data if available, else fallback to static
  const defaultT = HERO_CONTENT[language as keyof typeof HERO_CONTENT] || HERO_CONTENT.en;
  const t = hero ? {
    texts: language === 'ar' ? hero.texts_ar : hero.texts_en,
    weCreate: language === 'ar' ? hero.we_create_ar : hero.we_create_en,
    subtitle: language === 'ar' ? hero.subtitle_ar : hero.subtitle_en,
    exploreWork: defaultT.exploreWork,
    startProject: defaultT.startProject,
    background_media: hero.background_media
  } : {
    ...defaultT,
    background_media: '/backgrounds/hero/hero-bg.mp4'
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % t.texts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [t.texts.length]);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      <MediaBackground
        backgroundVideo={t.background_media}
        overlayOpacity={settings?.hero_bg_opacity ?? 0.2}
        className="h-full w-full flex items-center justify-center"
        showWatchButton={!!t.background_media}
        youtubeUrl={t.background_media}
        language={language}
      >
        {/* Dynamic Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10"></div>
        
        {/* Grain / Texture Layer */}
        <div className="absolute inset-0 opacity-[0.03] z-15 pointer-events-none bg-pattern"></div>

        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center pt-24 sm:pt-32 translate-y-[0%] lg:translate-y-[5%]">
          
          {/* Logo with Asymmetric spacing nudge */}
          <div className="mb-6 lg:mb-10 animate-fade-in-up">
            <img 
              src="/backgrounds/hero/mark.png"
              alt="Twinhub Mark" 
              className="mx-auto h-20 sm:h-28 lg:h-32 w-auto transform hover:scale-105 transition-all duration-700 logo-float drop-shadow-[0_0_30px_rgba(220,38,38,0.2)]"
            />
          </div>

          {/* Cinematic Typography Structure */}
          <div className="space-y-4 mb-10 max-w-4xl">
            <span className="block text-sm sm:text-base font-medium tracking-[0.3em] uppercase text-cinema-red-light mb-2 animate-fade-in-up delay-300">
              {t.weCreate}
            </span>
            
            <div className="min-h-[4rem] sm:min-h-[6rem] flex items-center justify-center overflow-hidden">
               <h1 
                 className="font-bold text-white transition-all duration-500 animate-fade-in-up delay-500 text-center leading-[1.1]"
                 style={{ fontSize: 'var(--font-size-hero)' }}
               >
                {t.texts[currentText]}
              </h1>
            </div>
          </div>

          {/* Selective Hierarchy for Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light mb-12 animate-fade-in-up delay-700 px-4">
            {t.subtitle}
          </p>

          {/* CTA Pair with Rhythm */}
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 justify-center items-center animate-fade-in-up delay-1000">
            <button 
              onClick={scrollToServices}
              className="btn-primary min-w-[200px]"
            >
              {t.exploreWork}
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary min-w-[200px]"
              aria-label={language === 'ar' ? 'ابدأ مشروعك الآن' : 'Start your project — scroll to contact form'}
            >
              {t.startProject}
            </button>
          </div>

          {/* Refined Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hover:opacity-100 transition-opacity">
            <button 
              onClick={scrollToServices} 
              className="text-white hover:text-cinema-red-light transition-colors"
              title="Scroll Down"
            >
              <ChevronDown size={36} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </MediaBackground>
    </section>
  );
}