/**
 * Generates the client-facing SEO performance report and 90-day roadmap.
 *
 * Run:
 *   .\\node_modules\\.bin\\tsx.cmd scripts\\generate-seo-client-report.ts
 *
 * Output:
 *   docs/laporan-seo/LAPORAN-SEO-NUSABEETRIP-BULAN-1-3-DAN-RENCANA-4-6.docx
 */

import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  Footer,
  Header,
  HeadingLevel,
  ImageRun,
  LevelFormat,
  Packer,
  PageNumber,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from 'docx';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const NAVY = '17365D';
const BLUE = '2563EB';
const TEAL = '0F766E';
const GOLD = 'D97706';
const INK = '1F2937';
const MUTED = '64748B';
const LINE = 'D7DEE8';
const PALE_BLUE = 'EFF6FF';
const PALE_TEAL = 'ECFDF5';
const PALE_GOLD = 'FFFBEB';
const PALE_GRAY = 'F8FAFC';
const WHITE = 'FFFFFF';
const CONTENT_WIDTH = 9746;

type DocElement = Paragraph | Table;

const noBorder = { style: BorderStyle.NONE, size: 0, color: WHITE };
const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: LINE };

function run(
  text: string,
  options: {
    bold?: boolean;
    italics?: boolean;
    color?: string;
    size?: number;
  } = {},
) {
  return new TextRun({
    text,
    bold: options.bold,
    italics: options.italics,
    color: options.color ?? INK,
    size: options.size ?? 21,
    font: 'Arial',
  });
}

function body(text: string, options: { bold?: boolean; italics?: boolean; after?: number } = {}) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: options.after ?? 130, line: 300 },
    children: [run(text, { bold: options.bold, italics: options.italics })],
  });
}

function richBody(children: TextRun[], after = 130) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after, line: 300 },
    children,
  });
}

function heading(text: string, level: 1 | 2 | 3 = 1) {
  const headingLevel =
    level === 1
      ? HeadingLevel.HEADING_1
      : level === 2
        ? HeadingLevel.HEADING_2
        : HeadingLevel.HEADING_3;
  const sizes = { 1: 34, 2: 27, 3: 23 };
  const colors = { 1: NAVY, 2: TEAL, 3: BLUE };

  return new Paragraph({
    heading: headingLevel,
    keepNext: true,
    spacing: {
      before: level === 1 ? 360 : level === 2 ? 260 : 200,
      after: level === 1 ? 160 : 110,
    },
    children: [run(text, { bold: true, color: colors[level], size: sizes[level] })],
  });
}

function bullet(text: string, level = 0) {
  return new Paragraph({
    numbering: { reference: 'report-bullets', level },
    spacing: { after: 80, line: 290 },
    children: [run(text)],
  });
}

function numbered(text: string) {
  return new Paragraph({
    numbering: { reference: 'report-numbers', level: 0 },
    spacing: { after: 90, line: 290 },
    children: [run(text)],
  });
}

function spacer(after = 120) {
  return new Paragraph({ spacing: { after }, children: [run(' ', { size: 4 })] });
}

function pageBreak() {
  return new Paragraph({ pageBreakBefore: true, children: [run(' ', { size: 2 })] });
}

function callout(title: string, lines: string[], fill = PALE_BLUE, accent = BLUE) {
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    borders: {
      top: thinBorder,
      bottom: thinBorder,
      left: { style: BorderStyle.SINGLE, size: 20, color: accent },
      right: thinBorder,
      insideHorizontal: noBorder,
      insideVertical: noBorder,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: CONTENT_WIDTH, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, color: 'auto', fill },
            margins: { top: 160, right: 180, bottom: 150, left: 220 },
            children: [
              new Paragraph({
                spacing: { after: 80 },
                children: [run(title, { bold: true, color: accent, size: 23 })],
              }),
              ...lines.map(
                (line) =>
                  new Paragraph({
                    spacing: { after: 55, line: 280 },
                    children: [run(line, { size: 20 })],
                  }),
              ),
            ],
          }),
        ],
      }),
    ],
  });
}

function tableCell(
  text: string,
  width: number,
  options: {
    header?: boolean;
    bold?: boolean;
    fill?: string;
    color?: string;
    align?: (typeof AlignmentType)[keyof typeof AlignmentType];
  } = {},
) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    verticalAlign: VerticalAlign.CENTER,
    shading: options.fill
      ? { type: ShadingType.CLEAR, color: 'auto', fill: options.fill }
      : undefined,
    margins: { top: 105, right: 105, bottom: 105, left: 105 },
    children: [
      new Paragraph({
        alignment: options.align ?? AlignmentType.LEFT,
        spacing: { after: 0, line: 250 },
        children: [
          run(text, {
            bold: options.header || options.bold,
            color: options.color ?? (options.header ? WHITE : INK),
            size: options.header ? 19 : 19,
          }),
        ],
      }),
    ],
  });
}

