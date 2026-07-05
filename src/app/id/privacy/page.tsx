import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo';
import LegalPage from '@/components/legal/LegalPage';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Kebijakan Privasi',
  description:
    'Kebijakan privasi NusaBeeTrip untuk booking, pertanyaan WhatsApp, formulir kontak, ulasan, analytics, dan dukungan pelanggan di Nusa Penida.',
  path: '/id/privacy',
  keywords: ['kebijakan privasi nusabeetrip', 'privasi tour nusa penida'],
});

const sections = [
  {
    heading: 'Informasi yang kami kumpulkan',
    body: [
      'Kami mengumpulkan detail yang Anda kirim saat menghubungi kami, meminta booking, mengirim ulasan, atau bertanya. Informasi ini dapat mencakup nama, nomor WhatsApp, email, tanggal perjalanan, jumlah peserta, area penjemputan, dan catatan booking.',
      'Kami juga dapat mengumpulkan analytics website dasar seperti halaman yang dikunjungi, jenis perangkat, perkiraan lokasi, dan klik tombol booking untuk membantu meningkatkan website dan layanan.',
    ],
  },
  {
    heading: 'Cara kami menggunakan informasi',
    body: [
      'Kami menggunakan informasi Anda untuk menjawab pertanyaan, mengatur tour atau rental, memastikan ketersediaan, memberi dukungan pelanggan, dan memperbaiki website NusaBeeTrip.',
      'Kami tidak menjual informasi pribadi. Detail booking hanya dibagikan kepada tim lokal atau partner layanan jika diperlukan untuk menjalankan tour, rental, penjemputan, atau dukungan yang Anda minta.',
    ],
  },
  {
    heading: 'WhatsApp dan layanan pihak ketiga',
    body: [
      'Sebagian besar booking dilakukan melalui WhatsApp. Saat Anda mengirim pesan di WhatsApp, data Anda diproses berdasarkan kebijakan privasi WhatsApp.',
      'Kami dapat memakai layanan email, hosting, database, analytics, atau formulir untuk menjalankan website. Penyedia tersebut memproses data untuk operasional, keamanan, komunikasi, dan penyampaian layanan.',
    ],
  },
  {
    heading: 'Penyimpanan data',
    body: [
      'Kami menyimpan detail booking dan pertanyaan selama diperlukan untuk dukungan pelanggan, pencatatan, kualitas layanan, penanganan masalah, dan kewajiban hukum.',
      'Anda dapat meminta pembaruan atau penghapusan detail kontak kecuali data tersebut masih diperlukan untuk booking aktif, keselamatan, catatan pembayaran, atau alasan hukum.',
    ],
  },
  {
    heading: 'Kontak',
    body: [
      'Jika ada pertanyaan privasi atau ingin meminta pembaruan informasi, hubungi NusaBeeTrip melalui halaman kontak.',
    ],
  },
];

export default function PrivacyPageId() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumbs-privacy-id"
        data={breadcrumbJsonLd([
          { name: 'Beranda', path: '/id' },
          { name: 'Kebijakan Privasi', path: '/id/privacy' },
        ])}
      />
      <LegalPage
        eyebrow="Legal"
        title="Kebijakan Privasi"
        description="Cara NusaBeeTrip menangani pertanyaan booking, detail kontak, ulasan, dan analytics website."
        updatedLabel="Terakhir diperbarui: 5 Juli 2026"
        sections={sections}
        contactLabel="Butuh bantuan terkait data Anda?"
        contactHref="/id/contact"
        contactCta="Hubungi NusaBeeTrip"
      />
    </>
  );
}
