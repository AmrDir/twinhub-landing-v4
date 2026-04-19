import { Camera, Video, Palette } from 'lucide-react';
import { Brain, Users, Award } from 'lucide-react';
import MediaBackground from '../common/MediaBackground';

interface ServicesSectionProps {
  language: string;
}

export default function ServicesSection({ language }: ServicesSectionProps) {
  const content = {
    en: {
      title: 'Our Services',
      subtitle: 'We offer comprehensive creative media production services tailored to bring your vision to life with professional excellence and artistic innovation.',
      learnMore: 'Learn More',
      services: [
        {
          icon: Brain,
          title: 'Artificial Intelligence Center',
          description: 'Cutting-edge AI solutions for modern advertising and media production, delivering smart and innovative results.',
          features: ['AI Content Creation', 'Smart Analytics', 'Automated Production', 'Innovation Solutions'],
          link: '/services/ai-center'
        },
        {
          icon: Video,
          title: 'Video Production for Business',
          description: 'Comprehensive video production services from corporate videos to TV commercials and documentaries.',
          features: ['Corporate Videos', 'TV Commercial Ads', 'Documentary Films', 'Animation Videos'],
          link: '/services/video-production'
        },
        {
          icon: Camera,
          title: 'Photography Production',
          description: 'Professional photography services capturing your brand essence with artistic excellence and technical precision.',
          features: ['Fashion Photography', 'Product Photography', 'Event Coverage', 'Corporate Portraits'],
          link: '/services/photography'
        },
        {
          icon: Palette,
          title: 'Branding & Design',
          description: 'Complete branding solutions including fashion design, visual identity, and creative marketing materials.',
          features: ['Brand Identity', 'Fashion Design', 'Logo Design', 'Marketing Materials'],
          link: '/services/branding'
        },
        {
          icon: Users,
          title: 'Exhibition & Events',
          description: 'Full-service event production and exhibition management with creative execution and flawless delivery.',
          features: ['Event Planning', 'Exhibition Design', 'Live Production', 'Event Photography'],
          link: '/services/events'
        },
        {
          icon: Award,
          title: 'Copyright & Music',
          description: 'Professional music production and copyright services to enhance your media with original soundtracks.',
          features: ['Original Music', 'Sound Design', 'Copyright Management', 'Audio Production'],
          link: '/services/music'
        }
      ]
    },
    ar: {
      title: 'خدماتنا',
      subtitle: 'نقدم خدمات إنتاج وسائط إبداعية شاملة مصممة لتحقيق رؤيتك بتميز مهني وابتكار فني.',
      learnMore: 'اعرف المزيد',
      services: [
        {
          icon: Brain,
          title: 'مركز الذكاء الاصطناعي',
          description: 'حلول ذكاء اصطناعي متطورة للإعلان الحديث وإنتاج الوسائط، تقدم نتائج ذكية ومبتكرة.',
          features: ['إنشاء محتوى بالذكاء الاصطناعي', 'تحليلات ذكية', 'إنتاج آلي', 'حلول الابتكار'],
          link: '/services/ai-center'
        },
        {
          icon: Video,
          title: 'إنتاج الفيديو للأعمال',
          description: 'خدمات إنتاج فيديو شاملة من الفيديوهات المؤسسية إلى الإعلانات التلفزيونية والأفلام الوثائقية.',
          features: ['فيديوهات مؤسسية', 'إعلانات تلفزيونية', 'أفلام وثائقية', 'فيديوهات متحركة'],
          link: '/services/video-production'
        },
        {
          icon: Camera,
          title: 'إنتاج التصوير الفوتوغرافي',
          description: 'خدمات تصوير احترافية تلتقط جوهر علامتك التجارية بتميز فني ودقة تقنية.',
          features: ['تصوير الأزياء', 'تصوير المنتجات', 'تغطية الأحداث', 'صور مؤسسية'],
          link: '/services/photography'
        },
        {
          icon: Palette,
          title: 'العلامة التجارية والتصميم',
          description: 'حلول علامة تجارية كاملة تشمل تصميم الأزياء والهوية البصرية والمواد التسويقية الإبداعية.',
          features: ['هوية العلامة التجارية', 'تصميم الأزياء', 'تصميم الشعار', 'مواد تسويقية'],
          link: '/services/branding'
        },
        {
          icon: Users,
          title: 'المعارض والفعاليات',
          description: 'إنتاج فعاليات متكامل وإدارة معارض مع تنفيذ إبداعي وتسليم لا تشوبه شائبة.',
          features: ['تخطيط الفعاليات', 'تصميم المعارض', 'إنتاج مباشر', 'تصوير الفعاليات'],
          link: '/services/events'
        },
        {
          icon: Award,
          title: 'حقوق الطبع والموسيقى',
          description: 'إنتاج موسيقي احترافي وخدمات حقوق الطبع لتعزيز وسائطك بموسيقى تصويرية أصلية.',
          features: ['موسيقى أصلية', 'تصميم الصوت', 'إدارة حقوق الطبع', 'إنتاج صوتي'],
          link: '/services/music'
        }
      ]
    }
  };

  const t = content[language as keyof typeof content] || content.en;

  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      <MediaBackground
        backgroundImage="/backgrounds/services/services-bg.jpg"
        overlayOpacity={0.95}
        className="absolute inset-0"
      >
        {/* Cinematic Elements */}
        <div className="absolute top-1/4 right-0 opacity-5 pointer-events-none decorative-pulse">
          <img 
            src="/Twinhub Logo_Artboard 17-3_Artboard 17_Artboard 17.png"
            alt="Decorative M"
            className="h-96 w-auto"
          />
        </div>
        
        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
      </MediaBackground>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {t.title.split(' ')[0]} <span className="text-red-600">{t.title.split(' ')[1] || 'Services'}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.map((service, index) => (
            <div 
              key={service.title}
              className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center group-hover:bg-red-700 transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover Effect */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors duration-200"
                >
                  {t.learnMore} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}