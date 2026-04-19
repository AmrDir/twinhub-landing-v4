import { Brain, Zap, Film, Palette, Target, ArrowRight } from 'lucide-react';
import MediaBackground from '../common/MediaBackground';

interface AISectionProps {
  language: string;
}

export default function AISection({ language }: AISectionProps) {
  const content = {
    en: {
      title: 'Revolutionizing Film and Advertising Production with AI',
      subtitle: 'A Bridge Between Art and Technology',
      description: 'Empowering businesses to craft compelling visual stories - combining AI technology with traditional filmmaking, at a fraction of the cost.',
      cta: 'Explore Our Solutions',
      foundedText: 'Founded by a group of filmmakers passionate about innovation, TwinHub combines traditional filmmaking expertise with cutting-edge AI technology.',
      missionText: 'Our mission is to provide businesses with content that enhances creativity rather than replaces it, making high-quality production accessible to everyone.',
      features: [
        {
          icon: Brain,
          title: 'AI-Powered Creativity',
          description: 'Intelligent content generation that amplifies human creativity'
        },
        {
          icon: Film,
          title: 'Smart Production',
          description: 'Streamlined workflows that reduce costs without compromising quality'
        },
        {
          icon: Palette,
          title: 'Creative Enhancement',
          description: 'AI tools that enhance artistic vision rather than replace it'
        },
        {
          icon: Target,
          title: 'Precision Marketing',
          description: 'Data-driven insights for maximum campaign effectiveness'
        }
      ]
    },
    ar: {
      title: 'ثورة في إنتاج الأفلام والإعلانات بالذكاء الاصطناعي',
      subtitle: 'جسر بين الفن والتكنولوجيا',
      description: 'تمكين الشركات من صياغة قصص بصرية مقنعة - دمج تقنية الذكاء الاصطناعي مع صناعة الأفلام التقليدية، بجزء من التكلفة.',
      cta: 'استكشف حلولنا',
      foundedText: 'تأسست من قبل مجموعة من صانعي الأفلام المتحمسين للابتكار، تجمع TwinHub بين خبرة صناعة الأفلام التقليدية وتقنية الذكاء الاصطناعي المتطورة.',
      missionText: 'مهمتنا هي تزويد الشركات بمحتوى يعزز الإبداع بدلاً من استبداله، مما يجعل الإنتاج عالي الجودة في متناول الجميع.',
      features: [
        {
          icon: Brain,
          title: 'إبداع مدعوم بالذكاء الاصطناعي',
          description: 'توليد محتوى ذكي يضخم الإبداع البشري'
        },
        {
          icon: Film,
          title: 'إنتاج ذكي',
          description: 'سير عمل مبسط يقلل التكاليف دون المساس بالجودة'
        },
        {
          icon: Palette,
          title: 'تعزيز الإبداع',
          description: 'أدوات ذكاء اصطناعي تعزز الرؤية الفنية بدلاً من استبدالها'
        },
        {
          icon: Target,
          title: 'تسويق دقيق',
          description: 'رؤى مدفوعة بالبيانات لأقصى فعالية للحملة'
        }
      ]
    }
  };

  const t = content[language as keyof typeof content] || content.en;

  return (
    <section id="ai" className="relative overflow-hidden">
      <MediaBackground
        backgroundImage="/backgrounds/clients/ai-bg.png"
        overlayOpacity={0.7}
        className="py-20"
      >
        {/* Cinematic Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black/40 to-gray-900/60"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Brain className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              {t.title}
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t.description}
            </p>
            
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              {t.cta}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          {/* Bridge Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
              "{t.subtitle}"
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl">
                <p className="text-gray-200 leading-relaxed text-lg">
                  {t.foundedText}
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl">
                <p className="text-gray-200 leading-relaxed text-lg">
                  {t.missionText}
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.features.map((feature, index) => (
              <div
                key={feature.title}
                className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-700 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Innovation Department */}
          <div className="mt-20 bg-gradient-to-r from-red-600/20 to-black/20 backdrop-blur-md p-12 rounded-3xl text-center">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              {language === 'ar' ? 'قسم الذكاء الاصطناعي والابتكار' : 'AI and Innovation Department'}
            </h3>
            
            <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto text-lg">
              {language === 'ar' 
                ? 'الهدف من القسم الذي يتمحور حول استخدام الذكاء الاصطناعي لتطوير حلول عملية ومبتكرة تغطي مجالات متعددة، مع التركيز على قدرة القسم على الابتكار وتطبيق الذكاء الاصطناعي بشكل فعّال ومستدام داخل الشركة.'
                : 'The department focuses on using artificial intelligence to develop practical and innovative solutions covering multiple fields, with emphasis on the department\'s ability to innovate and apply AI effectively and sustainably within the company.'
              }
            </p>
          </div>
        </div>
      </MediaBackground>
    </section>
  );
}