function infoTable(headers: string[], rows: string[][], widths: number[], highlightLast = false) {
  const rowsToRender = [
    new TableRow({
      tableHeader: true,
      children: headers.map((header, index) =>
        tableCell(header, widths[index], {
          header: true,
          fill: NAVY,
          align: index > 0 && headers.length > 2 ? AlignmentType.CENTER : AlignmentType.LEFT,
        }),
      ),
    }),
    ...rows.map(
      (row, rowIndex) =>
        new TableRow({
          children: row.map((value, index) =>
            tableCell(value, widths[index], {
              bold: index === 0 || (highlightLast && rowIndex === rows.length - 1),
              fill:
                highlightLast && rowIndex === rows.length - 1
                  ? PALE_TEAL
                  : rowIndex % 2 === 0
                    ? PALE_GRAY
                    : WHITE,
              align: index > 0 && /^([\d,.%+\-]|Top|Aktif|Siap)/.test(value)
                ? AlignmentType.CENTER
                : AlignmentType.LEFT,
            }),
          ),
        }),
    ),
  ];

  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    borders: {
      top: thinBorder,
      bottom: thinBorder,
      left: thinBorder,
      right: thinBorder,
      insideHorizontal: thinBorder,
      insideVertical: thinBorder,
    },
    rows: rowsToRender,
  });
}

function metricCards() {
  const cardWidth = Math.floor(CONTENT_WIDTH / 5);
  const cards = [
    ['5.460', 'Tayangan'],
    ['44', 'Klik'],
    ['0,8%', 'CTR'],
    ['20,2', 'Posisi rata-rata'],
    ['459', 'Variasi kueri'],
  ];

  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    borders: {
      top: thinBorder,
      bottom: thinBorder,
      left: thinBorder,
      right: thinBorder,
      insideHorizontal: thinBorder,
      insideVertical: thinBorder,
    },
    rows: [
      new TableRow({
        children: cards.map(
          ([value, label], index) =>
            new TableCell({
              width: {
                size: index === cards.length - 1 ? CONTENT_WIDTH - cardWidth * 4 : cardWidth,
                type: WidthType.DXA,
              },
              verticalAlign: VerticalAlign.CENTER,
              shading: {
                type: ShadingType.CLEAR,
                color: 'auto',
                fill: index % 2 === 0 ? PALE_BLUE : PALE_TEAL,
              },
              margins: { top: 150, right: 80, bottom: 145, left: 80 },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { after: 55 },
                  children: [run(value, { bold: true, color: NAVY, size: 30 })],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [run(label, { color: MUTED, size: 17 })],
                }),
              ],
            }),
        ),
      }),
    ],
  });
}

