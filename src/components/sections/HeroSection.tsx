import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { HERO_CONTENT } from '../../config/site.config';

interface HeroSectionProps {
  language: string;
}

export default function HeroSection({ language }: HeroSectionProps) {
  const [currentText, setCurrentText] = useState(0);
  const t = HERO_CONTENT[language as keyof typeof HERO_CONTENT] || HERO_CONTENT.en;

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
    <section id="hero" className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Cinematic Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/backgrounds/hero/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Dynamic Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10"></div>
      
      {/* Grain / Texture Layer */}
      <div className="absolute inset-0 opacity-[0.03] z-15 pointer-events-none bg-pattern"></div>

      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center translate-y-[-5%] lg:translate-y-[-2%]">
        
        {/* Logo with Asymmetric spacing nudge */}
        <div className="mb-10 lg:mb-14 animate-fade-in-up">
          <img 
            src="/backgrounds/hero/mark.png"
            alt="Twinhub Mark" 
            className="mx-auto h-28 sm:h-36 lg:h-44 w-auto transform hover:scale-110 transition-all duration-700 logo-float drop-shadow-[0_0_30px_rgba(220,38,38,0.2)]"
          />
        </div>

        {/* Cinematic Typography Structure */}
        <div className="space-y-4 mb-10 max-w-4xl">
          <span className="block text-sm sm:text-base font-medium tracking-[0.3em] uppercase text-red-500 mb-2 animate-fade-in-up delay-300">
            {t.weCreate}
          </span>
          
          <div className="h-16 sm:h-24 flex items-center justify-center overflow-hidden">
             <h1 className="text-4xl sm:text-7xl lg:text-8xl font-bold text-white transition-all duration-500 animate-fade-in-up delay-500">
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
          >
            {t.startProject}
          </button>
        </div>

        {/* Refined Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hover:opacity-100 transition-opacity">
          <button 
            onClick={scrollToServices} 
            className="text-white hover:text-red-500 transition-colors"
            title="Scroll Down"
          >
            <ChevronDown size={36} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}