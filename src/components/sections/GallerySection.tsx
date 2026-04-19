import { useEffect, useRef, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X, Play, Maximize2 } from 'lucide-react';
import MediaBackground from '../common/MediaBackground';
import { GALLERY_CONTENT } from '../../config/site.config';

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
      className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-200 ease-out"
      style={{
        perspective: '1000px',
        transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Glow highlight */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {item.type === 'image' ? (
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
      ) : (
        <video
          src={item.src}
          muted
          playsInline
          className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
          onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
          onMouseOut={(e) => { const v = e.target as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
        />
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex flex-col justify-end p-6">
        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white font-bold text-lg mb-1">{item.alt}</p>
          <p className="text-red-500 text-xs tracking-widest uppercase">{item.category}</p>
        </div>
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
           {item.type === 'video' ? <Play className="text-white" size={24} /> : <Maximize2 className="text-white" size={20} />}
        </div>
      </div>

      {/* Video badge */}
      {item.type === 'video' && (
        <div className="absolute top-4 left-4 bg-red-600/90 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
          Motion
        </div>
      )}
    </div>
  );
}

const ITEMS_PER_PAGE = 8;

export default function GallerySection({ language }: GallerySectionProps) {
  const t = GALLERY_CONTENT[language as keyof typeof GALLERY_CONTENT] || GALLERY_CONTENT.en;
  const isRtl = language === 'ar';
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const filteredItems = useMemo(() => {
    return activeFilter === 'all'
      ? GALLERY_CONTENT.items
      : GALLERY_CONTENT.items.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const featuredItems = GALLERY_CONTENT.items.slice(0, 5);

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
        backgroundImage="/backgrounds/clients/clients-bg.jpg"
        overlayOpacity={0.96}
        className="absolute inset-0"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Visual Rhythm */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl sm:text-7xl font-bold text-white mb-6 tracking-tighter">
            {isRtl ? (
              <>{t.title} <span className="text-red-600">{t.titleHighlight}</span></>
            ) : (
              <>{t.title} <span className="text-red-600">{t.titleHighlight}</span></>
            )}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Featured Showcase (Cinematic Large View) */}
        <div className="mb-24 group/gallery">
           <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
              {featuredItems.map((item, idx) => (
                <div
                  key={item.src}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    idx === featuredIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img src={item.src} className="w-full h-full object-cover" alt="Featured" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
              <div className="absolute bottom-10 left-10 z-20">
                <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">{t.featured}</p>
                <h4 className="text-3xl text-white font-bold">{featuredItems[featuredIndex]?.alt}</h4>
              </div>
              
              <div className="absolute bottom-10 right-10 z-20 flex gap-2">
                {featuredItems.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1 transition-all duration-500 rounded-full ${idx === featuredIndex ? 'w-8 bg-red-600' : 'w-2 bg-white/20'}`} 
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
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
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
                  onClick={() => setLightboxIndex(GALLERY_CONTENT.items.indexOf(item))} 
               />
            </div>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filteredItems.length && (
          <div className="text-center mt-20">
            <button
              onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
              className="group relative px-12 py-5 bg-white text-black font-bold rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-500"
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
             {GALLERY_CONTENT.items[lightboxIndex].type === 'image' ? (
                <img src={GALLERY_CONTENT.items[lightboxIndex].src} className="w-full h-full object-contain" alt="Preview" />
             ) : (
                <video src={GALLERY_CONTENT.items[lightboxIndex].src} controls autoPlay className="w-full h-full" />
             )}
          </div>

          <button 
            className="absolute left-10 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
            onClick={e => { e.stopPropagation(); setLightboxIndex(prev => prev! > 0 ? prev! - 1 : GALLERY_CONTENT.items.length - 1) }}
          >
            <ChevronLeft size={32} />
          </button>

          <button 
            className="absolute right-10 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
            onClick={e => { e.stopPropagation(); setLightboxIndex(prev => (prev! + 1) % GALLERY_CONTENT.items.length) }}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </section>
  );
}
