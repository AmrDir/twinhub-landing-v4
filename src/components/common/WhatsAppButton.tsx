import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../../config/site.config';

interface Props {
  language: string;
}

export default function WhatsAppButton({ language }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    // Show button after scrolling past hero
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Stop pulsing after 10 seconds
    const pulseTimer = setTimeout(() => setIsPulsing(false), 10000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(pulseTimer);
    };
  }, []);

  const handleClick = () => {
    const message = language === 'ar'
      ? 'مرحباً، أريد الاستفسار عن خدمات TwinHub'
      : 'Hello, I would like to inquire about TwinHub services';
    const url = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 group flex items-center gap-3 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      {/* Tooltip */}
      <span className="hidden md:block bg-white text-gray-800 px-4 py-2 rounded-xl shadow-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {language === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
      </span>

      {/* Button */}
      <div className={`relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 ${
        isPulsing ? 'animate-bounce' : ''
      }`}>
        {/* Ping effect */}
        {isPulsing && (
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
        )}
        <MessageCircle className="w-7 h-7 text-white relative z-10" fill="white" />
      </div>
    </button>
  );
}
