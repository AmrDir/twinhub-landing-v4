import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

// Admin Pages (To be created)
import LoginPage from './pages/admin/LoginPage';
import Dashboard from './pages/admin/Dashboard';
import { getSession } from './lib/supabase';

function App() {
  const [language, setLanguage] = useState('en');
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    getSession().then(session => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={
          <>
            <Header language={language} onLanguageChange={handleLanguageChange} />
            <main>
              <HeroSection language={language} />
              <ServicesSection language={language} />
              <AISection language={language} />
              <GallerySection language={language} />
              <ClientsSection language={language} />
              <AboutSection language={language} />
              <ContactSection language={language} />
            </main>
            <Footer language={language} />
            <WhatsAppButton language={language} />
          </>
        } />

        {/* Auth Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Private Admin Route */}
        <Route 
          path="/admin/*" 
          element={session ? <Dashboard session={session} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </div>
  );
}

export default App;