function cover(): DocElement[] {
  const logoPath = join(process.cwd(), 'public', 'images', 'NusaBeeTrip-Logo-final.png');
  const logo = readFileSync(logoPath);

  return [
    spacer(340),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 260 },
      children: [
        new ImageRun({
          data: logo,
          transformation: { width: 190, height: 104 },
          type: 'png',
          altText: {
            title: 'NusaBeeTrip',
            description: 'Logo NusaBeeTrip',
            name: 'NusaBeeTrip logo',
          },
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [run('LAPORAN PERFORMA SEO', { bold: true, color: NAVY, size: 48 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 340 },
      children: [run('& RENCANA PERTUMBUHAN 90 HARI', { bold: true, color: TEAL, size: 29 })],
    }),
    callout(
      'Periode laporan',
      [
        'Kinerja: Mei-5 Agustus 2026 (bulan ke-1 s.d. ke-3)',
        'Rencana kerja: bulan ke-4 s.d. ke-6',
        'Referensi invoice: RD-000001007',
      ],
      PALE_BLUE,
      BLUE,
    ),
    spacer(320),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [run('Disusun oleh', { color: MUTED, size: 18 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 45 },
      children: [
        run('PT. Reikidevs Inovasi Teknologi Perorangan', {
          bold: true,
          color: NAVY,
          size: 23,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 45 },
      children: [run('Solusi Digital Layanan IT  |  reikidevs.com', { color: MUTED, size: 18 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [run('8 Agustus 2026  •  Dokumen pendamping invoice bulan ke-4', { color: GOLD, size: 17 })],
    }),
    pageBreak(),
  ];
}

function executiveSummary(): DocElement[] {
  return [
    heading('1. Ringkasan Eksekutif'),
    body(
      'Dalam tiga bulan pertama, pekerjaan difokuskan pada pembangunan fondasi teknis, pembuatan halaman layanan dan panduan, serta pembentukan relevansi awal di Google. Berdasarkan rekap Google Search Console sampai 5 Agustus 2026, website telah memperoleh 5.460 tayangan, 44 klik, dan tercatat pada 459 variasi kueri, dari kondisi awal yang belum memiliki visibilitas organik berarti.',
    ),
    metricCards(),
    spacer(120),
    body(
      'Data tersebut menunjukkan bahwa Google sudah menemukan dan mulai menampilkan halaman-halaman NusaBeeTrip. Namun, visibilitas untuk kueri sangat umum seperti “nusa penida” belum tinggi atau konsisten. Fase berikutnya perlu memperkuat relevansi halaman prioritas, tingkat klik, otoritas domain, dan keterlihatan bisnis lokal.',
    ),
    heading('Fokus bulan ke-4 sampai ke-6', 2),
    numbered('Mendorong klaster kueri Ubud dan kueri komersial terpilih.'),
    numbered('Memperbaiki judul, deskripsi, dan isi halaman yang sudah memperoleh tayangan.'),
    numbered('Memperkuat Google Business Profile, ulasan asli, foto, dan konsistensi informasi bisnis.'),
    numbered('Membangun citation dan backlink relevan secara bertahap.'),
    numbered('Mengukur klik non-brand, prospek WhatsApp, dan performa lokal—bukan hanya satu pencarian manual.'),
    spacer(80),
    callout(
      'Komitmen yang dapat dipertanggungjawabkan',
      [
        'Top 5 digunakan sebagai sasaran optimasi untuk kueri terpilih, bukan jaminan.',
        'Peringkat dapat berubah berdasarkan kompetisi, lokasi, bahasa, perangkat, dan perilaku pencarian.',
        'Yang dijanjikan adalah aktivitas, transparansi data, serta evaluasi dan perbaikan berkelanjutan.',
      ],
      PALE_GOLD,
      GOLD,
    ),
  ];
}

function methodologyAndPerformance(): DocElement[] {
  return [
    heading('2. Sumber Data dan Cara Membaca Laporan'),
    bullet('Sumber utama: Google Search Console, jenis penelusuran Web, rekap sampai 5 Agustus 2026.'),
    bullet('Angka mencakup seluruh negara dan perangkat sesuai rekap yang tersedia.'),
    bullet('Jumlah kueri dapat berubah ketika Google memproses data baru. Screenshot 2 Agustus dapat menampilkan 456 baris, sedangkan rekap 5 Agustus mencatat 459 baris.'),
    bullet('Posisi rata-rata 20,2 adalah angka agregat seluruh tayangan, bukan peringkat tetap setiap kata kunci.'),
    bullet('Hasil manual dapat berbeda menurut lokasi, bahasa, perangkat, akun, dan riwayat pencarian.'),
    bullet('Sebagian kueri dapat dianonimkan Google; jumlah baris kueri bukan inventaris absolut.'),
    heading('3. Capaian Performa Organik'),
    infoTable(
      ['Metrik', 'Capaian', 'Makna'],
      [
        ['Total tayangan', '5.460', 'Halaman NusaBeeTrip telah tampil pada hasil pencarian'],
        ['Total klik', '44', 'Kunjungan organik yang tercatat dari Google'],
        ['CTR rata-rata', '0,8%', 'Masih memiliki ruang perbaikan pada snippet dan posisi'],
        ['Posisi rata-rata', '20,2', 'Angka agregat seluruh tayangan, bukan posisi tetap'],
        ['Variasi kueri', '459', 'Topik pencarian yang mulai memunculkan website'],
      ],
      [2600, 1500, 5646],
    ),
    spacer(120),
    body(
      'Tren tayangan meningkat sejak pertengahan Juni dan mencapai ratusan tayangan harian pada beberapa hari di Juli-Agustus. Penilaian berikutnya akan membandingkan 28 hari terakhir dengan 28 hari sebelumnya agar target bulanan dinilai secara setara.',
    ),
  ];
}

function completedWork(): DocElement[] {
  return [
    heading('4. Pekerjaan yang Sudah Diselesaikan'),
    heading('4.1 Fondasi teknis', 2),
    infoTable(
      ['Pekerjaan', 'Status', 'Manfaat'],
      [
        ['Sitemap otomatis', 'Aktif', 'Membantu Google menemukan URL prioritas'],
        ['Image sitemap', 'Aktif', 'Membantu penemuan foto melalui Google Images'],
        ['Robots.txt', 'Aktif', 'Menyediakan arahan crawling dan referensi sitemap'],
        ['Canonical & hreflang EN/ID', 'Aktif', 'Membantu memahami URL utama dan versi bahasa'],
        ['Structured data', 'Aktif', 'Eligibility fitur hasil kaya; kemunculan tidak dijamin'],
        ['Halaman dua bahasa', 'Aktif', 'Melayani pasar Indonesia dan internasional'],
      ],
      [2850, 1400, 5496],
    ),
    heading('4.2 Konten, integrasi, dan pemantauan', 2),
    bullet('16 artikel panduan wisata dalam bahasa Inggris dan Indonesia.'),
    bullet('7 halaman destinasi: Kelingking, Diamond, Broken Beach, Angel Billabong, Atuh, Crystal Bay, dan Tree House Molenteng.'),
    bullet('Halaman detail tour, rental, Bali Day Trip, kontak, profil bisnis, dan informasi pemesanan.'),
    bullet('Google Search Console, Google Business Profile, Bing Webmaster Tools, dan dashboard internal /admin/seo.'),
    heading('4.3 Optimasi awal bulan ke-4 yang telah disiapkan', 2),
    bullet('Judul dan panduan Ubud-Nusa Penida diperkuat untuk jarak, waktu, fast boat, day trip, dan rute kembali.'),
    bullet('FAQ ditambah berdasarkan pertanyaan yang muncul di GSC.'),
    bullet('Internal link menuju panduan Ubud ditambah dari homepage, Bali Day Trip, dan halaman tour relevan.'),
    bullet('Judul serta subjudul destinasi dibuat lebih spesifik untuk setiap lokasi.'),
    bullet('Tanggal pembaruan sitemap dan metadata diselaraskan dengan revisi konten.'),
    callout(
      'Cara mengukur dampaknya',
      [
        'Perubahan SEO memerlukan waktu untuk dipublikasikan, dirayapi ulang, dan menghasilkan data.',
        'Evaluasi dilakukan setelah data Search Console cukup—bukan sesaat setelah perubahan kode.',
      ],
      PALE_BLUE,
      BLUE,
    ),
  ];
}

function ubudOpportunity(): DocElement[] {
  return [
    pageBreak(),
    heading('5. Peluang Terbesar: Klaster Kueri Ubud'),
    richBody([
      run('Seluruh variasi kueri yang memuat kata “Ubud” menghasilkan sekitar '),
      run('920 tayangan', { bold: true, color: BLUE }),
      run(', atau kurang lebih '),
      run('16,8% dari total tayangan', { bold: true, color: TEAL }),
      run('. Delapan kueri utama berikut mewakili 664 tayangan; sisanya berasal dari variasi Ubud lain dalam rekap.'),
    ]),
    infoTable(
      ['Kueri utama', 'Tayangan', 'Klik'],
      [
        ['ubud to nusa penida', '342', '1'],
        ['ubud to nusa penida distance', '73', '0'],
        ['nusa penida to ubud', '64', '0'],
        ['how far is nusa penida from ubud', '50', '0'],
        ['nusa penida from ubud', '50', '0'],
        ['nusa penida day trip from ubud', '42', '0'],
        ['ubud to nusa penida day trip', '25', '0'],
        ['nusa penida tour from ubud', '18', '0'],
        ['Jumlah delapan kueri utama', '664', '1'],
      ],
      [6746, 1500, 1500],
      true,
    ),
    spacer(120),
    body(
      'Klaster ini menunjukkan minat relevan terhadap rute Ubud-Nusa Penida dan berpotensi memiliki intent perjalanan atau komersial. Strateginya bukan membuat banyak artikel serupa, melainkan mengonsolidasikan intent pada satu halaman utama, memperkuat informasi jarak, waktu, biaya, itinerary, dan CTA WhatsApp, kemudian menambah internal link serta mention eksternal yang relevan.',
    ),
    callout(
      'Kontrol cannibalization',
      [
        'Pemetaan kueri ke URL akan diverifikasi melalui tab Pages di GSC.',
        'Satu intent utama diarahkan ke satu URL agar halaman NusaBeeTrip tidak saling bersaing.',
      ],
      PALE_TEAL,
      TEAL,
    ),
  ];
}

function nusaPenidaExplanation(): DocElement[] {
  return [
    heading('6. Penjelasan Kueri “Nusa Penida”'),
    callout(
      'Data periode laporan',
      ['Kueri tepat “nusa penida”: 33 tayangan dan 0 klik.', 'Artinya website pernah ditampilkan, tetapi visibilitasnya belum tinggi atau konsisten.'],
      PALE_BLUE,
      BLUE,
    ),
    spacer(110),
    body(
      'Kueri “nusa penida” sangat luas: pengguna dapat mencari informasi pulau, peta, cuaca, destinasi, fast boat, penginapan, atau tour. Persaingannya melibatkan portal wisata besar, marketplace, direktori, dan sumber informasi mapan. Karena itu, kueri ini dipertahankan sebagai sasaran otoritas jangka menengah, bukan satu-satunya ukuran keberhasilan tiga bulan pertama.',
    ),
    body(
      'Pengecekan manual dari Tegal juga tidak mewakili seluruh pasar Nusa Penida. Untuk hasil Google Maps, lokasi pencari merupakan salah satu faktor utama. Pengukuran lokal sebaiknya dilakukan pada titik konsisten di sekitar Nusa Penida/Bali, sedangkan hasil organik dipantau melalui GSC.',
    ),
    heading('Prioritas kueri yang lebih dekat ke pemesanan', 2),
    bullet('ubud to nusa penida dan variasi day tour/distance;'),
    bullet('scooter rental nusa penida dan car rental nusa penida;'),
    bullet('nusa penida tour price/cost;'),
    bullet('west trip nusa penida dan east trip nusa penida.'),
    heading('7. Peluang Komersial Lain'),
    infoTable(
      ['Klaster', 'Sinyal awal', 'Tindakan berikutnya'],
      [
        ['Rental kendaraan', '±120 tayangan; klik rendah', 'Harga, syarat, delivery, SIM, deposit, bensin, helm, foto asli'],
        ['Harga tour', 'Kueri price/cost mulai tercatat', 'Harga, included/excluded, pickup, dan CTA'],
        ['East/West Trip', 'Nama produk mulai muncul', 'Landing page, galeri asli, FAQ, dan internal link'],
        ['Brand NusaBeeTrip', '24 tayangan; 3 klik', 'Konsistensi nama pada GBP, Instagram, direktori, partner'],
      ],
      [2300, 2500, 4946],
    ),
  ];
}

function roadmap(): DocElement[] {
  return [
    pageBreak(),
    heading('8. Rencana Kerja Bulan ke-4 sampai ke-6'),
    heading('Bulan ke-4 — Validasi, indeks, dan local SEO', 2),
    bullet('Publikasikan optimasi Ubud dan halaman prioritas lain.'),
    bullet('URL Inspection dan request indexing untuk homepage, Ubud, rental, serta tour utama.'),
    bullet('Tetapkan baseline 28 hari untuk klik non-brand, CTR, posisi, dan klik WhatsApp.'),
    bullet('Verifikasi event WhatsApp, telepon, dan formulir; gunakan UTM pada GBP dan Instagram.'),
    bullet('Selaraskan nama, alamat, telepon, kategori, serta jam operasional pada seluruh kanal.'),
    bullet('Mulai SOP permintaan ulasan asli maksimal 24 jam setelah trip selesai.'),
    heading('Bulan ke-5 — Konten komersial dan otoritas', 2),
    bullet('Perdalam halaman Ubud dengan jarak, waktu, estimasi biaya, itinerary, dan foto asli.'),
    bullet('Lengkapi halaman rental dengan persyaratan dan pertanyaan yang paling sering muncul.'),
    bullet('Pastikan setiap halaman prioritas menerima minimal tiga internal link kontekstual.'),
    bullet('Bangun citation konsisten dan outreach ke hotel/villa Ubud, fast boat, blogger Bali, serta partner lokal.'),
    bullet('Hindari backlink massal, PBN, dan pembelian link manipulatif.'),
    heading('Bulan ke-6 — Konsolidasi dan peningkatan konversi', 2),
    bullet('Prioritaskan kueri berposisi 6-20 yang sudah memiliki tayangan.'),
    bullet('Periksa cannibalization dan uji title/description pada halaman dengan CTR rendah.'),
    bullet('Evaluasi konversi organik ke WhatsApp, bukan hanya tayangan.'),
    bullet('Dokumentasikan review, citation, backlink relevan, posisi, dan prospek.'),
    bullet('Susun prioritas kuartal berikutnya berdasarkan halaman yang menghasilkan inquiry.'),
  ];
}

function kpis(): DocElement[] {
  return [
    heading('9. Sasaran dan KPI 90 Hari'),
    heading('9.1 Aktivitas yang dapat dikendalikan', 2),
    infoTable(
      ['KPI', 'Sasaran sampai akhir bulan ke-6'],
      [
        ['URL prioritas', 'Terinspeksi dan bebas blocker teknis kritis'],
        ['Halaman prioritas', '4-6 halaman diperbarui berdasarkan GSC'],
        ['Internal link', 'Minimal 3 link relevan ke setiap halaman prioritas'],
        ['NAP dan jam', 'Selaras pada website, schema, GBP, Instagram, direktori'],
        ['Google Business Profile', '4 post + 8-12 foto/video baru per bulan'],
        ['Permintaan ulasan', 'Dikirim ke minimal 80% tamu setelah trip'],
        ['Citation', 'Minimal 5 citation relevan dan konsisten'],
        ['Partner outreach', '8 partner relevan per bulan'],
        ['Pelaporan', 'GSC, analytics, GBP, ranking, dan leads tiap bulan'],
      ],
      [3300, 6446],
    ),
    heading('9.2 Hasil — target, bukan jaminan', 2),
    infoTable(
      ['Area', 'Target realistis', 'Stretch target'],
      [
        ['Klaster Ubud', 'Median posisi Top 10', '2-3 long-tail terpilih Top 5'],
        ['CTR halaman Ubud', '1,5%-2%', '2%-3% bila posisi/SERP mendukung'],
        ['Klik non-brand', 'Tumbuh vs baseline 28 hari', '+50%-100% dalam 90 hari'],
        ['Prospek WhatsApp', 'Baseline valid dan tren naik', '+30%-50% setelah baseline'],
        ['Maps dekat lokasi', 'Top 10 area pengukuran', 'Top 3 pada sebagian geo-grid'],
        ['Kueri “nusa penida”', 'Membaik bertahap', 'Tidak dijanjikan Top 5/90 hari'],
      ],
      [2500, 3540, 3706],
    ),
    spacer(120),
    callout(
      'Definisi Top 5',
      [
        'Setiap klaim harus menyebut kueri, jenis hasil (organik atau Maps), lokasi, perangkat, dan bahasa.',
        'Tanpa definisi tersebut, pencarian manual tidak dapat dibandingkan secara adil.',
      ],
      PALE_GOLD,
      GOLD,
    ),
  ];
}

function clientSupportAndInvoice(): DocElement[] {
  return [
    heading('10. Dukungan yang Dibutuhkan dari NusaBeeTrip'),
    numbered('Konfirmasi jam operasional. Website dan schema memakai jam layanan 08.00-22.00 WITA serta alamat Desa Banjarnyuh, Ped. Pastikan jam buka dan tutup di Google Business Profile sama persis.'),
    numbered('Minta ulasan Google asli dari tamu tanpa imbalan, hadiah, atau diskon.'),
    numbered('Kirim foto/video asli destinasi, kendaraan, proses pelayanan, dan tamu yang sudah memberi izin.'),
    numbered('Berikan harga, included/excluded, serta detail layanan terbaru.'),
    numbered('Tandai sumber inquiry WhatsApp agar dampak SEO dapat dihubungkan dengan potensi pemesanan.'),
    heading('11. Kelanjutan Layanan dan Invoice Bulan ke-4'),
    body(
      'Memasuki bulan ke-4, fase kerja beralih dari pembangunan fondasi menuju peningkatan CTR, penguatan halaman yang sudah memperoleh tayangan, local SEO, review, citation, dan otoritas.',
    ),
    infoTable(
      ['Keterangan', 'Detail'],
      [
        ['Referensi invoice', 'RD-000001007'],
        ['Periode layanan', 'SEO bulan ke-4'],
        ['Dokumen pendukung', 'Laporan performa dan rencana 90 hari ini'],
        ['Nominal & jatuh tempo', 'Mengikuti invoice yang dikirim terpisah'],
      ],
      [3300, 6446],
    ),
    spacer(120),
    callout(
      'Pemisahan yang transparan',
      [
        'Pembayaran invoice adalah kelanjutan aktivitas dan deliverable SEO bulan ke-4.',
        'Pembayaran bukan pembelian atau jaminan posisi tertentu di Google.',
      ],
      PALE_BLUE,
      BLUE,
    ),
  ];
}

function futureProposal(): DocElement[] {
  return [
    pageBreak(),
    heading('12. Usulan Kerja Sama Mulai Bulan ke-7'),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 80 },
      children: [run('SEO CARE + INSTAGRAM BASIC', { bold: true, color: NAVY, size: 34 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 220 },
      children: [run('Rp1.500.000 per bulan', { bold: true, color: GOLD, size: 30 })],
    }),
    body(
      'Usulan berlaku mulai bulan ke-7 setelah persetujuan tertulis kedua pihak dan dievaluasi setiap tiga bulan. Harga menggunakan sistem repurpose; foto/video mentah perlu disediakan NusaBeeTrip tepat waktu.',
    ),
    heading('12.1 SEO dan Google Business Profile', 2),
    bullet('Monitoring mingguan GSC, indeksasi, sitemap, dan error teknis.'),
    bullet('Laporan bulanan GSC, analytics, GBP, posisi kueri, dan leads.'),
    bullet('Satu sesi evaluasi bulanan maksimal 30 menit.'),
    bullet('Optimasi maksimal dua halaman lama per bulan dan internal link prioritas.'),
    bullet('Empat GBP post dan upload maksimal 8-12 aset per bulan.'),
    bullet('Template permintaan/balasan ulasan, monitoring citation, dan outreach dasar.'),
    heading('12.2 Manajemen Instagram', 2),
    bullet('Kalender konten bulanan.'),
    bullet('Delapan konten per bulan: kombinasi 4 carousel/feed dan 4 Reels sederhana.'),
    bullet('Delapan sampai dua belas story frame per bulan.'),
    bullet('Caption, CTA, hashtag, penjadwalan, dan optimasi profil.'),
    bullet('Moderasi komentar dasar dua kali per minggu; closing tetap ditangani NusaBeeTrip.'),
    bullet('Laporan reach, engagement, profile visit, link click, dan inquiry.'),
    heading('12.3 Batas ruang lingkup', 2),
    body('Paket mencakup satu putaran revisi per batch konten. Hal-hal berikut tidak termasuk:'),
    bullet('shooting di lokasi, drone, atau produksi Reels kompleks;'),
    bullet('pengelolaan DM dan closing penjualan harian;'),
    bullet('influencer, placement, Google Ads/Meta Ads, dan biaya iklan;'),
    bullet('fitur website besar, redesign, backlink berbayar, dan biaya pihak ketiga;'),
    bullet('revisi tanpa batas.'),
    callout(
      'Peran Instagram',
      [
        'Instagram dipakai untuk distribusi konten, penguatan brand, bukti aktivitas nyata, dan dukungan perjalanan pelanggan.',
        'Aktivitas Instagram tidak diklaim sebagai faktor ranking Google secara langsung.',
      ],
      PALE_TEAL,
      TEAL,
    ),
  ];
}

function principlesAndReferences(): DocElement[] {
  const links = [
    ['Google Search Central — SEO Starter Guide', 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide'],
    ['Google Search Central — Helpful, Reliable, People-First Content', 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content'],
    ['Google Business Profile — Cara memperbaiki peringkat lokal', 'https://support.google.com/business/answer/7091?hl=id'],
    ['Google Search Central — Spam Policies', 'https://developers.google.com/search/docs/essentials/spam-policies'],
  ];

  return [
    heading('13. Prinsip Kerja dan Transparansi'),
    body(
      'PT. Reikidevs Inovasi Teknologi Perorangan berkomitmen pada aktivitas optimasi, pemantauan, dokumentasi, dan pelaporan yang tercantum dalam ruang lingkup kerja. Kami tidak menggunakan spam link, PBN, keyword stuffing, atau ulasan palsu.',
    ),
    body(
      'Posisi Top 5 merupakan sasaran untuk kueri terpilih, bukan jaminan, karena hasil organik ditentukan sistem Google, kompetisi, lokasi pengguna, perubahan SERP, dan kualitas sinyal bisnis dari waktu ke waktu.',
    ),
    body(
      'Kepercayaan dibangun melalui data yang dapat diperiksa, daftar pekerjaan yang jelas, perbandingan periode yang setara, serta hubungan antara trafik dan inquiry—bukan melalui janji posisi tanpa dasar.',
    ),
    heading('14. Referensi Resmi'),
    ...links.map(
      ([label, url]) =>
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new ExternalHyperlink({
              link: url,
              children: [run(label, { color: BLUE })],
            }),
          ],
        }),
    ),
    spacer(260),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 70 },
      children: [run('PT. REIKIDEVS INOVASI TEKNOLOGI PERORANGAN', { bold: true, color: NAVY, size: 23 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 55 },
      children: [run('Solusi Digital Layanan IT  •  reikidevs.com', { color: MUTED, size: 18 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 150 },
      children: [run('081222489299 (Owner)  •  085185029500 (Official)', { color: MUTED, size: 18 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        run(
          'Seluruh angka performa bersumber dari rekap Google Search Console sampai 5 Agustus 2026. Data dapat berubah mengikuti pemrosesan Google.',
          { italics: true, color: MUTED, size: 16 },
        ),
      ],
    }),
  ];
}

async function main() {
  const document = new Document({
    creator: 'PT. Reikidevs Inovasi Teknologi Perorangan',
    title: 'Laporan Performa SEO NusaBeeTrip — Bulan 1-3 dan Rencana Bulan 4-6',
    subject: 'Laporan pendamping invoice RD-000001007',
    description: 'Laporan performa SEO, roadmap 90 hari, dan usulan kerja sama lanjutan NusaBeeTrip.',
    keywords: 'NusaBeeTrip, SEO, Google Search Console, Google Business Profile, Instagram',
    numbering: {
      config: [
        {
          reference: 'report-bullets',
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: '•',
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 460, hanging: 240 } } },
            },
            {
              level: 1,
              format: LevelFormat.BULLET,
              text: '◦',
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 900, hanging: 240 } } },
            },
          ],
        },
        {
          reference: 'report-numbers',
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: '%1.',
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 520, hanging: 300 } } },
            },
          ],
        },
      ],
    },
    styles: {
      default: {
        document: {
          run: { font: 'Arial', size: 21, color: INK },
          paragraph: { spacing: { after: 120, line: 300 } },
        },
      },
      paragraphStyles: [
        {
          id: 'Title',
          name: 'Title',
          basedOn: 'Normal',
          next: 'Normal',
          run: { font: 'Arial', size: 48, bold: true, color: NAVY },
          paragraph: { spacing: { after: 240 }, alignment: AlignmentType.CENTER },
        },
        {
          id: 'Heading1',
          name: 'Heading 1',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: { font: 'Arial', size: 34, bold: true, color: NAVY },
          paragraph: { spacing: { before: 360, after: 160 }, keepNext: true },
        },
        {
          id: 'Heading2',
          name: 'Heading 2',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: { font: 'Arial', size: 27, bold: true, color: TEAL },
          paragraph: { spacing: { before: 260, after: 110 }, keepNext: true },
        },
        {
          id: 'Heading3',
          name: 'Heading 3',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: { font: 'Arial', size: 23, bold: true, color: BLUE },
          paragraph: { spacing: { before: 200, after: 100 }, keepNext: true },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: 1000, right: 1080, bottom: 1050, left: 1080, header: 500, footer: 500 },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE, space: 4 } },
                spacing: { after: 100 },
                children: [run('NusaBeeTrip  |  Laporan SEO', { color: MUTED, size: 15 })],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                border: { top: { style: BorderStyle.SINGLE, size: 4, color: LINE, space: 4 } },
                spacing: { before: 90 },
                children: [
                  run('PT. Reikidevs  |  RD-000001007  |  Halaman ', { color: MUTED, size: 15 }),
                  new TextRun({ children: [PageNumber.CURRENT], color: MUTED, size: 15, font: 'Arial' }),
                ],
              }),
            ],
          }),
        },
        children: [
          ...cover(),
          ...executiveSummary(),
          ...methodologyAndPerformance(),
          ...completedWork(),
          ...ubudOpportunity(),
          ...nusaPenidaExplanation(),
          ...roadmap(),
          ...kpis(),
          ...clientSupportAndInvoice(),
          ...futureProposal(),
          ...principlesAndReferences(),
        ],
      },
    ],
  });

  const outputDirectory = join(process.cwd(), 'docs', 'laporan-seo');
  const outputPath = join(
    outputDirectory,
    'LAPORAN-SEO-NUSABEETRIP-BULAN-1-3-DAN-RENCANA-4-6.docx',
  );
  mkdirSync(outputDirectory, { recursive: true });
  writeFileSync(outputPath, await Packer.toBuffer(document));
  console.log(`Word report created: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
