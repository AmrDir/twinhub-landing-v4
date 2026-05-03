import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Phone } from 'lucide-react';
import { useSiteData } from '../../context/SiteContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  language: string;
}

export default function AIAssistant({ language }: Props) {
  const { settings } = useSiteData();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = language === 'ar' ? [
    'ما هي خدماتكم؟',
    'أريد بدء مشروع جديد',
    'أخبرني عن حلول الذكاء الاصطناعي',
    'كيف أتواصل معكم؟'
  ] : [
    'What services do you offer?',
    'I want to start a project',
    'Tell me about AI solutions',
    'How to contact you?'
  ];

  const isRtl = language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = language === 'ar' 
        ? 'مرحباً بك في عالم TwinHub! أنا كيانك الذكي، موجود هنا لأحول رؤيتك السينمائية إلى واقع ملموس. كيف يمكنني إلهامك اليوم؟' 
        : 'Welcome to the world of TwinHub! I am your intelligent entity, here to transform your cinematic vision into reality. How can I inspire you today?';
      setMessages([{ role: 'assistant', content: greeting }]);
    }
  }, [isOpen, language]);

  const handleSuggestionClick = (suggestion: string) => {
    setShowSuggestions(false);
    setInput(suggestion);
    handleSend(suggestion);
  };

  const handleSend = async (overrideInput?: string) => {
    const messageToSend = overrideInput || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage = messageToSend.trim();
    if (!overrideInput) setInput('');
    setShowSuggestions(false);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Logic for AI call (Groq/OpenAI proxy)
      // For now, we simulate or call a public proxy if available
      // In a real production, this calls a Supabase Edge Function
      
      const provider = settings?.ai_provider || 'openai';
      const modelOrUrl = settings?.ai_model_id || (provider === 'ollama' ? 'http://localhost:11434' : 'gpt-4o');
      const apiKeyOrModel = settings?.ai_api_key;

      if (provider !== 'ollama' && (!apiKeyOrModel || !settings?.ai_chat_enabled)) {
        setTimeout(() => {
          const fallbackMsg = language === 'ar'
            ? 'عذراً، نظام الدردشة تحت الصيانة حالياً. سأقوم بتحويلك لواتساب للتحدث مع فريقنا.'
            : 'Sorry, the chat system is currently under maintenance. I will redirect you to WhatsApp to talk to our team.';
          setMessages(prev => [...prev, { role: 'assistant', content: fallbackMsg }]);
          setIsLoading(false);
          
          setTimeout(() => {
            const whatsappUrl = `https://wa.me/${settings?.contact_whatsapp || '201007197170'}`;
            window.open(whatsappUrl, '_blank');
          }, 2000);
        }, 1000);
        return;
      }

      let aiContent = '';

      if (provider === 'ollama') {
        const response = await fetch(`${modelOrUrl}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: apiKeyOrModel || 'llama3.2:3b',
            messages: [
              { role: 'system', content: language === 'ar' ? settings?.ai_system_prompt_ar : settings?.ai_system_prompt_en },
              ...messages,
              { role: 'user', content: userMessage }
            ],
            stream: false
          })
        });
        const data = await response.json();
        aiContent = data.message.content;
      } else {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKeyOrModel}`
          },
          body: JSON.stringify({
            model: modelOrUrl,
            messages: [
              { role: 'system', content: language === 'ar' ? settings?.ai_system_prompt_ar : settings?.ai_system_prompt_en },
              ...messages,
              { role: 'user', content: userMessage }
            ]
          })
        });
        const data = await response.json();
        aiContent = data.choices[0].message.content;
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);

    } catch (error) {
      console.error('AI Chat Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection lost. Please try again or contact us on WhatsApp.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-50 flex flex-col items-end`}>
      {/* Chat Window */}
      {isOpen && (
        <div className={`mb-4 w-[350px] sm:w-[400px] h-[500px] bg-[#050505]/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-fade-in-up`}>
          {/* Header */}
          <div className="p-6 border-b border-white/10 bg-gradient-to-r from-cinema-red/10 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cinema-red rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">TwinHub AI</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Technical Assistant</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors p-2">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-[1.5rem] text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-cinema-red text-white rounded-tr-none shadow-lg' 
                  : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {showSuggestions && messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-4 animate-fade-in delay-500">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(s)}
                    className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-4 py-2 bg-white/5 hover:bg-cinema-red/20 border border-white/10 hover:border-cinema-red/50 text-gray-400 hover:text-white rounded-full transition-all duration-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-4 rounded-[1.5rem] rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-300"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-white/10">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={isRtl ? 'اكتب استفسارك هنا...' : 'Type your inquiry...'}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pr-12 text-sm text-white focus:border-cinema-red outline-none transition-all placeholder:text-gray-600"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cinema-red hover:text-white disabled:opacity-30"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <div className="flex items-center gap-3">
        <span className={`hidden md:block bg-white text-gray-800 px-4 py-2 rounded-xl shadow-lg text-xs font-bold uppercase tracking-widest transition-all duration-500 ${
          isOpen ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
        }`}>
          {isRtl ? 'اسأل TwinHub AI' : 'Ask TwinHub AI'}
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-500 ${
            isOpen ? 'bg-white text-black rotate-90' : 'bg-cinema-red text-white hover:scale-110 shadow-cinema-red/20'
          }`}
        >
          {isOpen ? <X size={28} /> : (
            <div className="relative">
              <Bot size={28} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-cinema-red rounded-full"></div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
