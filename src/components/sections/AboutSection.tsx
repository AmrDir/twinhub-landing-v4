import { Award, Users, Clock, Target, Brain, Globe, Camera, Palette } from 'lucide-react';
import MediaBackground from '../common/MediaBackground';

interface AboutSectionProps {
  language: string;
}

const stats = [
  { icon: Award, value: '150+', labelEn: 'Projects Completed', labelAr: 'مشروع مكتمل' },
  { icon: Users, value: '60+', labelEn: 'Happy Clients', labelAr: 'عميل سعيد' },
  { icon: Clock, value: '20+', labelEn: 'Years Experience', labelAr: 'سنة خبرة' },
  { icon: Target, value: '99%', labelEn: 'Client Satisfaction', labelAr: 'رضا العملاء' }
];

const services = [
  { nameEn: 'Video Production for Business', nameAr: 'إنتاج الفيديو للأعمال', icon: Camera },
  { nameEn: 'Artificial Intelligence Center', nameAr: 'مركز الذكاء الاصطناعي', icon: Brain },
  { nameEn: 'TV Commercial Ads', nameAr: 'إعلانات تلفزيونية', icon: Globe },
  { nameEn: 'Corporate Videos', nameAr: 'فيديوهات مؤسسية', icon: Camera },
  { nameEn: 'Documentary Film', nameAr: 'أفلام وثائقية', icon: Camera },
  { nameEn: 'Animation Videos', nameAr: 'فيديوهات متحركة', icon: Palette },
  { nameEn: 'Copyright & Music', nameAr: 'حقوق الطبع والموسيقى', icon: Award },
  { nameEn: 'Fashion Design', nameAr: 'تصميم الأزياء', icon: Palette },
  { nameEn: 'Exhibition & Events', nameAr: 'المعارض والفعاليات', icon: Users },
  { nameEn: 'Branding & Design', nameAr: 'العلامة التجارية والتصميم', icon: Palette },
  { nameEn: 'Photography Production', nameAr: 'إنتاج التصوير الفوتوغرافي', icon: Camera },
  { nameEn: 'AI and Innovation Department', nameAr: 'قسم الذكاء الاصطناعي والابتكار', icon: Brain }
];

