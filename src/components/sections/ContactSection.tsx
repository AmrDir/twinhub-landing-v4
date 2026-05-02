import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Loader2, Clock } from 'lucide-react';
import MediaBackground from '../common/MediaBackground';
import { CONTACT_INFO, CONTACT_SECTION_CONTENT } from '../../config/site.config';
import { useSiteData } from '../../context/SiteContext';

interface ContactSectionProps {
  language: string;
}

export default function ContactSection({ language }: ContactSectionProps) {
  const { settings } = useSiteData();
  const t = CONTACT_SECTION_CONTENT[language as keyof typeof CONTACT_SECTION_CONTENT] || CONTACT_SECTION_CONTENT.en;
  const isRtl = language === 'ar';
  
  const contactEmail = settings?.contact_email || CONTACT_INFO.email;
  const contactWhatsapp = settings?.contact_whatsapp || CONTACT_INFO.whatsapp;
  const contactPhone = settings?.contact_phone || CONTACT_INFO.phone;
  const contactPhone2 = settings?.contact_phone2;
  const address = isRtl ? (settings?.address_ar || CONTACT_INFO.address.ar) : (settings?.address_en || CONTACT_INFO.address.en);
  const mapUrl = settings?.map_url || CONTACT_INFO.mapUrl;
  const schedule = settings?.schedule || t.schedule;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as any).toString()
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', company: '', service: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="relative py-16 lg:py-24 bg-black overflow-hidden">
      <MediaBackground
        backgroundImage="/backgrounds/contact/contact-bg.jpg"
        overlayOpacity={0.97}
        className="h-full w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/80"></div>
      </MediaBackground>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24 animate-fade-in">
          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            {isRtl ? (
              <>تواصل <span className="text-cinema-red">معنا</span></>
            ) : (
              <>Get In <span className="text-cinema-red">Touch</span></>
            )}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            {t.subtitle}
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-start ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Left Side: Contact Cards & Info */}
          <div className="space-y-10">
            <h3 className="text-3xl font-bold text-white mb-8">{t.startConversation}</h3>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Email Card */}
              <a href={`mailto:${contactEmail}`} className="group p-6 cinematic-card border-white/20 hover:border-cinema-red/50 hover:bg-[#1F2937]/90 transition-all duration-500">
                <Mail className="w-8 h-8 text-cinema-red-light mb-4" />
                <h4 className="text-white font-bold mb-1">{t.emailUs}</h4>
                <p className="text-gray-300 text-sm">{contactEmail}</p>
              </a>

              {/* WhatsApp Card */}
              <a href={`https://wa.me/${contactWhatsapp}`} target="_blank" rel="noreferrer" className="group p-6 cinematic-card border-white/20 hover:border-green-500/50 hover:bg-[#1F2937]/90 transition-all duration-500">
                <MessageCircle className="w-8 h-8 text-green-500 mb-4" />
                <h4 className="text-white font-bold mb-1">{t.whatsappUs}</h4>
                <p className="text-gray-300 text-sm">{contactPhone}</p>
              </a>
            </div>

            {/* Address & Office Hours */}
            <div className="p-8 cinematic-card border-white/20 space-y-8">
              <div className="flex gap-4">
                <MapPin className="text-cinema-red-light shrink-0" size={24} />
                <div>
                  <h4 className="text-white font-bold mb-2">{t.visitUs}</h4>
                  <p className="text-gray-300 font-light leading-relaxed">
                    {address}
                  </p>
                  {mapUrl && (
                    <a href={mapUrl} target="_blank" rel="noreferrer" className="text-cinema-red text-sm hover:underline mt-2 inline-block font-bold">
                      {isRtl ? 'فتح في خرائط جوجل' : 'Open in Google Maps'}
                    </a>
                  )}
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="flex gap-4 mb-6">
                  <Clock className="text-cinema-red-light shrink-0" size={24} />
                  <h4 className="text-white font-bold">{t.officeHours}</h4>
                </div>
                <div className="space-y-3 text-sm font-light text-gray-300">
                  <div className="flex justify-between items-center bg-white/[0.05] p-4 rounded-xl border border-white/5">
                    <span>{schedule.weekdays}</span>
                    <span className="text-electric-blue font-bold tracking-wider">{schedule.weekdays_time || schedule.weekdaysTime}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/[0.05] p-4 rounded-xl border border-white/5">
                    <span>{schedule.saturday}</span>
                    <span className="text-electric-blue font-bold tracking-wider">{schedule.saturday_time || schedule.saturdayTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="relative">
             {/* Glow decorative */}
            <div className="absolute -inset-4 bg-cinema-red/10 blur-3xl opacity-20 pointer-events-none"></div>

            <div className="relative cinematic-card border-white/20 p-8 lg:p-12 shadow-2xl">
              <form 
                name="contact"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="contact" />
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">{t.fullName}</label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-cinema-red focus:border-cinema-red/50 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">{t.emailAddress}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-cinema-red focus:border-cinema-red/50 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-gray-300">{t.company}</label>
                    <input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-cinema-red focus:border-cinema-red/50 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-medium text-gray-300">{t.serviceNeeded}</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cinema-red focus:border-cinema-red/50 outline-none transition-all appearance-none"
                    >
                      <option value="" className="bg-gray-900">{t.selectService}</option>
                      {t.services.map(s => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">{t.message}</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-[#1F2937]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-cinema-red focus:border-cinema-red/50 outline-none transition-all resize-none"
                      placeholder={t.messagePlaceholder}
                    />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                    formStatus === 'sending' ? 'bg-gray-700 text-gray-400' : 
                    formStatus === 'success' ? 'bg-green-600 text-white' : 
                    'bg-cinema-red text-white hover:bg-cinema-red-hover shadow-[0_0_20px_rgba(220,38,38,0.2)]'
                  }`}
                >
                  {formStatus === 'sending' ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                  <span>
                    {formStatus === 'sending' ? (isRtl ? 'جاري الإرسال...' : 'Sending...') :
                     formStatus === 'success' ? (isRtl ? 'تم الإرسال بنجاح!' : 'Sent Successfully!') :
                     formStatus === 'error' ? (isRtl ? 'فشل الإرسال!' : 'Failed to send!') :
                     t.sendMessage}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}