import { PRODUCTS_CONTENT } from '../../config/site.config';
import { useSiteData } from '../../context/SiteContext';
import MediaBackground from '../common/MediaBackground';
import { ArrowUpRight, Play, Maximize2 } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { getYoutubeVideoId } from '../../lib/utils';

interface ProductsSectionProps {
  language: string;
}

export default function ProductsSection({ language }: ProductsSectionProps) {
  const { products: dbProducts, settings } = useSiteData();
  const defaultT = PRODUCTS_CONTENT;
  
  const bgMedia = settings?.products_bg_media || '/backgrounds/services/services-bg.jpg';
  const bgOpacity = settings?.products_bg_opacity ?? 0.88;
  
  // Merge DB products with static structure
  const products = dbProducts.length > 0 ? dbProducts.map(p => ({
    id: p.id,
    name: { en: p.name_en, ar: p.name_ar },
    description: { en: p.desc_en, ar: p.desc_ar },
    features: { en: p.features_en || [], ar: p.features_ar || [] },
    media: p.media,
    type: p.media_type,
    link: p.link
  })) : defaultT.products;

  const t = {
    title: defaultT.title,
    subtitle: defaultT.subtitle,
    products: products
  };
  const isRtl = language === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="products" ref={sectionRef} className="relative bg-[#050505] py-32 px-4 sm:px-6 lg:px-8">
      {/* Dynamic Background with Image */}
      <MediaBackground
        backgroundImage={bgMedia}
        overlayOpacity={bgOpacity}
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-cinema-red/15 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-blue-900/15 rounded-full blur-[150px]"></div>
      </div>
      
      {/* Bottom Gradient Break (Layering) */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-32 animate-fade-in">
          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            {t.title[language as keyof typeof t.title]}
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 font-light tracking-wide opacity-90">
            {t.subtitle[language as keyof typeof t.subtitle]}
          </p>
        </div>

        {/* Sticky Cards Container */}
        <div className="relative space-y-24 pb-24">
          {t.products.map((product, index) => {
            const isLast = index === t.products.length - 1;
            const productBadgeColors = [
              'border-cinema-red/30 bg-cinema-red/10 text-cinema-red-light',
              'border-electric-blue/30 bg-electric-blue/10 text-electric-blue',
              'border-fusion-teal/30 bg-fusion-teal/10 text-fusion-teal',
            ];
            const badgeColor = productBadgeColors[index % productBadgeColors.length];

            return (
              <div
                key={product.id}
                className={`sticky top-24 sm:top-32 lg:top-40 w-full min-h-[60vh] sm:min-h-[70vh] rounded-[2rem] sm:rounded-[3rem] border border-white/10 bg-black/40 backdrop-blur-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] flex flex-col lg:flex-row`}
                style={{
                   zIndex: index * 10,
                   transform: `scale(${1 - (t.products.length - 1 - index) * (typeof window !== 'undefined' && window.innerWidth < 768 ? 0.02 : 0.04)}) translateY(-${(t.products.length - 1 - index) * (typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 20)}px)`,
                   transformOrigin: 'top center',
                   transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
              >
                <div className="inner-glow"></div>
                {/* Content Side */}
                <div className={`p-12 lg:p-20 flex flex-col justify-center w-full lg:w-1/2 ${isRtl ? 'order-2 lg:order-2 text-right' : 'order-2 lg:order-1'}`}>
                  <div className="mb-6">
                    <span className={`inline-block px-4 py-1.5 rounded-full border ${badgeColor} text-sm font-bold tracking-widest uppercase mb-6`}>
                      0{index + 1} / AI Platform
                    </span>
                    <h3 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                      {product.name[language as keyof typeof product.name]}
                    </h3>
                    <p className="text-xl text-gray-300 font-light leading-relaxed mb-10 group-hover:text-white transition-colors">
                      {product.description[language as keyof typeof product.description]}
                    </p>
                  </div>
                  
                  {/* Features List */}
                  <ul className="space-y-4 mb-12 text-gray-300">
                    {product.features[language as keyof typeof product.features].map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-cinema-red shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                        <span className="font-medium text-lg">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Action Button */}
                  <a href={product.link} className="group flex items-center justify-center gap-3 bg-white text-black px-8 py-5 rounded-2xl font-bold text-lg w-fit hover:bg-cinema-red hover:text-white transition-all duration-500 shadow-xl">
                    <span>{language === 'ar' ? 'اكتشف المنصة' : 'Explore Platform'}</span>
                    <ArrowUpRight className={`w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                  </a>
                </div>

                {/* Media Side (Screen Frame) */}
                <div className={`relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-full flex items-center justify-center p-8 lg:p-16 ${isRtl ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
                   {/* Glowing shadow behind the screen */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-cinema-red/20 blur-[100px] pointer-events-none"></div>
                   
                   {/* Device Frame */}
                   <div className="relative w-full aspect-video rounded-2xl border-[8px] sm:border-[12px] border-black/95 bg-black overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] ring-1 ring-white/20 z-10 group/screen">
                     <div className="absolute inset-0 bg-gradient-to-tr from-cinema-red/5 to-transparent z-20 pointer-events-none"></div>
                     {/* Top reflection / Notch */}
                     <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent z-20 pointer-events-none"></div>
                     <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#1a1a1a] rounded-b-lg z-20 pointer-events-none"></div>

                     {(() => {
                        const ytId = getYoutubeVideoId(product.media);
                        if (ytId) {
                          return (
                            <iframe
                              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId}&playsinline=1&rel=0&showinfo=0`}
                              title={product.name.en}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 pointer-events-none transform group-hover/screen:scale-105 transition-transform duration-700"
                            />
                          );
                        }
                        if (product.type === 'video') {
                          return (
                            <video 
                              src={product.media}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover transform group-hover/screen:scale-105 transition-transform duration-700"
                            />
                          );
                        }
                        return (
                          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black overflow-hidden flex items-center justify-center relative">
                             <img src={product.media} className="w-full h-full object-cover opacity-60 transform group-hover/screen:scale-105 transition-transform duration-700" alt={product.name.en} />
                             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                               <Play size={48} className="text-white/50 group-hover/screen:text-cinema-red group-hover/screen:scale-110 transition-all duration-300" />
                             </div>
                          </div>
                        );
                     })()}
                   </div>
                </div>
              </div>
            );
          })}
          
          {/* And More / Custom Solutions Indicator */}
          <div className="pt-32 text-center animate-fade-in-up">
            <div 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-cinema-red/10 hover:border-cinema-red/50 transition-all duration-500 cursor-pointer group"
            >
              <div className="w-2 h-2 rounded-full bg-cinema-red animate-pulse"></div>
              <span className="text-gray-300 font-medium text-lg lg:text-xl group-hover:text-white transition-colors">
                {language === 'ar' ? 'والمزيد... حلول ذكية مخصصة لجميع القطاعات' : 'And More... Custom AI Solutions for Every Sector'}
              </span>
              <ArrowUpRight className={`w-5 h-5 text-cinema-red group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isRtl ? 'rotate-[-90deg]' : ''}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
