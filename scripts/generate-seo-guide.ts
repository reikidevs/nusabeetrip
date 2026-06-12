/**
 * Generates a polished Word (.docx) guide explaining the "nusabeetrip"
 * search-result / brand-confusion situation and the action plan.
 *
 * Run:  npx tsx scripts/generate-seo-guide.ts
 * Output:  docs/Panduan-SEO-NusaBeeTrip.docx
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
  ExternalHyperlink,
  LevelFormat,
} from 'docx';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// ── Brand palette ──────────────────────────────────────────────
const BLUE = '1E3A8A';
const TEAL = '0F766E';
const GRAY = '374151';
const LIGHT = 'EFF6FF';
const AMBER = 'B45309';

// ── Small helpers ──────────────────────────────────────────────
const gap = (size = 120) =>
  new Paragraph({ spacing: { after: size }, children: [new TextRun('')] });

function h1(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 140 },
    children: [new TextRun({ text, bold: true, color: BLUE, size: 30 })],
  });
}

function h2(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 220, after: 100 },
    children: [new TextRun({ text, bold: true, color: TEAL, size: 25 })],
  });
}

function body(text: string, opts: { bold?: boolean } = {}) {
  return new Paragraph({
    spacing: { after: 120, line: 300 },
    children: [new TextRun({ text, color: GRAY, size: 22, bold: opts.bold })],
  });
}

function bullet(text: string, level = 0) {
  return new Paragraph({
    numbering: { reference: 'bullets', level },
    spacing: { after: 80, line: 290 },
    children: [new TextRun({ text, color: GRAY, size: 22 })],
  });
}

function numbered(text: string, bold?: string) {
  const runs: TextRun[] = [];
  if (bold) runs.push(new TextRun({ text: bold + ' ', bold: true, color: BLUE, size: 22 }));
  runs.push(new TextRun({ text, color: GRAY, size: 22 }));
  return new Paragraph({
    numbering: { reference: 'steps', level: 0 },
    spacing: { after: 100, line: 290 },
    children: runs,
  });
}

function calloutBox(title: string, lines: string[], color = LIGHT, accent = BLUE) {
  const children: Paragraph[] = [
    new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ text: title, bold: true, color: accent, size: 22 })],
    }),
    ...lines.map(
      (l) =>
        new Paragraph({
          spacing: { after: 40, line: 280 },
          children: [new TextRun({ text: l, color: GRAY, size: 21 })],
        }),
    ),
  ];
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: accent },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: accent },
      left: { style: BorderStyle.SINGLE, size: 18, color: accent },
      right: { style: BorderStyle.SINGLE, size: 2, color: accent },
      insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, color: 'auto', fill: color },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children,
          }),
        ],
      }),
    ],
  });
}

function tableRow(cells: string[], opts: { header?: boolean } = {}) {
  return new TableRow({
    tableHeader: opts.header,
    children: cells.map(
      (c, i) =>
        new TableCell({
          shading: opts.header
            ? { type: ShadingType.CLEAR, color: 'auto', fill: BLUE }
            : { type: ShadingType.CLEAR, color: 'auto', fill: i === 0 ? LIGHT : 'FFFFFF' },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: c,
                  bold: opts.header || i === 0,
                  color: opts.header ? 'FFFFFF' : GRAY,
                  size: 20,
                }),
              ],
            }),
          ],
        }),
    ),
  });
}

function infoTable(headers: string[], rows: string[][]) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: 'D1D5DB' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'D1D5DB' },
      left: { style: BorderStyle.SINGLE, size: 1, color: 'D1D5DB' },
      right: { style: BorderStyle.SINGLE, size: 1, color: 'D1D5DB' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' },
    },
    rows: [tableRow(headers, { header: true }), ...rows.map((r) => tableRow(r))],
  });
}

// ── Cover / title block ────────────────────────────────────────
function coverBlock() {
  return [
    new Paragraph({ spacing: { before: 400 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [new TextRun({ text: 'NusaBeeTrip', bold: true, color: BLUE, size: 56 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [
        new TextRun({ text: 'Panduan Mengatasi Brand Confusion & Memperkuat SEO', color: TEAL, size: 28, bold: true }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [
        new TextRun({
          text: 'Kenapa hasil pencarian "nusabeetrip" memunculkan Nusatrip & BeeTrip — dan cara memperbaikinya',
          italics: true,
          color: GRAY,
          size: 22,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 360 },
      children: [new TextRun({ text: 'Dokumen Internal • nusabeetrip.com', color: '9CA3AF', size: 18 })],
    }),
  ];
}

// ── Content sections ───────────────────────────────────────────
function contentSections(): (Paragraph | Table)[] {
  return [
    // 1. Ringkasan
    h1('1. Ringkasan Singkat'),
    body(
      'Saat kamu mencari "nusabeetrip" di Bing/Edge, situs kita SUDAH muncul di posisi nomor 1 dengan judul dan deskripsi yang benar. Jadi secara teknis SEO sudah bekerja.',
    ),
    body(
      'Masalah sebenarnya bukan ranking, tetapi "brand confusion" — nama NusaBeeTrip sangat mirip dengan dua brand lain yang sudah lebih dulu terkenal, sehingga mesin pencari ikut menampilkan mereka di hasil pencarian.',
    ),
    calloutBox(
      'Inti masalah',
      [
        'NusaBeeTrip mirip dengan "Nusatrip.com" (agen tiket pesawat & hotel besar sejak 2013).',
        'NusaBeeTrip juga mirip dengan "BeeTrip" (beetrip.co.id / @beetrip.id).',
        'Mesin pencari mengira pengguna mungkin salah ketik, jadi menampilkan brand-brand itu.',
      ],
      LIGHT,
      BLUE,
    ),
    gap(),

    // 2. Kenapa terjadi
    h1('2. Kenapa Ini Bisa Terjadi'),
    body(
      'Mesin pencari (Google & Bing) berusaha menebak maksud pengguna. Ketika sebuah nama brand baru dan mirip dengan brand besar yang sudah mapan, mesin pencari belum 100% yakin bahwa nama itu adalah entitas tersendiri.',
    ),
    bullet('"Nusatrip" sudah punya knowledge panel, aplikasi di Play Store & App Store, dan halaman Wikipedia.'),
    bullet('"BeeTrip" sudah punya Instagram aktif dan website terdaftar.'),
    bullet('"NusaBeeTrip" masih relatif baru, jadi sinyal entitasnya belum sekuat mereka.'),
    body(
      'Solusinya adalah memperkuat "sinyal entitas" — memberi tahu mesin pencari secara eksplisit dan konsisten bahwa NusaBeeTrip adalah bisnis independen.',
    ),
    gap(),

    // 3. Yang sudah dikerjakan di website
    h1('3. Yang Sudah Diperbaiki di Website'),
    body('Beberapa perubahan teknis sudah diterapkan di kode website untuk memperkuat identitas brand:'),
    bullet('Menambahkan "alternateName" (variasi penulisan nama) ke data terstruktur Organization, WebSite, dan LocalBusiness.'),
    bullet('Menambahkan daftar variasi nama brand (Nusa Bee Trip, NusaBee Trip, dll) sebagai sumber tunggal.'),
    bullet('Menambahkan FAQ khusus: "Apakah NusaBeeTrip sama dengan Nusatrip atau BeeTrip?" dalam Bahasa Inggris & Indonesia.'),
    calloutBox(
      'Catatan penting',
      [
        'Perubahan kode ini membantu, tetapi hanya sebagian kecil dari solusi.',
        'Yang jauh lebih berdampak adalah langkah-langkah di luar kode pada bagian berikutnya.',
      ],
      'FEF3C7',
      AMBER,
    ),
    gap(),

    // 4. Langkah aksi (paling penting)
    h1('4. Langkah Aksi — Diurutkan dari Paling Berdampak'),
    body('Kerjakan dari atas ke bawah. Langkah 1 dan 2 adalah yang paling penting.'),
    numbered(
      'Daftarkan "NusaBeeTrip" sebagai bisnis lokal di Nusa Penida. Ini adalah sinyal entitas TERKUAT dan gratis. Kunjungi google.com/business.',
      'Google Business Profile —',
    ),
    numbered(
      'Versi Bing dari Google Business. Sangat relevan karena masalah terlihat di Edge/Bing. Kunjungi bingplaces.com.',
      'Bing Places for Business —',
    ),
    numbered(
      'Verifikasi situs & submit sitemap. Daftar di bing.com/webmasters, ambil kode verifikasi, lalu isi di pengaturan environment Vercel.',
      'Bing Webmaster Tools —',
    ),
    numbered(
      'Verifikasi situs & submit sitemap di search.google.com/search-console.',
      'Google Search Console —',
    ),
    numbered(
      'Tulis nama "NusaBeeTrip" PERSIS SAMA di Instagram, Google Maps, TripAdvisor, dan semua direktori wisata (jangan disingkat atau diubah).',
      'Konsistensi Nama (NAP) —',
    ),
    numbered(
      'Minta blog/partner travel menyebut "NusaBeeTrip" secara eksplisit dengan link ke nusabeetrip.com.',
      'Backlink & Mention —',
    ),
    numbered(
      'Entitas brand baru butuh beberapa minggu hingga bulan agar mesin pencari yakin namamu bukan typo. Bersabar sambil konsisten.',
      'Waktu —',
    ),
    gap(),

    // 5. Tabel kode verifikasi
    h1('5. Kode Verifikasi yang Perlu Diisi'),
    body('Slot kode verifikasi sudah disiapkan di website. Tinggal diisi di pengaturan environment Vercel, lalu deploy ulang.'),
    infoTable(
      ['Environment Variable', 'Diambil Dari', 'Prioritas'],
      [
        ['BING_SITE_VERIFICATION', 'Bing Webmaster Tools', 'Tinggi (masalah di Bing)'],
        ['GOOGLE_SITE_VERIFICATION', 'Google Search Console', 'Tinggi'],
        ['YANDEX_SITE_VERIFICATION', 'Yandex Webmaster (opsional)', 'Rendah'],
      ],
    ),
    gap(),

    // 6. Checklist
    h1('6. Checklist Cepat'),
    bullet('Daftar Google Business Profile untuk NusaBeeTrip.'),
    bullet('Daftar Bing Places for Business.'),
    bullet('Verifikasi di Bing Webmaster Tools + submit sitemap.xml.'),
    bullet('Verifikasi di Google Search Console + submit sitemap.xml.'),
    bullet('Isi BING_SITE_VERIFICATION & GOOGLE_SITE_VERIFICATION di Vercel, lalu deploy.'),
    bullet('Samakan penulisan "NusaBeeTrip" di semua media sosial & direktori.'),
    bullet('Kumpulkan ulasan & backlink yang menyebut nama lengkap "NusaBeeTrip".'),
    gap(),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 360 },
      children: [
        new TextRun({
          text: 'Dibuat untuk tim NusaBeeTrip • Fokus: memperkuat identitas brand di mesin pencari',
          italics: true,
          color: '9CA3AF',
          size: 18,
        }),
      ],
    }),
  ];
}

// ── Build + write the document ─────────────────────────────────
function main() {
  const doc = new Document({
    creator: 'NusaBeeTrip',
    title: 'Panduan SEO NusaBeeTrip',
    description: 'Panduan mengatasi brand confusion dan memperkuat SEO',
    numbering: {
      config: [
        {
          reference: 'bullets',
          levels: [
            { level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 460, hanging: 260 } } } },
            { level: 1, format: LevelFormat.BULLET, text: '\u25E6', alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 920, hanging: 260 } } } },
          ],
        },
        {
          reference: 'steps',
          levels: [
            { level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 520, hanging: 320 } } } },
          ],
        },
      ],
    },
    sections: [
      {
        properties: { page: { margin: { top: 1100, bottom: 1100, left: 1200, right: 1200 } } },
        children: [...coverBlock(), ...contentSections()],
      },
    ],
  });

  const outDir = join(process.cwd(), 'docs');
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, 'Panduan-SEO-NusaBeeTrip.docx');

  Packer.toBuffer(doc).then((buf) => {
    writeFileSync(outPath, buf);
    console.log('Word guide created:', outPath);
  });
}

main();

