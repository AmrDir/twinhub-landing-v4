// ============================================================
// TwinHub Config (Backup in my-project)
// ============================================================

// معلومات التواصل / Contact Info
export const CONTACT_INFO = {
  email: 'info@twinhub.net',
  phone: '01007197170',
  phone2: '+264355712',
  whatsapp: '201007197170',
  address: {
    en: '47 Nagib Al Rihani, Town Down, Cairo Governorate 4320210, Egypt',
    ar: '47 نجيب الريحاني، وسط البلد، محافظة القاهرة 4320210، مصر',
  },
  mapUrl: 'https://maps.google.com/?q=47+Nagib+Al+Rihani+Cairo+Egypt',
};

// روابط التواصل الاجتماعي / Social Links
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/twinhub.media.production/',
  facebook: 'https://www.facebook.com/Twinhub.net/',
  youtube: 'https://www.youtube.com/@twinhub',
  vimeo: 'https://vimeo.com/twinhub',
  twitter: 'https://twitter.com/twinhub_net',
  linkedin: 'https://www.linkedin.com/in/twinhub/',
};

// قسم الحلول الذكية وتطوير المنتجات / AI Solutions & Product Dev
export const AI_SOLUTIONS = {
  title: { en: 'Product Development & AI Solutions', ar: 'قطاع تطوير المنتجات والحلول الذكية' },
  subtitle: { en: 'Innovation Beyond Production', ar: 'ابتكار يتجاوز الإنتاج التقليدي' },
  description: {
    en: 'We develop smart applications and innovative automation systems for businesses, driven by cutting-edge artificial intelligence.',
    ar: 'نحن فخورون بإطلاق قسم تطوير المنتجات والحلول الذكية، حيث نقوم بتطوير تطبيقات ذكية وأنظمة أتمتة مبتكرة للشركات، مدفوعة بأحدث تقنيات الذكاء الاصطناعي.',
  },
  features: [
    {
      id: 'apps',
      title: { en: 'Smart Applications', ar: 'التطبيقات الذكية' },
      desc: { en: 'Custom AI-driven mobile and web apps built for performance.', ar: 'تطبيقات جوال وويب مخصصة مدعومة بالذكاء الاصطناعي لرفع كفاءة الأعمال.' }
    },
    {
      id: 'automation',
      title: { en: 'Enterprise Automation', ar: 'الأتمتة للمؤسسات' },
      desc: { en: 'Streamlining workflows with intelligent systems and robots.', ar: 'تبسيط سير العمل باستخدام الأنظمة الذكية والأتمتة لزيادة الإنتاجية.' }
    }
  ]
};

// إعدادات الموقع العامة / General Site Settings
export const SITE_CONFIG = {
  name: 'TwinHub Media & AI Center',
  domain: 'twinhub.net',
  url: 'https://www.twinhub.net',
  description: {
    en: 'TwinHub is a leading creative media production and AI center in Egypt.',
    ar: 'توين هب هي شركة رائدة في الإنتاج الإعلامي الإبداعي والذكاء الاصطناعي في مصر.',
  },
};

// محتوى القسم الرئيسي / Hero Section Content
export const HERO_CONTENT = {
  en: {
    texts: ['Cinematic Stories', 'Brand Experiences', 'Creative Visions', 'Media & AI Center'],
    weCreate: 'We Create',
    subtitle: 'We keep pace with the latest developments in advertising and AI, offering creative design and implementation with speed, high quality, and competitive prices.',
    exploreWork: 'Explore Our Work',
    startProject: 'Start Your Project'
  },
  ar: {
    texts: ['قصص سينمائية', 'تجارب العلامة التجارية', 'رؤى إبداعية', 'محتوى رقمي'],
    weCreate: 'نحن نبدع',
    subtitle: 'نواكب أحدث التطورات في الإعلان والذكاء الاصطناعي، ونقدم التصميم الإبداعي والتنفيذ بسرعة جودة عالية وأسعار تنافسية.',
    exploreWork: 'استكشف أعمالنا',
    startProject: 'ابدأ مشروعك'
  }
};

// محتوى قسم الخدمات / Services Section Content
export const SERVICES_CONTENT = {
  en: {
    title: 'Our Services',
    subtitle: 'We offer comprehensive creative media production services tailored to bring your vision to life with professional excellence and artistic innovation.',
    learnMore: 'Learn More',
    services: [
      { id: 'ai-center', icon: 'Brain', title: 'Artificial Intelligence Center', description: 'Cutting-edge AI solutions...', features: ['AI Content Creation', 'Smart Analytics'] },
      { id: 'video', icon: 'Video', title: 'Video Production for Business', description: 'Comprehensive video production...', features: ['Corporate Videos', 'TV Ads'] },
      { id: 'photo', icon: 'Camera', title: 'Photography Production', description: 'Professional photography...', features: ['Fashion', 'Product'] },
      { id: 'branding', icon: 'Palette', title: 'Branding & Design', description: 'Complete branding solutions...', features: ['Identity', 'Logo'] },
      { id: 'events', icon: 'Users', title: 'Exhibition & Events', description: 'Full-service event production...', features: ['Planning', 'Design'] },
      { id: 'music', icon: 'Award', title: 'Copyright & Music', description: 'Professional music production...', features: ['Original Music', 'Sound Design'] }
    ]
  },
  ar: {
    title: 'خدماتنا',
    subtitle: 'نقدم خدمات إنتاج وسائط إبداعية شاملة مصممة لتحقيق رؤيتك بتميز مهني وابتكار فني.',
    learnMore: 'اعرف المزيد',
    services: [
      { id: 'ai-center', icon: 'Brain', title: 'مركز الذكاء الاصطناعي', description: 'حلول ذكاء اصطناعي متطورة...', features: ['إنشاء محتوى بالذكاء الاصطناعي'] },
      { id: 'video', icon: 'Video', title: 'إنتاج الفيديو للأعمال', description: 'خدمات إنتاج فيديو شاملة...', features: ['فيديوهات مؤسسية'] },
      { id: 'photo', icon: 'Camera', title: 'إنتاج التصوير الفوتوغرافي', description: 'خدمات تصوير احترافية...', features: ['تصوير الأزياء'] },
      { id: 'branding', icon: 'Palette', title: 'العلامة التجارية والتصميم', description: 'حلول علامة تجارية كاملة...', features: ['هوية العلامة التجارية'] },
      { id: 'events', icon: 'Users', title: 'المعارض والفعاليات', description: 'إنتاج فعاليات متكامل...', features: ['تخطيط الفعاليات'] },
      { id: 'music', icon: 'Award', title: 'حقوق الطبع والموسيقى', description: 'إنتاج موسيقي احترافي...', features: ['موسيقى أصلية'] }
    ]
  }
};

// ... (بقية المحتوى تم حفظه بالكامل في النسخة الاحتياطية)
