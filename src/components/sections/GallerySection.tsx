import { useEffect, useRef, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X, Play, Maximize2 } from 'lucide-react';
import MediaBackground from '../common/MediaBackground';
import { GALLERY_CONTENT } from '../../config/site.config';
import { useSiteData } from '../../context/SiteContext';
import { getYoutubeVideoId } from '../../lib/utils';

interface GallerySectionProps {
  language: string;
}

/**
 * Interactive Tilt Card Component
 * Creates a 3D effect based on mouse position
 */
function InteractiveCard({ item, onClick, index }: { item: any, onClick: () => void, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-300 ease-out"
      style={{
        perspective: '1200px',
        transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        boxShadow: rotate.x !== 0 || rotate.y !== 0 
          ? `${-rotate.y}px ${rotate.x}px 30px rgba(0,0,0,0.5)` 
          : '0 10px 20px rgba(0,0,0,0.3)'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="inner-glow"></div>
      {/* Glow highlight */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {item.type === 'image' ? (
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
      ) : item.type === 'video' ? (
        <div className="relative w-full h-full bg-gray-900 overflow-hidden">
          {(() => {
            const ytId = getYoutubeVideoId(item.src);
            if (ytId) {
              return (
                <div className="w-full h-full overflow-hidden pointer-events-none relative">
                   <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 opacity-80" alt={item.alt} />
                </div>
              );
            }
            return (
              <video
                src={item.src}
                className="w-full h-full object-cover opacity-80 transform scale-105 group-hover:scale-110 transition-transform duration-700"
                muted
                loop
                playsInline
                autoPlay
              />
            );
          })()}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-cinema-red transition-all duration-300">
              <Play className="text-white ml-1" size={24} />
            </div>
          </div>
        </div>
      ) : null}

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex flex-col justify-end p-6">
        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white font-bold text-lg mb-1">{item.alt}</p>
          <p className="text-cinema-red-light text-xs tracking-widest uppercase">{item.category}</p>
        </div>
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
           {item.type === 'video' ? <Play className="text-white" size={24} /> : <Maximize2 className="text-white" size={20} />}
        </div>
      </div>

      {/* Video badge */}
      {item.type === 'video' && (
        <div className="absolute top-4 left-4 bg-cinema-red/90 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
          Motion
        </div>
      )}
    </div>
  );
}

const ITEMS_PER_PAGE = 8;

export default function GallerySection({ language }: GallerySectionProps) {
  const { gallery: dbGallery, settings } = useSiteData();
  const t = GALLERY_CONTENT[language as keyof typeof GALLERY_CONTENT] || GALLERY_CONTENT.en;
  const isRtl = language === 'ar';
  
  // Construct final gallery items array (deduplicate by src to guard against duplicate DB rows)
  const activeGallery = useMemo(() => {
    const raw = dbGallery.length > 0 ? dbGallery.map(g => ({
      src: g.media,
      type: g.media_type,
      category: g.category,
      alt: g.alt_text
    })) : GALLERY_CONTENT.items;
    const seen = new Set<string>();
    return raw.filter(item => seen.has(item.src) ? false : (seen.add(item.src), true));
  }, [dbGallery]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const filteredItems = useMemo(() => {
    return activeFilter === 'all'
      ? activeGallery
      : activeGallery.filter(item => item.category === activeFilter);
  }, [activeFilter, activeGallery]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const featuredItems = activeGallery.slice(0, 5);

  // Auto-slide for featured
  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % featuredItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredItems.length]);

  return (
    <section id="gallery" className="py-24 bg-black relative overflow-hidden">
      <MediaBackground
        backgroundImage={settings?.gallery_bg_media || "/backgrounds/clients/clients-bg.jpg"}
        overlayOpacity={settings?.gallery_bg_opacity ?? 0.92}
        className="absolute inset-0"
      />
      
      {/* Ambient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-cinema-red/6 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-fusion-teal/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Visual Rhythm */}
        <div className="text-center mb-24 animate-fade-in">
          <h2 className="text-5xl sm:text-8xl font-bold text-white mb-8 tracking-tighter leading-none">
            {isRtl ? (
              <>{t.title} <span className="text-cinema-red">{t.titleHighlight}</span></>
            ) : (
              <>{t.title} <span className="text-cinema-red">{t.titleHighlight}</span></>
            )}
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed opacity-95">
            {t.subtitle}
          </p>
        </div>

        {/* Featured Showcase (Cinematic Large View) */}
        <div className="mb-32 group/gallery relative">
           {/* Layered Shadow for depth */}
           <div className="absolute -inset-4 bg-cinema-red/5 blur-3xl rounded-[4rem] -z-10"></div>
           <div className="relative aspect-[3/4] sm:aspect-video lg:aspect-[21/9] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10">
              {featuredItems.map((item, idx) => (
                <div
                  key={`featured-${idx}`}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    idx === featuredIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img src={item.src} className="w-full h-full object-cover" alt="Featured" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
              <div className="absolute bottom-10 left-10 z-20">
                <p className="text-cinema-red font-bold uppercase tracking-widest text-sm mb-2">{t.featured}</p>
                <h4 className="text-3xl text-white font-bold">{featuredItems[featuredIndex]?.alt}</h4>
              </div>
              
              <div className="absolute bottom-10 right-10 z-20 flex gap-2">
                {featuredItems.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1 transition-all duration-500 rounded-full ${idx === featuredIndex ? 'w-8 bg-cinema-red' : 'w-2 bg-white/20'}`} 
                  />
                ))}
              </div>
           </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {Object.entries(t.filters).map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setActiveFilter(key); setVisibleCount(ITEMS_PER_PAGE); }}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-500 ${
                activeFilter === key
                  ? 'bg-cinema-red text-white shadow-lg shadow-cinema-red/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleItems.map((item, idx) => (
            <div 
              key={`${item.src}-${idx}`}
              className={idx % 5 === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
            >
               <InteractiveCard 
                  item={item} 
                  index={idx}
                  onClick={() => setLightboxIndex(filteredItems.indexOf(item))} 
               />
            </div>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filteredItems.length && (
          <div className="text-center mt-20">
            <button
              onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
              className="group relative px-12 py-5 bg-white text-black font-bold rounded-2xl hover:bg-cinema-red hover:text-white transition-all duration-500"
            >
              <span className="relative z-10">
                {t.loadMore} ({filteredItems.length - visibleCount} {t.remaining})
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Implementation */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-6 backdrop-blur-xl animate-fade-in" onClick={() => setLightboxIndex(null)}>
          <button className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors" onClick={() => setLightboxIndex(null)}>
            <X size={40} />
          </button>
          
          <div className="relative max-w-6xl w-full aspect-video rounded-3xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
             {(() => {
                const item = filteredItems[lightboxIndex];
                if (item.type === 'image') {
                   return <img src={item.src} className="w-full h-full object-contain" alt={item.alt} />;
                }
                const ytId = getYoutubeVideoId(item.src);
                if (ytId) {
                   return (
                     <iframe
                       src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&showinfo=0`}
                       title={item.alt}
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                       className="w-full h-full"
                       allowFullScreen
                     />
                   );
                }
                return <video src={item.src} controls autoPlay className="w-full h-full" />;
             })()}
          </div>

          <button 
            className="absolute left-10 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
            onClick={e => { e.stopPropagation(); setLightboxIndex(prev => prev! > 0 ? prev! - 1 : filteredItems.length - 1) }}
          >
            <ChevronLeft size={32} />
          </button>

          <button 
            className="absolute right-10 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
            onClick={e => { e.stopPropagation(); setLightboxIndex(prev => (prev! + 1) % filteredItems.length) }}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </section>
  );
}
