import { Facebook, Instagram, Twitter, Youtube, Linkedin, MapPin, Phone, Mail, Video } from 'lucide-react';
import { useState } from 'react';
import { CONTACT_INFO, SOCIAL_LINKS } from '../config/site.config';

interface Props {
  language: string;
}

export default function Footer({ language }: Props) {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubscribe = () => {
    // النموذج سيتم معالجته عن طريق Netlify تلقائياً بسبب data-netlify="true"
    setSubscribeStatus('sending');
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
    { en: 'AI Solutions', ar: 'حلول الذكاء الاصطناعي', id: 'ai' },
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
    { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram', hover: 'hover:bg-pink-600' },
    { icon: Facebook, href: SOCIAL_LINKS.facebook, label: 'Facebook', hover: 'hover:bg-blue-600' },
    { icon: Video, href: SOCIAL_LINKS.vimeo, label: 'Vimeo', hover: 'hover:bg-sky-500' },
    { icon: Youtube, href: SOCIAL_LINKS.youtube, label: 'YouTube', hover: 'hover:bg-cinema-red' },
    { icon: Twitter, href: SOCIAL_LINKS.twitter, label: 'Twitter', hover: 'hover:bg-slate-600' },
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', hover: 'hover:bg-blue-700' }
  ];

  return (
    <footer className="bg-[#080404] text-white py-16 relative overflow-hidden border-t border-cinema-red/10">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cinema-red/6 rounded-full blur-[100px] pointer-events-none"></div>
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <img 
          src="/Twinhub Logo_Artboard 19.png"
          alt="Hub decorative"
          className="h-32 w-auto"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo & Title */}
        <div className="text-center mb-10 flex flex-col items-center justify-center">
          <img 
            src="/Twinhub Logo_Artboard 21_Artboard 21 copy.png"
            alt="Twinhub Logo" 
            className="h-20 w-auto mb-4 mx-auto"
          />
          <h2 className="text-3xl font-bold text-white mb-2">TwinHub Media & AI Center</h2>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex flex-col gap-3 text-gray-300 text-sm">
              <a href={CONTACT_INFO.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cinema-red-light transition-colors">
                <MapPin className="w-5 h-5 text-cinema-red flex-shrink-0" />
                <span>{language === 'ar' ? CONTACT_INFO.address.ar : CONTACT_INFO.address.en}</span>
              </a>
              <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-3 hover:text-cinema-red-light transition-colors">
                <Phone className="w-5 h-5 text-cinema-red flex-shrink-0" />
                <span>{CONTACT_INFO.phone} / {CONTACT_INFO.phone2}</span>
              </a>
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-3 hover:text-cinema-red-light transition-colors">
                <Mail className="w-5 h-5 text-cinema-red flex-shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </a>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              {socialItems.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center ${hover} transition-colors duration-300 group`}
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{language === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-400 hover:text-cinema-red-light transition-colors duration-300"
                  >
                    {language === 'ar' ? item.ar : item.en}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">{language === 'ar' ? 'خدماتنا' : 'Services'}</h3>
            <ul className="space-y-3">
              {(language === 'ar' ? servicesLinks.ar : servicesLinks.en).map((service) => (
                <li key={service}>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-gray-400 hover:text-cinema-red-light transition-colors duration-300"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/8 pt-8 mb-8">
          <form 
            name="newsletter" 
            method="POST" 
            data-netlify="true" 
            onSubmit={handleSubscribe}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold mb-2">{language === 'ar' ? 'ابقَ على اطلاع' : 'Stay Updated'}</h3>
              <p className="text-gray-300">{language === 'ar' ? 'احصل على آخر الأخبار والرؤى الإبداعية.' : 'Get the latest news and creative insights delivered to your inbox.'}</p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <div className="flex flex-1 md:flex-none">
                <input
                  type="email"
                  name="subscriber_email"
                  required
                  placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Enter your email'}
                  className="flex-1 md:w-64 px-4 py-3 bg-white/5 border border-white/10 rounded-l-xl focus:ring-2 focus:ring-cinema-red focus:border-cinema-red/50 text-white placeholder:text-gray-600 outline-none transition-all"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button 
                  type="submit"
                  className={`px-6 py-3 rounded-r-xl font-semibold transition-colors duration-300 ${
                    subscribeStatus === 'sending' ? 'bg-gray-500 text-white cursor-wait' :
                    'bg-cinema-red text-white hover:bg-cinema-red-hover'
                  }`}
                  disabled={subscribeStatus === 'sending'}
                >
                  {subscribeStatus === 'sending' ? (language === 'ar' ? 'جاري...' : 'Sending...') : (language === 'ar' ? 'اشترك' : 'Subscribe')}
                </button>
              </div>
              <button
                type="button"
                className="px-6 py-3 bg-white text-cinema-red rounded-xl font-semibold border-2 border-cinema-red hover:bg-cinema-red hover:text-white transition-colors duration-300 whitespace-nowrap"
                onClick={() => scrollToSection('contact')}
              >
                {language === 'ar' ? 'تواصل معنا' : 'Get In Touch'}
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} TwinHub Media & AI Center. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>
          <div className="flex space-x-6 text-sm">
            <button className="text-gray-400 hover:text-white transition-colors duration-300">
              {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </button>
            <button className="text-gray-400 hover:text-white transition-colors duration-300">
              {language === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}