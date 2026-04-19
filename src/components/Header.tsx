import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';

interface HeaderProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

export default function Header({ language, onLanguageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = {
    en: ['Home', 'Services', 'AI Solutions', 'Gallery', 'Clients', 'About', 'Contact'],
    ar: ['الرئيسية', 'الخدمات', 'حلول الذكاء الاصطناعي', 'المعرض', 'العملاء', 'من نحن', 'اتصل بنا']
  };

  const navLinks = {
    en: ['home', 'services', 'ai', 'gallery', 'clients', 'about', 'contact'],
    ar: ['home', 'services', 'ai', 'gallery', 'clients', 'about', 'contact']
  };

  const currentNavItems = navItems[language as keyof typeof navItems] || navItems.en;
  const currentNavLinks = navLinks[language as keyof typeof navLinks] || navLinks.en;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${language === 'ar' ? 'rtl' : 'ltr'} ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('hero')}>
            {scrolled ? (
              <img 
                src="/Twinhub Logo_Artboard 14-2_Artboard 14.png" 
                alt="Twinhub Logo" 
                className="h-12 w-auto hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <img 
                src="/Twinhub Logo_Artboard 21_Artboard 21 copy.png" // اللوجو الأبيض الجديد
                alt="Twinhub Logo White" 
                className="h-12 w-auto hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {currentNavItems.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(currentNavLinks[index])}
                className={`font-medium transition-colors duration-300 hover:text-red-600 ${
                  scrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                className={`p-2 rounded-full border-2 border-transparent hover:border-red-500 transition-colors duration-300 ${scrolled ? 'text-gray-800 bg-white' : 'text-white bg-black/30'}`}
                aria-label="Change Language"
                onClick={() => setShowLangDropdown(v => !v)}
              >
                <Globe size={22} />
              </button>
              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg z-50">
                  <button
                    className={`block w-full px-4 py-2 text-left text-gray-800 hover:text-red-600 transition-colors duration-300 ${language === 'en' ? 'font-bold' : ''}`}
                    onClick={() => { onLanguageChange('en'); setShowLangDropdown(false); }}
                  >
                    English
                  </button>
                  <button
                    className={`block w-full px-4 py-2 text-left text-gray-800 hover:text-red-600 transition-colors duration-300 ${language === 'ar' ? 'font-bold' : ''}`}
                    onClick={() => { onLanguageChange('ar'); setShowLangDropdown(false); }}
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>

          {/* Mobile Menu Button */}
            <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md transition-colors duration-300 ${
                scrolled ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-red-300'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {currentNavItems.map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(currentNavLinks[index])}
                  className="block w-full text-left font-medium text-gray-800 hover:text-red-600 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}