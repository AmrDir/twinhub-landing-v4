import { ReactNode, useMemo } from 'react';
import { Play } from 'lucide-react';
import { getYoutubeVideoId } from '../../lib/utils';

interface MediaBackgroundProps {
  children: ReactNode;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  className?: string;
  showWatchButton?: boolean;
  youtubeUrl?: string;
  language?: string;
}

export default function MediaBackground({
  children,
  backgroundImage,
  backgroundVideo,
  overlay = true,
  overlayOpacity = 0.4,
  className = '',
  showWatchButton = false,
  youtubeUrl,
  language = 'en'
}: MediaBackgroundProps) {
  const isYoutubeBg = backgroundImage && getYoutubeVideoId(backgroundImage);
  const isYoutubeVideo = backgroundVideo && getYoutubeVideoId(backgroundVideo);
  
  const ytId = isYoutubeBg || isYoutubeVideo;

  return (
    <div className={`media-background-container ${className.includes('absolute') ? className : `relative ${className}`}`}>
      {/* Background Media */}
      {ytId ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId}&playsinline=1&rel=0&showinfo=0`}
            title="YouTube background"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] md:w-[120vw] md:h-[120vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ filter: 'brightness(1.2)' }}
          />
        </div>
      ) : backgroundVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : backgroundImage ? (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
      )}

      {/* Overlay with Cinematic Tint */}
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 to-[#00020A]/95"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className={`relative z-10 ${className.includes('h-full') ? 'h-full w-full' : ''}`}>
        {children}
        
        {/* Watch Full Video Option */}
        {showWatchButton && youtubeUrl && (
          <div className={`absolute bottom-10 ${language === 'ar' ? 'left-10' : 'right-10'} z-20 animate-fade-in`}>
            <a 
              href={youtubeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-black/40 hover:bg-cinema-red backdrop-blur-md border border-white/10 px-5 py-3 rounded-full transition-all duration-500 shadow-2xl"
            >
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-cinema-red transition-colors">
                <Play size={16} fill="currentColor" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white">
                {language === 'ar' ? 'مشاهدة الفيديو كاملاً' : 'Watch Full Video'}
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}