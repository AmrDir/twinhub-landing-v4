import { PRODUCTS_CONTENT } from '../../config/site.config';
import { useSiteData } from '../../context/SiteContext';
import MediaBackground from '../common/MediaBackground';
import { ArrowUpRight, Play } from 'lucide-react';
import { useRef } from 'react';
import { getYoutubeVideoId } from '../../lib/utils';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface ProductsSectionProps {
  language: string;
}

export default function ProductsSection({ language }: ProductsSectionProps) {
  const { products: dbProducts, settings } = useSiteData();
  const { ref, isVisible } = useScrollReveal();
  const defaultT = PRODUCTS_CONTENT;
  
  const bgMedia = settings?.products_bg_media || '/gallery/work22.jpg';
  const bgOpacity = settings?.products_bg_opacity ?? 0.88;
  
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
    <section id="products" ref={ref} className="relative bg-[#020617] py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05] shadow-[0_-1px_40px_rgba(0,112,255,0.05)]">
      <MediaBackground
        backgroundImage={bgMedia}
        overlayOpacity={bgOpacity}
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-cinema-red/15 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-blue-900/15 rounded-full blur-[150px]"></div>
      </div>
      
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#00020A] via-[#020617]/80 to-transparent z-10 pointer-events-none"></div>

      <div className={`max-w-7xl mx-auto relative z-10 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`text-center mb-32 space-y-8 ${isVisible ? 'animate-fade-in' : ''}`}>
           <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-cinema-red font-bold tracking-[0.3em] text-xs uppercase animate-pulse">
             <span className="w-2 h-2 rounded-full bg-cinema-red shadow-[0_0_10px_#E50914]"></span>
             {language === 'ar' ? 'مختبر الابتكار المستقبلي' : 'Future Innovation Lab'}
           </div>
           
           <h2 className="text-6xl lg:text-8xl font-bold text-white tracking-tighter leading-tight">
             {language === 'ar' ? (
               <>إعادة بلورة <span className="text-cinema-red">التواصل</span></>
             ) : (
               <>Re-Imagining <span className="text-cinema-red">Connection</span></>
             )}
           </h2>
           
           <p className="max-w-3xl mx-auto text-xl lg:text-2xl text-white/70 font-light leading-relaxed">
             {language === 'ar' 
               ? 'حيث يلتقي الإبداع البشري بكيانات الذكاء الاصطناعي لسد الفجوات وحل ما هو مفقود في عالم التواصل الرقمي.'
               : 'Where human creativity meets AI entities to bridge gaps and solve what is missing in the digital communication world.'
             }
           </p>
        </div>

        {settings?.products_showreel_url && (
          <div className={`mb-40 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="relative group rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(229,9,20,0.3)] bg-black/60 backdrop-blur-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none"></div>
              
              <div className="relative aspect-[21/9] w-full overflow-hidden">
                {(() => {
                  const ytId = getYoutubeVideoId(settings.products_showreel_url);
                  if (ytId) {
                    return (
                      <iframe
                        src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId}&playsinline=1&modestbranding=1&vq=hd1080`}
                        title="TwinHub Showreel"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 pointer-events-none object-cover"
                      />
                    );
                  }
                  return (
                    <video 
                      src={settings.products_showreel_url}
                      autoPlay muted loop playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]"
                    />
                  );
                })()}
                
                <div className="absolute top-10 right-10 z-20 flex flex-col gap-3 items-end">
                  <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white font-mono tracking-widest text-xs uppercase animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-cinema-red"></div>
                    <span>Featured Showcase</span>
                  </div>
                  
                  <a 
                    href={settings.products_showreel_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-cinema-red hover:bg-cinema-red-hover text-white transition-all duration-300 shadow-xl"
                  >
                    <Play size={16} fill="currentColor" />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      {language === 'ar' ? 'مشاهدة العرض كاملاً' : 'Watch Full Showreel'}
                    </span>
                  </a>
                </div>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-10 z-20 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <h4 className="text-3xl lg:text-4xl font-bold text-white mb-2">Our Vision in Motion</h4>
                  <p className="text-gray-300 font-light text-lg">Experience the power of TwinHub platforms and cinematic engineering solutions.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="relative space-y-24 pb-24">
          {t.products.map((product, index) => (
            <ProductCard 
              key={product.id}
              product={product}
              index={index}
              total={t.products.length}
              language={language}
              isRtl={isRtl}
            />
          ))}
          
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

interface ProductCardProps {
  product: any;
  index: number;
  total: number;
  language: string;
  isRtl: boolean;
}

function ProductCard({ product, index, total, language, isRtl }: ProductCardProps) {
  const { ref, isVisible } = useScrollReveal();
  const productColors = [
    { border: 'border-cinema-red/30', bg: 'bg-cinema-red/5', glow: 'shadow-[0_0_50px_rgba(229,9,20,0.1)]', theme: 'cinema-red' },
    { border: 'border-electric-blue/30', bg: 'bg-electric-blue/5', glow: 'shadow-[0_0_50px_rgba(59,130,246,0.1)]', theme: 'electric-blue' },
    { border: 'border-fusion-teal/30', bg: 'bg-fusion-teal/5', glow: 'shadow-[0_0_50px_rgba(13,148,136,0.1)]', theme: 'fusion-teal' },
  ];
  const color = productColors[index % productColors.length];

  return (
    <div
      ref={ref}
      className={`sticky top-24 sm:top-32 lg:top-40 w-full min-h-[60vh] sm:min-h-[75vh] rounded-[3rem] border ${color.border} bg-[#0F172A]/40 backdrop-blur-3xl overflow-hidden ${color.glow} transition-all duration-700`}
      style={{
         zIndex: index * 10,
         transform: `scale(${1 - (total - 1 - index) * (typeof window !== 'undefined' && window.innerWidth < 768 ? 0.02 : 0.04)}) translateY(-${(total - 1 - index) * (typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 20)}px)`,
         transformOrigin: 'top center',
      }}
    >
      <div className={`flex flex-col lg:flex-row w-full h-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className={`absolute -top-24 -right-24 w-96 h-96 blur-[120px] pointer-events-none rounded-full ${
          color.theme === 'cinema-red' ? 'bg-cinema-red/10' : 
          color.theme === 'electric-blue' ? 'bg-blue-600/10' : 'bg-teal-500/10'
        }`}></div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
        <div className={`p-12 lg:p-20 flex flex-col justify-center w-full lg:w-1/2 ${isRtl ? 'order-2 lg:order-2 text-right' : 'order-2 lg:order-1'}`}>
          <div className="mb-6">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className={`inline-block px-4 py-1.5 rounded-full border ${color.border} ${color.bg} ${
                color.theme === 'cinema-red' ? 'text-cinema-red-light' : 
                color.theme === 'electric-blue' ? 'text-blue-400' : 'text-teal-400'
              } text-xs font-bold tracking-widest uppercase`}>
                0{index + 1} / {language === 'ar' ? 'منصة ذكاء اصطناعي' : 'AI Platform'}
              </span>
              {index >= total - 3 && (
                <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-white text-xs font-bold tracking-widest uppercase animate-pulse">
                  {language === 'ar' ? 'رؤية مستقبلية' : 'Future Horizon'}
                </span>
              )}
            </div>
            <h3 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {product.name[language as keyof typeof product.name]}
            </h3>
            <p className="text-xl text-gray-300 font-light leading-relaxed mb-10 group-hover:text-white transition-colors">
              {product.description[language as keyof typeof product.description]}
            </p>
          </div>
          
          <ul className="space-y-4 mb-12 text-gray-300">
            {product.features[language as keyof typeof product.features].map((feat: string, idx: number) => (
              <li key={idx} className="flex items-center gap-4 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-cinema-red shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                <span className="font-medium text-lg">{feat}</span>
              </li>
            ))}
          </ul>
          
          <a href={product.link} className="group flex items-center justify-center gap-3 bg-white text-black px-8 py-5 rounded-2xl font-bold text-lg w-fit hover:bg-cinema-red hover:text-white transition-all duration-500 shadow-xl">
            <span>{language === 'ar' ? 'اكتشف المنصة' : 'Explore Platform'}</span>
            <ArrowUpRight className={`w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
          </a>
        </div>

        <div className={`relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-full flex items-center justify-center p-8 lg:p-16 ${isRtl ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-cinema-red/20 blur-[100px] pointer-events-none"></div>
          
          <div className="relative w-full aspect-video rounded-2xl border-[8px] sm:border-[12px] border-black/95 bg-black overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] ring-1 ring-white/20 z-10 group/screen">
            <div className="absolute inset-0 bg-gradient-to-tr from-cinema-red/5 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#1a1a1a] rounded-b-lg z-20 pointer-events-none"></div>
            
            {index >= total - 3 && (
              <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                <div className="px-6 py-2 border border-white/20 bg-black/40 backdrop-blur-md rounded-full text-white/40 text-[10px] uppercase tracking-[0.5em] font-bold">
                  {language === 'ar' ? 'مفهوم مستقبلي' : 'Future Concept'}
                </div>
              </div>
            )}

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
    </div>
  );
}
