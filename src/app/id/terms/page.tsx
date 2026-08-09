import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo';
import LegalPage from '@/components/legal/LegalPage';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Syarat & Ketentuan',
  description:
    'Syarat dan ketentuan NusaBeeTrip untuk tour, snorkeling, rental kendaraan, booking, pembatalan, pembayaran, dan tanggung jawab tamu.',
  path: '/id/terms',
  keywords: ['syarat ketentuan nusabeetrip', 'syarat tour nusa penida', 'syarat rental nusa penida'],
});

const sections = [
  {
    heading: 'Booking',
    body: [
      'Booking dikonfirmasi setelah kami memeriksa ketersediaan melalui WhatsApp, email, telepon, atau channel resmi NusaBeeTrip lainnya.',
      'Mohon berikan tanggal perjalanan, jumlah peserta, lokasi penjemputan, dan detail kontak yang akurat. Informasi yang terlambat atau tidak tepat dapat memengaruhi waktu jemput, rencana rute, atau ketersediaan layanan.',
    ],
  },
  {
    heading: 'Harga dan pembayaran',
    body: [
      'Harga ditampilkan dalam IDR kecuali disebutkan lain. Inklusi paket dapat berbeda sesuai layanan dan akan dikonfirmasi sebelum booking.',
      'Syarat pembayaran disepakati saat konfirmasi. Beberapa layanan dapat memerlukan deposit, sementara layanan lain dapat dibayar pada hari layanan.',
    ],
  },
  {
    heading: 'Pembatalan dan perubahan',
    body: [
      'Jika perlu membatalkan atau mengubah jadwal, hubungi kami sedini mungkin. Kami akan membantu selama ketersediaan memungkinkan.',
      'Cuaca, kondisi laut, penutupan jalan, upacara adat, atau alasan keselamatan dapat membuat rute berubah, jadwal diganti, atau layanan dibatalkan. Keputusan keselamatan dibuat oleh tim lokal.',
    ],
  },
  {
    heading: 'Tanggung jawab tamu',
    body: [
      'Tamu bertanggung jawab mengikuti instruksi pemandu, memakai alat keselamatan saat disediakan, menghormati aturan lokal, dan datang tepat waktu untuk penjemputan atau serah terima kendaraan.',
      'Untuk rental kendaraan, tamu harus diizinkan secara hukum dan mampu mengemudi. Kerusakan, denda, keterlambatan pengembalian, atau penyalahgunaan dapat menimbulkan biaya tambahan.',
    ],
  },
  {
    heading: 'Batasan layanan',
    body: [
      'Kami berupaya menyediakan tour dan rental yang andal, tetapi perjalanan di Nusa Penida dapat dipengaruhi cuaca, lalu lintas, kondisi laut, dan acara lokal di luar kendali kami.',
      'NusaBeeTrip tidak bertanggung jawab atas kerugian tidak langsung, koneksi pihak ketiga yang terlewat, atau biaya pribadi akibat keterlambatan atau kondisi di luar kendali wajar kami.',
    ],
  },
  {
    heading: 'Konten Google Maps',
    body: [
      <>
        Profil Google Maps, formulir ulasan, dan panel ulasan publik merupakan layanan Google. Penggunaannya juga tunduk pada{' '}
        <a
          href="https://maps.google.com/help/terms_maps/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-blue-700 underline underline-offset-2"
        >
          Persyaratan Layanan Tambahan Google Maps/Google Earth
        </a>{' '}
        dan{' '}
        <a
          href="https://policies.google.com/terms?hl=id"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-blue-700 underline underline-offset-2"
        >
          Persyaratan Layanan Google
        </a>
        ,{' '}
        <a
          href="https://cloud.google.com/maps-platform/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-blue-700 underline underline-offset-2"
        >
          Persyaratan Layanan Google Maps Platform
        </a>
        , dan{' '}
        <a
          href="https://cloud.google.com/maps-platform/terms/maps-service-terms"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-blue-700 underline underline-offset-2"
        >
          Persyaratan Khusus Layanan Google Maps Platform
        </a>
        .
      </>,
      'Google memilih dan mengurutkan ulasan publik yang dikembalikan. NusaBeeTrip tidak menyatakan konten ulasan Google sebagai ulasan website dan tidak menjamin semua ulasan Google akan tampil di website ini.',
    ],
  },
];

export default function TermsPageId() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumbs-terms-id"
        data={breadcrumbJsonLd([
          { name: 'Beranda', path: '/id' },
          { name: 'Syarat & Ketentuan', path: '/id/terms' },
        ])}
      />
      <LegalPage
        eyebrow="Legal"
        title="Syarat & Ketentuan"
        description="Syarat booking untuk tour, snorkeling, rental kendaraan, pembayaran, dan pembatalan bersama NusaBeeTrip."
        updatedLabel="Terakhir diperbarui: 8 Agustus 2026"
        sections={sections}
        contactLabel="Ada pertanyaan sebelum booking?"
        contactHref="/id/contact"
        contactCta="Hubungi NusaBeeTrip"
      />
    </>
  );
}
