import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X, Play, Maximize2 } from 'lucide-react';
import MediaBackground from '../common/MediaBackground';

interface GalleryItem {
  src: string;
  type: 'image' | 'video';
  alt?: string;
  category?: string;
}

interface GallerySectionProps {
  language: string;
}

// جميع ملفات المعرض المتاحة
const galleryItems: GalleryItem[] = [
  { src: '/gallery/work0.jpg', type: 'image', alt: 'Creative Work', category: 'all' },
  { src: '/gallery/work1.jpg', type: 'image', alt: 'Brand Campaign', category: 'branding' },
  { src: '/gallery/work2.jpg', type: 'image', alt: 'Photography', category: 'photography' },
  { src: '/gallery/work3.mp4', type: 'video', alt: 'Video Production', category: 'video' },
  { src: '/gallery/work4.jpg', type: 'image', alt: 'Commercial Shoot', category: 'photography' },
  { src: '/gallery/work5.mp4', type: 'video', alt: 'Motion Graphics', category: 'video' },
  { src: '/gallery/work6.jpg', type: 'image', alt: 'Event Coverage', category: 'events' },
  { src: '/gallery/work7.jpg', type: 'image', alt: 'Product Photography', category: 'photography' },
  { src: '/gallery/work8.jpg', type: 'image', alt: 'Brand Identity', category: 'branding' },
  { src: '/gallery/work9.jpg', type: 'image', alt: 'Creative Design', category: 'branding' },
  { src: '/gallery/work10.jpg', type: 'image', alt: 'Social Media', category: 'branding' },
  { src: '/gallery/work11.jpg', type: 'image', alt: 'Corporate Event', category: 'events' },
  { src: '/gallery/work12.jpg', type: 'image', alt: 'Fashion Shoot', category: 'photography' },
  { src: '/gallery/work13.jpg', type: 'image', alt: 'Documentary', category: 'video' },
  { src: '/gallery/work14.jpg', type: 'image', alt: 'Advertising', category: 'branding' },
  { src: '/gallery/work15.jpg', type: 'image', alt: 'Exhibition', category: 'events' },
  { src: '/gallery/work16.jpg', type: 'image', alt: 'Portrait Photography', category: 'photography' },
  { src: '/gallery/work17.jpg', type: 'image', alt: 'Campaign Visuals', category: 'branding' },
  { src: '/gallery/work18.jpg', type: 'image', alt: 'Creative Content', category: 'branding' },
  { src: '/gallery/work19.jpg', type: 'image', alt: 'Media Production', category: 'video' },
  { src: '/gallery/work20.jpg', type: 'image', alt: 'Brand Shoot', category: 'photography' },
  { src: '/gallery/work21.jpg', type: 'image', alt: 'Art Direction', category: 'branding' },
  { src: '/gallery/work22.jpg', type: 'image', alt: 'Visual Campaign', category: 'branding' },
  { src: '/gallery/work23.jpg', type: 'image', alt: 'Commercial Ad', category: 'video' },
  { src: '/gallery/work24.jpg', type: 'image', alt: 'Event Design', category: 'events' },
  { src: '/gallery/work25.jpg', type: 'image', alt: 'Creative Production', category: 'photography' },
  { src: '/gallery/work26.jpg', type: 'image', alt: 'Brand Story', category: 'branding' },
  { src: '/gallery/work27.jpg', type: 'image', alt: 'Graphic Design', category: 'branding' },
  { src: '/gallery/work28.jpg', type: 'image', alt: 'Film Production', category: 'video' },
  { src: '/gallery/work29.jpg', type: 'image', alt: 'Photography Studio', category: 'photography' },
  { src: '/gallery/work30.jpg', type: 'image', alt: 'Campaign Production', category: 'branding' },
  { src: '/gallery/work31.jpg', type: 'image', alt: 'Digital Content', category: 'branding' },
  { src: '/gallery/work32.jpg', type: 'image', alt: 'Visual Story', category: 'photography' },
  { src: '/gallery/work33.jpg', type: 'image', alt: 'Creative Direction', category: 'branding' },
  { src: '/gallery/work34.mp4', type: 'video', alt: 'Promo Video', category: 'video' },
  { src: '/gallery/work35.mp4', type: 'video', alt: 'Behind the Scenes', category: 'video' },
];

const ITEMS_PER_PAGE = 12;

