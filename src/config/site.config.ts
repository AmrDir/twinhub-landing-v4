// ============================================================
// TwinHub Config
// ============================================================

// ============================================================
// معلومات التواصل / Contact Info
// ============================================================
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

// ============================================================
// روابط التواصل الاجتماعي / Social Links
// ============================================================
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/twinhub.media.production/',
  facebook: 'https://www.facebook.com/Twinhub.net/',
  youtube: 'https://www.youtube.com/@twinhub',
  vimeo: 'https://vimeo.com/twinhub',
  twitter: 'https://twitter.com/twinhub_net',
  linkedin: 'https://www.linkedin.com/in/twinhub/',
};

// ============================================================
// قسم الحلول الذكية وتطوير المنتجات / AI Solutions & Product Dev
// ============================================================
export const AI_SOLUTIONS = {
  title: {
    en: 'Product Development & AI Solutions',
    ar: 'قطاع تطوير المنتجات والحلول الذكية',
  },
  subtitle: {
    en: 'Innovation Beyond Production',
    ar: 'ابتكار يتجاوز الإنتاج التقليدي',
  },
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

// ============================================================
// محتوى قسم المنتجات والمنصات الذكية / Products & AI Platforms
// ============================================================
export const PRODUCTS_CONTENT = {
  title: {
    en: 'Our Smart Platforms',
    ar: 'منصاتنا وتطبيقاتنا الذكية',
  },
  subtitle: {
    en: 'Innovations Driven By AI',
    ar: 'ابتكارات مدفوعة بالذكاء الاصطناعي',
  },
  products: [
    {
      id: 'ask-prompt-me',
      name: { en: 'Ask Prompt Me', ar: 'Ask Prompt Me' },
      description: {
        en: 'An advanced AI prompting platform designed to supercharge your workflow and creative processes.',
        ar: 'منصة ذكاء اصطناعي متقدمة لتوليد وهندسة الأوامر (Prompt Engineering) لتعزيز سير العمل والإبداع.'
      },
      features: {
        en: ['AI Workflow Automation', 'Prompt Library', 'API Integration'],
        ar: ['أتمتة سير العمل', 'مكتبة أوامر جاهزة', 'ربط برمجي API']
      },
      media: '/ask-prompt-me.png',
      type: 'image',
      link: '#'
    },
    {
      id: 'lingualink',
      name: { en: 'LinguaLink', ar: 'LinguaLink' },
      description: {
        en: 'A seamless AI-powered translation and localization hub breaking language barriers in real-time.',
        ar: 'مركز ترجمة وتوطين متقدم يعمل بالذكاء الاصطناعي لكسر حواجز اللغة في الوقت الفعلي.'
      },
      features: {
        en: ['Real-time Translation', 'Contextual Localization', 'Multi-format Support'],
        ar: ['ترجمة فورية', 'توطين سياقي', 'دعم صيغ متعددة']
      },
      media: '/products/lingualink.png',
      type: 'image',
      link: '#'
    },
    {
      id: 'karma-house',
      name: { en: 'Karma House', ar: 'كارما هاوس (Karma House)' },
      description: {
        en: 'Our most ambitious invention. An intelligent ecosystem combining cinematic aesthetics with autonomous AI reasoning.',
        ar: 'اختراعنا الأهم والأكثر طموحاً على كافة المستويات. نظام بيئي ذكي يجمع بين الجماليات السينمائية والذكاء الاصطناعي المستقل لحلول متكاملة.'
      },
      features: {
        en: ['Autonomous AI', 'Cinematic Rendering', 'Emotional Intelligence'],
        ar: ['ذكاء اصطناعي مستقل', 'عرض سينمائي', 'ذكاء عاطفي']
      },
      media: '/work4.jpg',
      type: 'image',
      link: '#'
    }
  ]
};

// ============================================================
// إعدادات الموقع العامة / General Site Settings
// ============================================================
export const SITE_CONFIG = {
  name: 'TwinHub Media & AI Center',
  domain: 'twinhub.net',
  url: 'https://www.twinhub.net',
  description: {
    en: 'TwinHub is a leading creative media production and AI center in Egypt.',
    ar: 'توين هب هي شركة رائدة في الإنتاج الإعلامي الإبداعي والذكاء الاصطناعي في مصر.',
  },
};

// ============================================================
// محتوى القسم الرئيسي / Hero Section Content
// ============================================================
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
    subtitle: 'نواكب أحدث التطورات في الإعلان والذكاء الاصطناعي، ونقدم التصميم الإبداعي والتنفيذ بسرعة وجودة عالية وأسعار تنافسية.',
    exploreWork: 'استكشف أعمالنا',
    startProject: 'ابدأ مشروعك'
  }
};

