import { ReactNode } from 'react';

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
  return (
    <div className={`relative ${className}`}>
      {/* Background Media */}
      {backgroundVideo ? (
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
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}