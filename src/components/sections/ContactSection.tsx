import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Loader2 } from 'lucide-react';
import MediaBackground from '../common/MediaBackground';

interface ContactSectionProps {
  language: string;
}

export default function ContactSection({ language }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const content = {
    en: {
      title: 'Get In Touch',
      subtitle: 'Contact us when you choose TwinHub Media & AI Center. There\'s much to see here. So, take your time, look around, and learn all there is to know about us. We hope you enjoy our site and take a moment to drop us a line.',
      startConversation: 'Let\'s Start a Conversation',
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
      messagePlaceholder: 'Tell us about your project, goals, timeline, and any specific requirements...',
      sendMessage: 'Send Message',
      selectService: 'Select a service',
      services: [
        'AI Center',
        'Video Production',
        'Photography',
        'Post Production',
        'Creative Design',
        'Content Strategy',
        'Digital Media'
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
      subtitle: 'تواصل معنا عندما تختار TwinHub Media & AI Center. هناك الكثير لتراه هنا. لذا، خذ وقتك، انظر حولك، وتعلم كل ما يمكن معرفته عنا. نأمل أن تستمتع بموقعنا وأن تأخذ لحظة لتراسلنا.',
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
      messagePlaceholder: 'أخبرنا عن مشروعك وأهدافك والجدول الزمني وأي متطلبات محددة...',
      sendMessage: 'إرسال الرسالة',
      selectService: 'اختر خدمة',
      services: [
        'إنتاج الفيديو',
        'التصوير الفوتوغرافي',
        'ما بعد الإنتاج',
        'التصميم الإبداعي',
        'استراتيجية المحتوى',
        'الوسائط الرقمية'
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

  const t = content[language as keyof typeof content] || content.en;

  const handleSubmit = () => {
    // النموذج سيتم معالجته عن طريق Netlify تلقائياً بسبب data-netlify="true"
    // يمكننا إضافة بعض التأثيرات البصرية هنا إذا أردنا
    setFormStatus('sending');
    // لضمان عمل إعادة توجيه Netlify أو عرض رسالة النجاح الخاصة بها،
    // لا نقوم بـ e.preventDefault()، نترك Netlify يتولى الأمر
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 relative overflow-hidden">
      <MediaBackground
        backgroundImage="/backgrounds/contact/contact-bg.jpg"
        overlayOpacity={0.95}
        className="absolute inset-0"
      >
        {/* Cinematic Elements */}
        <div className="absolute top-1/3 left-1/4 opacity-5 pointer-events-none decorative-pulse">
          <img 
            src="/Twinhub Logo_Artboard 17-3_Artboard 17_Artboard 17.png"
            alt="Decorative M"
            className="h-64 w-auto"
          />
        </div>
        
        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
      </MediaBackground>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {t.title.split(' ')[0]} <span className="text-red-600">{t.title.split(' ')[1] || 'Touch'}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">{t.startConversation}</h3>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t.emailUs}</h4>
                  <p className="text-gray-600">info@twinhub.net</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t.whatsappUs}</h4>
                  <p className="text-gray-600">01007197170</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t.callUs}</h4>
                  <p className="text-gray-600">01007197170</p>
                  <p className="text-gray-600">+264355712</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{t.visitUs}</h4>
                  <p className="text-gray-600">47 Nagib Al Rihani, Town Down</p>
                  <p className="text-gray-600">Cairo Governorate 4320210, Egypt</p>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h4 className="font-bold text-gray-900 mb-4">{t.officeHours}</h4>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>{t.schedule.weekdays}</span>
                  <span>{t.schedule.weekdaysTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.schedule.saturday}</span>
                  <span>{t.schedule.saturdayTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.schedule.sunday}</span>
                  <span>{t.schedule.sundayTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <form 
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              {/* حقل مخفي ضروري لعمل Netlify Forms */}
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="subject" value="رسالة جديدة من موقع TwinHub" />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder={language === 'ar' ? 'اسمك' : 'Your name'}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    {t.emailAddress} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder={language === 'ar' ? 'بريدك@الإلكتروني.com' : 'your@email.com'}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
                    {t.company}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder={language === 'ar' ? 'شركتك' : 'Your company'}
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-gray-900 mb-2">
                    {t.serviceNeeded}
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">{t.selectService}</option>
                    {t.services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  {t.message} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder={t.messagePlaceholder}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className={`w-full py-4 px-8 rounded-xl font-semibold transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center ${
                  formStatus === 'sending' ? 'bg-gray-400 text-white cursor-wait' :
                  'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {formStatus === 'sending' ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {language === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {t.sendMessage}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}