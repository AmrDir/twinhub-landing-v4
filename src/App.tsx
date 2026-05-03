import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import AISection from './components/sections/AISection';
import GallerySection from './components/sections/GallerySection';
import ProductsSection from './components/sections/ProductsSection';
import ClientsSection from './components/sections/ClientsSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/Footer';
import AIAssistant from './components/common/AIAssistant';
import StarBackground from './components/common/StarBackground';

// Admin Pages (To be created)
import LoginPage from './pages/admin/LoginPage';
import Dashboard from './pages/admin/Dashboard';
import { supabase } from './lib/supabase';

function App() {
  const [language, setLanguage] = useState('en');
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read session immediately from localStorage (no network round-trip)
    supabase?.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    }) ?? setLoading(false);

    // Stay in sync with login / logout / token-refresh events
    const { data: { subscription } } = supabase?.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    }) ?? { data: { subscription: null } };

    return () => subscription?.unsubscribe();
  }, []);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-cinema-red border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <StarBackground />
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={
          <>
            <Header language={language} onLanguageChange={handleLanguageChange} />
            <main>
              <HeroSection language={language} />
              <ServicesSection language={language} />
              <AISection language={language} />
              <ProductsSection language={language} />
              <GallerySection language={language} />
              <ClientsSection language={language} />
              <AboutSection language={language} />
              <ContactSection language={language} />
            </main>
            <Footer language={language} />
            <AIAssistant language={language} />
          </>
        } />

        {/* Auth Route — redirect to dashboard if already authenticated */}
        <Route path="/login" element={session ? <Navigate to="/admin" replace /> : <LoginPage />} />

        {/* Private Admin Route */}
        <Route 
          path="/admin/*" 
          element={session ? <Dashboard session={session} /> : <Navigate to="/login" />} 
        />

        {/* Catch-all Redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;