// ============================================================
// محتوى قسم الخدمات / Services Section Content
// ============================================================
export const SERVICES_CONTENT = {
  en: {
    title: 'Our Services',
    subtitle: 'We offer comprehensive creative media production services tailored to bring your vision to life with professional excellence and artistic innovation.',
    learnMore: 'Learn More',
    services: [
      {
        id: 'ai-center',
        icon: 'Brain',
        title: 'Artificial Intelligence Center',
        description: 'Cutting-edge AI solutions for modern advertising and media production, delivering smart and innovative results.',
        features: ['AI Content Creation', 'Smart Analytics', 'Automated Production', 'Innovation Solutions']
      },
      {
        id: 'video',
        icon: 'Video',
        title: 'Video Production for Business',
        description: 'Comprehensive video production services from corporate videos to TV commercials and documentaries.',
        features: ['Corporate Videos', 'TV Commercial Ads', 'Documentary Films', 'Animation Videos']
      },
      {
        id: 'photo',
        icon: 'Camera',
        title: 'Photography Production',
        description: 'Professional photography services capturing your brand essence with artistic excellence and technical precision.',
        features: ['Fashion Photography', 'Product Photography', 'Event Coverage', 'Corporate Portraits']
      },
      {
        id: 'branding',
        icon: 'Palette',
        title: 'Branding & Design',
        description: 'Complete branding solutions including fashion design, visual identity, and creative marketing materials.',
        features: ['Brand Identity', 'Fashion Design', 'Logo Design', 'Marketing Materials']
      },
      {
        id: 'events',
        icon: 'Users',
        title: 'Exhibition & Events',
        description: 'Full-service event production and exhibition management with creative execution and flawless delivery.',
        features: ['Event Planning', 'Exhibition Design', 'Live Production', 'Event Photography']
      },
      {
        id: 'music',
        icon: 'Award',
        title: 'Copyright & Music',
        description: 'Professional music production and copyright services to enhance your media with original soundtracks.',
        features: ['Original Music', 'Sound Design', 'Copyright Management', 'Audio Production']
      }
    ]
  },
  ar: {
    title: 'خدماتنا',
    subtitle: 'نقدم خدمات إنتاج وسائط إبداعية شاملة مصممة لتحقيق رؤيتك بتميز مهني وابتكار فني.',
    learnMore: 'اعرف المزيد',
    services: [
      {
        id: 'ai-center',
        icon: 'Brain',
        title: 'مركز الذكاء الاصطناعي',
        description: 'حلول ذكاء اصطناعي متطورة للإعلان الحديث وإنتاج الوسائط، تقدم نتائج ذكية ومبتكرة.',
        features: ['إنشاء محتوى بالذكاء الاصطناعي', 'تحليلات ذكية', 'إنتاج آلي', 'حلول الابتكار']
      },
      {
        id: 'video',
        icon: 'Video',
        title: 'إنتاج الفيديو للأعمال',
        description: 'خدمات إنتاج فيديو شاملة من الفيديوهات المؤسسية إلى الإعلانات التلفزيونية والأفلام الوثائقية.',
        features: ['فيديوهات مؤسسية', 'إعلانات تلفزيونية', 'أفلام وثائقية', 'فيديوهات متحركة']
      },
      {
        id: 'photo',
        icon: 'Camera',
        title: 'إنتاج التصوير الفوتوغرافي',
        description: 'خدمات تصوير احترافية تلتقط جوهر علامتك التجارية بتميز فني ودقة تقنية.',
        features: ['تصوير الأزياء', 'تصوير المنتجات', 'تغطية الأحداث', 'صور مؤسسية']
      },
      {
        id: 'branding',
        icon: 'Palette',
        title: 'العلامة التجارية والتصميم',
        description: 'حلول علامة تجارية كاملة تشمل تصميم الأزياء والهوية البصرية والمواد التسويقية الإبداعية.',
        features: ['هوية العلامة التجارية', 'تصميم الأزياء', 'تصميم الشعار', 'مواد تسويقية']
      },
      {
        id: 'events',
        icon: 'Users',
        title: 'المعارض والفعاليات',
        description: 'إنتاج فعاليات متكامل وإدارة معارض مع تنفيذ إبداعي وتسليم لا تشوبه شائبة.',
        features: ['تخطيط الفعاليات', 'تصميم المعارض', 'إنتاج مباشر', 'تصوير الفعاليات']
      },
      {
        id: 'music',
        icon: 'Award',
        title: 'حقوق الطبع والموسيقى',
        description: 'إنتاج موسيقي احترافي وخدمات حقوق الطبع لتعزيز وسائطك بموسيقى تصويرية أصلية.',
        features: ['موسيقى أصلية', 'تصميم الصوت', 'إدارة حقوق الطبع', 'إنتاج صوتي']
      }
    ]
  }
};

