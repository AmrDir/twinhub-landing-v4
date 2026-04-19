import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import AISection from './components/sections/AISection';
import GallerySection from './components/sections/GallerySection';
import ClientsSection from './components/sections/ClientsSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';

function App() {
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Header language={language} onLanguageChange={handleLanguageChange} />
      <HeroSection language={language} />
      <ServicesSection language={language} />
      <AISection language={language} />
      <GallerySection language={language} />
      <ClientsSection language={language} />
      <AboutSection language={language} />
      <ContactSection language={language} />
      <Footer language={language} />
      <WhatsAppButton language={language} />
    </div>
  );
}

export default App;