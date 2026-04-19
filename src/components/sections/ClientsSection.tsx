import { CLIENTS_CONTENT } from '../../config/site.config';

interface ClientsSectionProps {
  language: string;
}

export default function ClientsSection({ language }: ClientsSectionProps) {
  const t = CLIENTS_CONTENT[language as keyof typeof CLIENTS_CONTENT] || CLIENTS_CONTENT.en;
  
  // مضاعفة الشعارات لضمان وجود حلقة مستمرة بدون فراغات
  const doubleLogos = [...CLIENTS_CONTENT.logos, ...CLIENTS_CONTENT.logos];

  return (
    <section id="clients" className="relative py-24 bg-black overflow-hidden border-t border-white/5">
      {/* Background cinematic depth */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0A0A0A]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            {t.title}
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Infinite Marquee Section */}
        <div className="relative py-10 overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-black before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-black after:to-transparent">
          <div className="flex gap-16 animate-infinite-scroll hover:pause-animation items-center">
            {doubleLogos.map((img, idx) => (
              <div 
                key={`${img}-${idx}`} 
                className="flex-shrink-0 group relative"
              >
                <div className="bg-white/5 border border-white/5 p-6 rounded-2xl transition-all duration-500 group-hover:bg-white/[0.08] group-hover:border-red-500/20 group-hover:scale-110">
                  <img
                    src={`/backgrounds/clients/${img}`}
                    alt="Client Logo"
                    className="h-14 w-auto object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global CSS for Infinite Scroll Performance */}
      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          display: flex;
          width: max-content;
          animation: infinite-scroll 40s linear infinite;
        }
        .pause-animation {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}