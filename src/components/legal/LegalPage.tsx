import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/constants';

type LegalSection = {
  heading: string;
  body: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  updatedLabel: string;
  sections: LegalSection[];
  contactLabel: string;
  contactHref: string;
  contactCta: string;
};

export default function LegalPage({
  eyebrow,
  title,
  description,
  updatedLabel,
  sections,
  contactLabel,
  contactHref,
  contactCta,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gray-950 text-white">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-teal-400 mb-3">
              {eyebrow}
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              {description}
            </p>
            <p className="mt-5 text-sm text-white/60">{updatedLabel}</p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-lg shadow-sm p-6 sm:p-8">
            <div className="space-y-8">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {section.heading}
                  </h2>
                  <div className="space-y-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-lg bg-brand-blue-50 border border-brand-blue-100 p-5">
              <p className="font-semibold text-gray-900 mb-2">{contactLabel}</p>
              <p className="text-sm text-gray-600 mb-4">
                WhatsApp {CONTACT_INFO.whatsapp} | Email {CONTACT_INFO.email}
              </p>
              <Link
                href={contactHref}
                className="inline-flex items-center justify-center rounded-lg bg-brand-blue-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-700 transition-colors"
              >
                {contactCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