// ============================================================
// محتوى قسم التواصل / Contact Section Content
// ============================================================
export const CONTACT_SECTION_CONTENT = {
  en: {
    title: 'Get In Touch',
    subtitle: 'Contact us when you choose TwinHub Media & AI Center. We hope you enjoy our site and take a moment to drop us a line.',
    startConversation: "Let's Start a Conversation",
    emailUs: 'Email Us',
    callUs: 'Call Us',
    whatsappUs: 'WhatsApp Us',
    visitUs: 'Visit Us',
    officeHours: 'Office Hours',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    company: 'Company',
    serviceNeeded: 'Service Needed',
    message: 'Message',
    messagePlaceholder: 'Tell us about your project, goals, timeline...',
    sendMessage: 'Send Message',
    selectService: 'Select a service',
    services: [
      'AI Solutions',
      'Smart Applications',
      'Business Automation',
      'Video Production',
      'Photography',
      'Branding & Design'
    ],
    schedule: {
      weekdays: 'Monday - Friday',
      weekdaysTime: '9:00 AM - 6:00 PM',
      saturday: 'Saturday',
      saturdayTime: '10:00 AM - 4:00 PM',
      sunday: 'Sunday',
      sundayTime: 'By Appointment'
    }
  },
  ar: {
    title: 'تواصل معنا',
    subtitle: 'تواصل معنا عندما تختار TwinHub Media & AI Center. نأمل أن تستمتع بموقعنا وأن تأخذ لحظة لتراسلنا.',
    startConversation: 'لنبدأ محادثة',
    emailUs: 'راسلنا',
    callUs: 'اتصل بنا',
    whatsappUs: 'واتساب',
    visitUs: 'زرنا',
    officeHours: 'ساعات العمل',
    fullName: 'الاسم الكامل',
    emailAddress: 'البريد الإلكتروني',
    company: 'الشركة',
    serviceNeeded: 'الخدمة المطلوبة',
    message: 'الرسالة',
    messagePlaceholder: 'أخبرنا عن مشروعك، أهدافك، والجدول الزمني...',
    sendMessage: 'إرسال الرسالة',
    selectService: 'اختر خدمة',
    services: [
      'حلول الذكاء الاصطناعي',
      'التطبيقات الذكية',
      'أتمتة الأعمال',
      'إنتاج الفيديو',
      'التصوير الفوتوغرافي',
      'العلامة التجارية والتصميم'
    ],
    schedule: {
      weekdays: 'الاثنين - الجمعة',
      weekdaysTime: '9:00 ص - 6:00 م',
      saturday: 'السبت',
      saturdayTime: '10:00 ص - 4:00 م',
      sunday: 'الأحد',
      sundayTime: 'بموعد مسبق'
    }
  }
};