export default function GallerySection({ language }: GallerySectionProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const content = {
    en: {
      title: 'Our',
      titleHighlight: 'Gallery',
      subtitle: 'A cinematic showcase of our creative work and productions',
      filters: {
        all: 'All Works',
        video: 'Video',
        photography: 'Photography',
        branding: 'Branding',
        events: 'Events',
      },
      loadMore: 'Load More',
      featured: 'Featured Work',
    },
    ar: {
      title: 'معرض',
      titleHighlight: 'أعمالنا',
      subtitle: 'عرض سينمائي لأعمالنا الإبداعية وإنتاجاتنا',
      filters: {
        all: 'جميع الأعمال',
        video: 'فيديو',
        photography: 'تصوير',
        branding: 'هوية بصرية',
        events: 'فعاليات',
      },
      loadMore: 'عرض المزيد',
      featured: 'أعمال مميزة',
    },
  };

  const t = content[language as keyof typeof content] || content.en;

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const visibleItems = filteredItems.slice(0, visibleCount);

  // Featured carousel (أول 6 عناصر)
  const featuredItems = galleryItems.slice(0, 6);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredItems.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [featuredItems.length]);

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeFilter]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxIndex === null) return;
    const total = visibleItems.length;
    if (direction === 'next') {
      setLightboxIndex((lightboxIndex + 1) % total);
    } else {
      setLightboxIndex((lightboxIndex - 1 + total) % total);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const total = visibleItems.length;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setLightboxIndex((lightboxIndex + 1) % total);
      if (e.key === 'ArrowLeft') setLightboxIndex((lightboxIndex - 1 + total) % total);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, visibleItems.length]);

  return (
    <section id="gallery" className="py-20 bg-black relative overflow-hidden">
      <MediaBackground
        backgroundImage="/backgrounds/clients/clients-bg.jpg"
        overlayOpacity={0.90}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>
      </MediaBackground>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t.title} <span className="text-red-600">{t.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Featured Carousel */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">{t.featured}</h3>
          <div className="relative h-[400px] sm:h-[500px] max-w-4xl mx-auto rounded-2xl overflow-hidden">
            {featuredItems.map((item, idx) => (
              <div
                key={item.src}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out cursor-pointer ${
                  idx === featuredIndex ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-95 z-10'
                }`}
                onClick={() => openLightbox(galleryItems.indexOf(item))}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-lg font-semibold">{item.alt}</p>
                  {item.type === 'video' && (
                    <div className="flex items-center gap-2 mt-2 text-red-400">
                      <Play size={16} /> <span className="text-sm">Video</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* Dots navigation */}
            <div className="absolute bottom-4 right-6 flex gap-2 z-30">
              {featuredItems.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === featuredIndex ? 'bg-red-600 w-8' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  onClick={() => setFeaturedIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.entries(t.filters).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeFilter === key
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white backdrop-blur-sm'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleItems.map((item, idx) => (
            <div
              key={item.src}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer transform hover:scale-[1.02] transition-all duration-500"
              onClick={() => openLightbox(idx)}
            >
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              ) : (
                <video
                  src={item.src}
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                  onMouseOut={(e) => { const v = e.target as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
                />
              )}
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.type === 'video' ? (
                    <Play className="w-10 h-10 text-white drop-shadow-lg" />
                  ) : (
                    <Maximize2 className="w-8 h-8 text-white drop-shadow-lg" />
                  )}
                </div>
              </div>
              {/* Video badge */}
              {item.type === 'video' && (
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  ▶ Video
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filteredItems.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
              className="px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              {t.loadMore} ({filteredItems.length - visibleCount} {language === 'ar' ? 'متبقي' : 'remaining'})
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && visibleItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button
            className="absolute top-6 right-6 text-white hover:text-red-400 transition-colors z-50"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-red-400 transition-colors z-50 bg-black/50 p-3 rounded-full"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
          >
            <ChevronLeft size={28} />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-red-400 transition-colors z-50 bg-black/50 p-3 rounded-full"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
          >
            <ChevronRight size={28} />
          </button>

          <div className="max-w-5xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            {visibleItems[lightboxIndex].type === 'image' ? (
              <img
                src={visibleItems[lightboxIndex].src}
                alt={visibleItems[lightboxIndex].alt}
                className="w-full h-full max-h-[85vh] object-contain rounded-lg"
              />
            ) : (
              <video
                src={visibleItems[lightboxIndex].src}
                autoPlay
                controls
                loop
                className="w-full h-full max-h-[85vh] object-contain rounded-lg"
              />
            )}
            <p className="text-center text-gray-400 mt-4 text-sm">
              {visibleItems[lightboxIndex].alt} — {lightboxIndex + 1} / {visibleItems.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
