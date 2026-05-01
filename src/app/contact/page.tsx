'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function ContactPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-800 to-brand-teal-600"></div>
        </div>

        <div className="container mx-auto px-4 py-24 md:py-36 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              {t.contact.heading}
            </h1>
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-2xl mx-auto">
              {t.contact.subheading}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Phone Card */}
            <a 
              href="tel:+6289631281234"
              className="group bg-gradient-to-br from-brand-blue-700 to-brand-blue-800 text-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t.contact.phone}</h3>
              <p className="text-white/95">+62 896-3128-1234</p>
            </a>
            
            {/* WhatsApp Card */}
            <a 
              href={getWhatsAppLink('services', language)}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-whatsapp to-whatsapp-dark text-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t.contact.whatsapp}</h3>
              <p className="text-white/95">+62 896-3128-1234</p>
            </a>
            
            {/* Email Card */}
            <a 
              href="mailto:sidiqdwiatmoko@gmail.com"
              className="group bg-gradient-to-br from-brand-teal-600 to-brand-teal-700 text-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t.contact.email}</h3>
              <p className="text-white/95">sidiqdwiatmoko@gmail.com</p>
            </a>
            
            {/* Instagram Card */}
            <a 
              href="https://instagram.com/nusabeetrip"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-pink-500 via-purple-500 to-purple-600 text-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t.contact.instagram}</h3>
              <p className="text-white/95">@nusabeetrip</p>
            </a>
          </div>

          {/* Additional Info */}
          <div className="max-w-3xl mx-auto mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-brand-blue-800 mb-4">
                {language === 'id' ? 'Jam Operasional' : 'Operating Hours'}
              </h3>
              <p className="text-gray-600 text-lg mb-2">
                {language === 'id' ? 'Setiap hari: 06:00 - 22:00 WITA' : 'Daily: 6:00 AM - 10:00 PM WITA'}
              </p>
              <p className="text-gray-500">
                {language === 'id' 
                  ? 'WhatsApp tersedia 24/7 untuk pertanyaan dan booking' 
                  : 'WhatsApp available 24/7 for inquiries and bookings'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}