// ============================================================
// محتوى معرض الأعمال / Gallery Content
// ============================================================
export const GALLERY_CONTENT = {
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
    remaining: 'remaining'
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
    remaining: 'متبقي'
  },
  items: [
    { src: '/gallery/work1.jpg', type: 'image', alt: 'Creative Production', category: 'branding' },
    { src: '/gallery/work2.jpg', type: 'image', alt: 'Photography Art', category: 'photography' },
    { src: '/gallery/work3.jpg', type: 'image', alt: 'Visual Storytelling', category: 'branding' },
    { src: '/gallery/work4.jpg', type: 'image', alt: 'Cinematic Direction', category: 'video' },
    { src: '/gallery/work5.jpg', type: 'image', alt: 'Studio Work', category: 'photography' },
    { src: '/gallery/work7.jpg', type: 'image', alt: 'Creative Vision', category: 'branding' },
    { src: '/gallery/work8.jpg', type: 'image', alt: 'Media Innovation', category: 'video' },
    { src: '/gallery/work9.jpg', type: 'image', alt: 'Brand Identity', category: 'branding' },
    { src: '/gallery/work10.jpg', type: 'image', alt: 'High-end Production', category: 'photography' },
    { src: '/gallery/work11.jpg', type: 'image', alt: 'Motion Graphics', category: 'video' },
    { src: '/gallery/work13.jpg', type: 'image', alt: 'Documentary Work', category: 'video' },
    { src: '/gallery/work16.jpg', type: 'image', alt: 'Professional Photography', category: 'photography' },
    { src: '/gallery/work21.jpg', type: 'image', alt: 'Art Direction', category: 'branding' },
    { src: '/gallery/work22.jpg', type: 'image', alt: 'Visual Effects', category: 'video' },
    { src: '/gallery/work23.jpg', type: 'image', alt: 'Commercial Production', category: 'video' },
    { src: '/gallery/work24.jpg', type: 'image', alt: 'Event Media', category: 'events' },
    { src: '/gallery/work25.jpg', type: 'image', alt: 'Digital Story', category: 'branding' },
    { src: '/gallery/work26.jpg', type: 'image', alt: 'Creative Strategy', category: 'branding' },
    { src: '/gallery/work27.jpg', type: 'image', alt: 'Brand Experience', category: 'photography' },
    { src: '/gallery/work33.jpg', type: 'image', alt: 'Masterpiece Production', category: 'video' },
  ]
};

