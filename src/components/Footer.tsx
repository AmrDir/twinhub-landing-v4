import { Facebook, Instagram, Twitter, Youtube, Linkedin, MapPin, Phone, Mail, Video } from 'lucide-react';
import { useState } from 'react';
import { CONTACT_INFO, SOCIAL_LINKS } from '../config/site.config';
import { useSiteData } from '../context/SiteContext';

interface Props {
  language: string;
}

export default function Footer({ language }: Props) {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const { settings } = useSiteData();

  // Use Supabase settings with static fallbacks
  const contactInfo = {
    email: settings?.contact_email || CONTACT_INFO.email,
    phone: settings?.contact_phone || CONTACT_INFO.phone,
    phone2: settings?.contact_phone2 || CONTACT_INFO.phone2,
    whatsapp: settings?.contact_whatsapp || CONTACT_INFO.whatsapp,
    address: {
      en: settings?.address_en || CONTACT_INFO.address.en,
      ar: settings?.address_ar || CONTACT_INFO.address.ar,
    },
    mapUrl: settings?.map_url || CONTACT_INFO.mapUrl,
  };

  const socialLinks = {
    instagram: settings?.social_instagram || SOCIAL_LINKS.instagram,
    facebook: settings?.social_facebook || SOCIAL_LINKS.facebook,
    youtube: settings?.social_youtube || SOCIAL_LINKS.youtube,
    vimeo: settings?.social_vimeo || SOCIAL_LINKS.vimeo,
    twitter: settings?.social_twitter || SOCIAL_LINKS.twitter,
    linkedin: settings?.social_linkedin || SOCIAL_LINKS.linkedin,
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('sending');
    // Newsletter logic would go here
    setTimeout(() => setSubscribeStatus('success'), 1500);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { en: 'Home', ar: 'الرئيسية', id: 'hero' },
    { en: 'Services', ar: 'الخدمات', id: 'services' },
    { en: 'AI Solutions', ar: 'حلول الذكاء الاصطناعي', id: 'ai-solutions' },
    { en: 'Gallery', ar: 'المعرض', id: 'gallery' },
    { en: 'Clients', ar: 'العملاء', id: 'clients' },
    { en: 'About', ar: 'من نحن', id: 'about' },
    { en: 'Contact', ar: 'اتصل بنا', id: 'contact' }
  ];

  const servicesLinks = {
    en: ['AI Center', 'Video Production', 'Photography Production', 'Branding & Design', 'Exhibition & Events', 'Copyright & Music'],
    ar: ['مركز الذكاء الاصطناعي', 'إنتاج الفيديو', 'إنتاج التصوير', 'العلامة التجارية والتصميم', 'المعارض والفعاليات', 'حقوق الطبع والموسيقى']
  };

  const socialItems = [
    { icon: Instagram, href: socialLinks.instagram, label: 'Instagram' },
    { icon: Facebook, href: socialLinks.facebook, label: 'Facebook' },
    { icon: Video, href: socialLinks.vimeo, label: 'Vimeo' },
    { icon: Youtube, href: socialLinks.youtube, label: 'YouTube' },
    { icon: Twitter, href: socialLinks.twitter, label: 'Twitter' },
    { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' }
  ];

  return (
    <footer className="relative bg-[#020617] text-white py-12 overflow-hidden border-t border-white/10">
      {/* Background Decorative Elements - Cinematic Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cinema-red/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[140px] pointer-events-none"></div>
      
      {/* Large Subtle Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <img 
          src="/Twinhub Logo_Artboard 19.png"
          alt=""
          className="w-full max-w-4xl object-contain scale-150 transform rotate-12"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Logo & Newsletter */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-10 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-4 mb-6 group cursor-default">
              <img 
                src="/Twinhub Logo_Artboard 21_Artboard 21 copy.png"
                alt="Twinhub Logo" 
                className="h-16 w-auto group-hover:scale-110 transition-transform duration-500"
              />
              <div className="h-10 w-px bg-white/20"></div>
              <h2 className="text-2xl font-bold tracking-tighter leading-tight">
                TwinHub<br/>
                <span className="text-cinema-red text-sm uppercase tracking-[0.3em] font-black">Media & AI Center</span>
              </h2>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed font-light">
              {language === 'ar' 
                ? 'مستقبلك يبدأ هنا. نحن ندمج الفن السينمائي بالذكاء الاصطناعي لنخلق تجارب تتجاوز حدود الخيال.'
                : 'Your future starts here. We merge cinematic art with AI to create experiences that transcend imagination.'}
            </p>
          </div>

          <div className="cinematic-card p-8 border-white/20 shadow-2xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cinema-red animate-pulse"></span>
              {language === 'ar' ? 'ابقَ في قلب الحدث' : 'Stay in the Loop'}
            </h3>
            <form 
              name="newsletter" 
              method="POST" 
              data-netlify="true" 
              onSubmit={handleSubscribe}
              className="relative flex gap-2"
            >
              <input type="hidden" name="form-name" value="newsletter" />
              <input
                type="email"
                name="subscriber_email"
                required
                placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Enter your email'}
                className="flex-1 px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cinema-red focus:border-transparent text-white placeholder:text-gray-600 outline-none transition-all"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button 
                type="submit"
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-500 ${
                  subscribeStatus === 'sending' ? 'bg-gray-700 text-gray-400 cursor-wait' :
                  subscribeStatus === 'success' ? 'bg-green-600 text-white' :
                  'bg-cinema-red text-white hover:bg-cinema-red-hover shadow-[0_0_20px_rgba(220,38,38,0.3)]'
                }`}
                disabled={subscribeStatus === 'sending'}
              >
                {subscribeStatus === 'sending' ? '...' : subscribeStatus === 'success' ? '✓' : (language === 'ar' ? 'اشترك' : 'Join')}
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Links & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Contact Details */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-8">
              {language === 'ar' ? 'اتصل بنا' : 'Contact'}
            </h3>
            <div className="space-y-6 text-sm text-gray-300">
              <a href={contactInfo.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <MapPin className="w-5 h-5 text-cinema-red shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">{language === 'ar' ? contactInfo.address.ar : contactInfo.address.en}</span>
              </a>
              <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-4 group">
                <Phone className="w-5 h-5 text-cinema-red shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors font-bold tracking-wider">{contactInfo.phone}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 group">
                <Mail className="w-5 h-5 text-cinema-red shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">{contactInfo.email}</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-8">
              {language === 'ar' ? 'الاستكشاف' : 'Explore'}
            </h3>
            <ul className="grid grid-cols-1 gap-4">
              {quickLinks.map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group text-left rtl:text-right"
                  >
                    <span className="w-1.5 h-px bg-cinema-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {language === 'ar' ? item.ar : item.en}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-8">
              {language === 'ar' ? 'خدماتنا' : 'Services'}
            </h3>
            <ul className="space-y-4">
              {(language === 'ar' ? servicesLinks.ar : servicesLinks.en).map((service) => (
                <li key={service}>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group text-left rtl:text-right"
                  >
                    <span className="w-1.5 h-px bg-cinema-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Presence */}
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-8">
              {language === 'ar' ? 'تابعنا' : 'Follow Us'}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {socialItems.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-cinema-red hover:border-cinema-red transition-all duration-500 group shadow-lg w-10 h-10"
                >
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-gray-500 text-[10px] tracking-widest font-bold">
            © {new Date().getFullYear()} TWINHUB MEDIA & AI CENTER. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
            <button className="hover:text-cinema-red transition-colors">{language === 'ar' ? 'سياسة الخصوصية' : 'Privacy'}</button>
            <button className="hover:text-cinema-red transition-colors">{language === 'ar' ? 'الشروط' : 'Terms'}</button>
            <button 
               onClick={() => scrollToSection('hero')}
               className="text-cinema-red animate-pulse flex items-center gap-2"
            >
              {language === 'ar' ? 'للأعلى ↑' : 'Back to Top ↑'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}