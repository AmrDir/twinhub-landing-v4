import { ReactNode, useMemo } from 'react';
import { getYoutubeVideoId } from '../../lib/utils';

interface MediaBackgroundProps {
  children: ReactNode;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  className?: string;
}

export default function MediaBackground({
  children,
  backgroundImage,
  backgroundVideo,
  overlay = true,
  overlayOpacity = 0.4,
  className = ''
}: MediaBackgroundProps) {
  const isYoutubeBg = backgroundImage && getYoutubeVideoId(backgroundImage);
  const isYoutubeVideo = backgroundVideo && getYoutubeVideoId(backgroundVideo);
  
  const ytId = isYoutubeBg || isYoutubeVideo;

  return (
    <div className={className.includes('absolute') ? className : `relative ${className}`}>
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

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className={`relative z-10 ${className.includes('h-full') ? 'h-full w-full' : ''}`}>
        {children}
      </div>
    </div>
  );
}