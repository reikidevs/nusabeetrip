'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { getWhatsAppLink } from '@/lib/whatsapp';
import Image from 'next/image';

export default function ContactPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/WhatsApp%20Image%202026-04-19%20at%2019.45.00.jpeg"
            alt="Nusa Penida - Contact Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-900/85 via-brand-blue-800/75 to-brand-teal-900/85" />
        </div>

        <div className="container mx-auto px-4 py-28 md:py-40 relative">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/95 px-5 py-2 rounded-full text-sm font-semibold mb-8 border border-white/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {language === 'id' ? 'Kami siap membantu Anda' : 'We\'re here to help'}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              {t.contact.heading}
            </h1>
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-2xl mx-auto">
              {t.contact.subheading}
            </p>
          </div>
        </div>
      </section>

      {/* Primary CTA — WhatsApp */}
      <section className="relative -mt-14 z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <a
              href={getWhatsAppLink('services', language)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-whatsapp to-whatsapp-dark text-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex-shrink-0 w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-bold mb-1">
                  {language === 'id' ? 'Chat Langsung via WhatsApp' : 'Chat Directly via WhatsApp'}
                </h2>
                <p className="text-white/90">
                  {language === 'id'
                    ? 'Respon cepat untuk booking, pertanyaan, dan konsultasi perjalanan'
                    : 'Fast response for bookings, inquiries, and travel consultation'}
                </p>
              </div>
              <div className="flex-shrink-0 bg-white/20 rounded-xl px-6 py-3 font-semibold group-hover:bg-white/30 transition-colors">
                +62 896-3128-1234
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-800 mb-4 tracking-tight">
                {language === 'id' ? 'Cara Menghubungi Kami' : 'Ways to Reach Us'}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {language === 'id'
                  ? 'Pilih cara yang paling nyaman untuk Anda'
                  : 'Choose the most convenient way for you'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Phone */}
              <a
                href="tel:+6289631281234"
                className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-brand-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-blue-800 mb-2">{t.contact.phone}</h3>
                <p className="text-gray-600 font-medium mb-3">+62 896-3128-1234</p>
                <p className="text-sm text-gray-400">
                  {language === 'id' ? 'Langsung terhubung' : 'Direct connection'}
                </p>
              </a>

              {/* Email */}
              <a
                href="mailto:sidiqdwiatmoko@gmail.com"
                className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-brand-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-blue-800 mb-2">{t.contact.email}</h3>
                <p className="text-gray-600 font-medium mb-3 break-all">sidiqdwiatmoko@gmail.com</p>
                <p className="text-sm text-gray-400">
                  {language === 'id' ? 'Kirim pesan kapan saja' : 'Send a message anytime'}
                </p>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/sidiq_1312"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-blue-800 mb-2">{t.contact.instagram}</h3>
                <p className="text-gray-600 font-medium mb-3">@sidiq_1312</p>
                <p className="text-sm text-gray-400">
                  {language === 'id' ? 'Ikuti kami di Instagram' : 'Follow us on Instagram'}
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section: Hours + Location + FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">

              {/* Left: Location & Hours */}
              <div className="space-y-8">
                {/* Operating Hours */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-brand-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-brand-blue-800 mb-4">
                        {language === 'id' ? 'Jam Operasional' : 'Operating Hours'}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">
                            {language === 'id' ? 'Tur & Rental' : 'Tours & Rentals'}
                          </span>
                          <span className="text-brand-blue-800 font-semibold">06:00 – 22:00</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">WhatsApp</span>
                          <span className="text-whatsapp font-semibold">24/7</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600 font-medium">
                            {language === 'id' ? 'Zona Waktu' : 'Timezone'}
                          </span>
                          <span className="text-gray-800 font-semibold">WITA (GMT+8)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-brand-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-brand-blue-800 mb-3">
                        {language === 'id' ? 'Lokasi Kami' : 'Our Location'}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Nusa Penida, Klungkung Regency,<br />
                        Bali, Indonesia
                      </p>
                      <p className="text-sm text-gray-400 mt-3">
                        {language === 'id'
                          ? 'Penjemputan tersedia di seluruh area Nusa Penida'
                          : 'Pickup available across all Nusa Penida areas'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: FAQ */}
              <div>
                <h2 className="text-3xl font-bold text-brand-blue-800 mb-8">
                  {language === 'id' ? 'Pertanyaan Umum' : 'Common Questions'}
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      q: language === 'id' ? 'Bagaimana cara booking tur?' : 'How do I book a tour?',
                      a: language === 'id'
                        ? 'Cukup hubungi kami via WhatsApp, sebutkan paket tur yang diinginkan, tanggal, dan jumlah peserta. Kami akan mengkonfirmasi ketersediaan dalam hitungan menit.'
                        : 'Simply contact us via WhatsApp, mention your desired tour package, date, and number of participants. We\'ll confirm availability within minutes.',
                    },
                    {
                      q: language === 'id' ? 'Apakah bisa jemput di hotel?' : 'Can you pick me up from my hotel?',
                      a: language === 'id'
                        ? 'Ya! Kami menyediakan penjemputan gratis dari hotel atau akomodasi Anda di area Nusa Penida.'
                        : 'Yes! We provide free pickup from your hotel or accommodation in the Nusa Penida area.',
                    },
                    {
                      q: language === 'id' ? 'Metode pembayaran apa yang diterima?' : 'What payment methods do you accept?',
                      a: language === 'id'
                        ? 'Kami menerima pembayaran cash (IDR) dan transfer bank. Pembayaran dilakukan langsung pada hari tur/rental.'
                        : 'We accept cash (IDR) and bank transfer. Payment is made directly on the day of the tour/rental.',
                    },
                    {
                      q: language === 'id' ? 'Apakah tur bisa dibatalkan?' : 'Can I cancel my tour?',
                      a: language === 'id'
                        ? 'Pembatalan gratis hingga 24 jam sebelum jadwal tur. Hubungi kami via WhatsApp untuk pembatalan atau perubahan jadwal.'
                        : 'Free cancellation up to 24 hours before your tour. Contact us via WhatsApp for cancellation or rescheduling.',
                    },
                  ].map((faq, i) => (
                    <details
                      key={i}
                      className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-100 transition-colors">
                        <span className="font-semibold text-brand-blue-800 pr-4">{faq.q}</span>
                        <svg className="w-5 h-5 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Map / CTA Section */}
      <section className="relative text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/WhatsApp%20Image%202026-04-19%20at%2019.45.01%20(2).jpeg"
            alt="Nusa Penida Beach"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-900/90 to-brand-teal-800/90" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {language === 'id' ? 'Mulai Petualangan Anda' : 'Start Your Adventure'}
            </h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
              {language === 'id'
                ? 'Satu pesan saja untuk memulai perjalanan Nusa Penida yang tak terlupakan'
                : 'Just one message away from an unforgettable Nusa Penida journey'}
            </p>
            <a
              href={getWhatsAppLink('services', language)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp-dark text-white px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              {t.common.bookViaWhatsApp}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}