export default function AboutSection({ language }: AboutSectionProps) {
  const content = {
    en: {
      title: 'TwinHub Media & AI Center',
      description: 'TwinHub Agency: We keep pace with the latest developments in the world of advertising and artificial intelligence, offering you creative design and implementation, with speed, high quality, and competitive prices.',
      aboutText: 'At TwinHub Agency, we work together to provide you with superior advertising creativity to communicate your services and products to your clients in the best possible way.',
      locationText: 'We are based in Egypt, the most creative, diverse, and entertaining country in the region. It\'s no surprise that we take as much pride in our work as we do in our origins.',
      visionTitle: 'Our Vision',
      visionText: 'We offer integrated media production, smart, results-oriented solutions, and to be one of the most influential companies in delivering high-quality, intelligent content across all media.',
      missionTitle: 'Our Mission',
      missionText: 'We strive to deliver high-quality content. As pioneers, we have contributed to the success of the largest companies by setting measurable, achievable, and realistic marketing goals. That\'s why we\'re the best.',
      whatWeDoTitle: 'What We Do',
      whatWeDoSubtitle: 'We\'re not just an agency, we\'re a trusted partner',
      aiDepartmentTitle: 'AI and Innovation Department',
      aiDepartmentText: 'The department focuses on using artificial intelligence to develop practical and innovative solutions covering multiple fields, with emphasis on the department\'s ability to innovate and apply AI effectively and sustainably within the company.'
    },
    ar: {
      title: 'TwinHub Media & AI Center',
      description: 'وكالة TwinHub: نواكب أحدث التطورات في عالم الإعلان والذكاء الاصطناعي، ونقدم لك التصميم الإبداعي والتنفيذ، بسرعة وجودة عالية وأسعار تنافسية.',
      aboutText: 'في وكالة TwinHub، نعمل معًا لنقدم لك إبداعًا إعلانيًا متفوقًا لتوصيل خدماتك ومنتجاتك إلى عملائك بأفضل طريقة ممكنة.',
      locationText: 'نحن مقرنا في مصر، البلد الأكثر إبداعًا وتنوعًا وترفيهًا في المنطقة. ليس من المستغرب أننا نفخر بعملنا بقدر فخرنا بأصولنا.',
      visionTitle: 'رؤيتنا',
      visionText: 'نقدم إنتاج وسائط متكامل، حلول ذكية موجهة نحو النتائج، ولنكون واحدة من أكثر الشركات تأثيرًا في تقديم محتوى عالي الجودة وذكي عبر جميع الوسائط.',
      missionTitle: 'مهمتنا',
      missionText: 'نسعى لتقديم محتوى عالي الجودة. كرواد، ساهمنا في نجاح أكبر الشركات من خلال وضع أهداف تسويقية قابلة للقياس والتحقيق والواقعية. لهذا نحن الأفضل.',
      whatWeDoTitle: 'ما نقوم به',
      whatWeDoSubtitle: 'لسنا مجرد وكالة، نحن شريك موثوق',
      aiDepartmentTitle: 'قسم الذكاء الاصطناعي والابتكار',
      aiDepartmentText: 'الهدف من القسم الذي يتمحور حول استخدام الذكاء الاصطناعي لتطوير حلول عملية ومبتكرة تغطي مجالات متعددة، مع التركيز على قدرة القسم على الابتكار وتطبيق الذكاء الاصطناعي بشكل فعّال ومستدام داخل الشركة.'
    }
  };

  const t = content[language as keyof typeof content] || content.en;

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      <MediaBackground
        backgroundVideo="/backgrounds/clients/about-bg.mp4"
        overlayOpacity={0.90}
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
            {t.title.split(' ')[0]} <span className="text-red-600">{t.title.split(' ')[1] || 'TwinHub'}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={stat.labelEn}
              className={`text-center group cinematic-stat-item animate-fade-in-up`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-red-600' : index === 2 ? 'bg-green-600' : 'bg-yellow-500'}`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 transition-transform duration-500 group-hover:scale-110 group-hover:text-red-600">
                <span className="animate-countup">{stat.value}</span>
              </div>
              <div className="text-gray-600 font-medium">
                {language === 'ar' ? stat.labelAr : stat.labelEn}
              </div>
            </div>
          ))}
        </div>

        {/* About Us Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative">
            {/* Decorative HUB text */}
            <div className="absolute -top-8 -left-8 opacity-5 pointer-events-none">
              <img 
                src="/Twinhub Logo_Artboard 19.png"
                alt="Hub"
                className="h-24 w-auto"
              />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              {language === 'ar' ? 'حول وكالة TwinHub' : 'About TwinHub Media & AI Center'}
            </h3>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>{t.aboutText}</p>
              <p>{t.locationText}</p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/backgrounds/clients/about-bg.png"
              alt="TwinHub Media & AI Center"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-red-600 rounded-2xl flex items-center justify-center shadow-xl">
              <div className="text-white text-center">
                <div className="text-xl font-bold">20+</div>
                <div className="text-xs">{language === 'ar' ? 'سنة' : 'Years'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Target className="w-8 h-8 text-red-600 mr-3" />
              {t.visionTitle}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t.visionText}
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Award className="w-8 h-8 text-red-600 mr-3" />
              {t.missionTitle}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t.missionText}
            </p>
          </div>
        </div>

        {/* What We Do Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Palette className="w-10 h-10 text-red-600 drop-shadow-lg animate-spin-slow" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t.whatWeDoTitle}</h3>
            <p className="text-xl text-gray-600">{t.whatWeDoSubtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div 
                key={service.nameEn}
                className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg hover:border-red-200 transition-all duration-300 group cinematic-service-item"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-red-600 transition-colors duration-300">
                    <service.icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                    {language === 'ar' ? service.nameAr : service.nameEn}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}