// ============================================================
// محتوى قسم عن الشركة / About Section Content
// ============================================================
export const ABOUT_CONTENT = {
  en: {
    title: 'TwinHub Media & AI Center',
    description: 'TwinHub Agency: We keep pace with the latest developments in the world of advertising and artificial intelligence, offering you creative design and implementation, with speed, high quality, and competitive prices.',
    aboutText: 'At TwinHub Agency, we work together to provide you with superior advertising creativity to communicate your services and products to your clients in the best possible way.',
    locationText: 'We are based in Egypt, the most creative, diverse, and entertaining country in the region.',
    visionTitle: 'Our Vision',
    visionText: 'We offer integrated media production and smart, results-oriented solutions, aiming to be a global influence in intelligent content delivery.',
    missionTitle: 'Our Mission',
    missionText: 'We strive to deliver high-quality content. As pioneers, we set measurable, achievable, and realistic goals for our partners.',
    whatWeDoTitle: 'What We Do',
    whatWeDoSubtitle: "We're not just an agency, we're a trusted partner",
    stats: [
      { id: 'projects', value: '150+', label: 'Projects Completed', icon: 'Award' },
      { id: 'clients', value: '100+', label: 'Happy Clients', icon: 'Users' },
      { id: 'years', value: '20+', label: 'Years Experience', icon: 'Clock' },
      { id: 'rate', value: '99%', label: 'Client Satisfaction', icon: 'Target' }
    ]
  },
  ar: {
    title: 'TwinHub Media & AI Center',
    description: 'وكالة TwinHub: نواكب أحدث التطورات في عالم الإعلان والذكاء الاصطناعي، ونقدم لك التصميم الإبداعي والتنفيذ، بسرعة وجودة عالية وأسعار تنافسية.',
    aboutText: 'في وكالة TwinHub، نعمل معًا لنقدم لك إبداعًا إعلانيًا متفوقًا لتوصيل خدماتك ومنتجاتك إلى عملائك بأفضل طريقة ممكنة.',
    locationText: 'نحن مقرنا في مصر، البلد الأكثر إبداعًا وتنوعًا وترفيهًا في المنطقة.',
    visionTitle: 'رؤيتنا',
    visionText: 'نقدم إنتاج وسائط متكامل، حلول ذكية موجهة نحو النتائج، ولنكون واحدة من أكثر الشركات تأثيرًا في تقديم محتوى عالي الجودة وذكي.',
    missionTitle: 'مهمتنا',
    missionText: 'نسعى لتقديم محتوى عالي الجودة. كرواد، ساهمنا في نجاح أكبر الشركات من خلال وضع أهداف تسويقية قابلة للقياس والتحقيق.',
    whatWeDoTitle: 'ما نقوم به',
    whatWeDoSubtitle: 'لسنا مجرد وكالة، نحن شريك موثوق',
    stats: [
      { id: 'projects', value: '150+', label: 'مشروع مكتمل', icon: 'Award' },
      { id: 'clients', value: '100+', label: 'عميل سعيد', icon: 'Users' },
      { id: 'years', value: '20+', label: 'سنة خبرة', icon: 'Clock' },
      { id: 'rate', value: '99%', label: 'رضا العملاء', icon: 'Target' }
    ]
  }
};

// ============================================================
// محتوى قسم العملاء / Clients Section Content
// ============================================================
export const CLIENTS_CONTENT = {
  en: {
    title: 'Clients & Success Partners',
    subtitle: 'Trusted by leading brands across industries',
    description: "We've had the privilege of working with amazing clients who trust us to bring their visions to life.",
  },
  ar: {
    title: 'العملاء وشركاء النجاح',
    subtitle: 'موثوق من قبل العلامات التجارية الرائدة عبر الصناعات',
    description: 'لقد حظينا بشرف العمل مع عملاء رائعين يثقون بنا لتحقيق رؤاهم.',
  },
  logos: [
    'logo-01.png', 'logo-02.png', 'logo-03.png', 'logo-04.png', 'logo-05.png',
    'logo-06.png', 'logo-07.png', 'logo-08.png', 'logo-09.png', 'logo-10.png',
    'logo-11.png', 'logo-12.png', 'logo-13.png', 'logo-14.png', 'logo-15.png',
    'logo-16.png', 'logo-17.png', 'logo-18.png', 'logo-19.png', 'logo-20.png',
    'logo-21.png', 'logo-22.png', 'logo-23.png', 'logo-24.png', 'logo-25.png',
    'logo-26.png', 'logo-27.png', 'logo-28.png', 'logo-29.png', 'logo-30.png',
    'logo-31.png', 'logo-32.png', 'logo-33.png', 'logo-34.png', 'logo-35.png',
    'logo-36.png', 'logo-37.png', 'logo-38.png', 'logo-39.png', 'logo-40.png'
  ]
};
