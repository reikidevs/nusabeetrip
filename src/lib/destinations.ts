/**
 * Destination landing pages.
 *
 * Each destination is a popular Nusa Penida spot that we can rank for in Google
 * with its own informational page. Each page links back to the relevant tour
 * package(s) so it doubles as an SEO landing page and a conversion funnel.
 */

export interface Destination {
  slug: string;
  /** Display name (e.g. "Kelingking Beach") */
  name: string;
  /** Indonesian name override if different */
  nameId?: string;
  /** Region within Nusa Penida */
  region: 'west' | 'east' | 'south' | 'central';
  /** GPS coordinates for LocalBusiness/Place schema */
  geo?: { lat: number; lng: number };
  /** ~155 char description for meta + on-page intro */
  description: { en: string; id: string };
  /** Long-form content for the page body — paragraphs */
  body: {
    en: string[];
    id: string[];
  };
  /** Practical info shown as bullets */
  highlights: { en: string[]; id: string[] };
  /** Tips for visitors */
  tips: { en: string[]; id: string[] };
  /** Best time to visit — short phrase */
  bestTime: { en: string; id: string };
  /** Difficulty / accessibility note */
  accessibility: { en: string; id: string };
  /** Hero image (must exist in /public) */
  heroImage: string;
  /** Additional images for the gallery */
  images: string[];
  /** Slugs of tour packages that include this destination */
  relatedTourSlugs: string[];
}

export const DESTINATIONS: Destination[] = [
  {
    slug: 'kelingking-beach',
    name: 'Kelingking Beach',
    region: 'west',
    geo: { lat: -8.7494, lng: 115.4663 },
    description: {
      en: 'The most photographed spot in Nusa Penida. A T-Rex-shaped cliff towering over a hidden white sand beach with turquoise water below.',
      id: 'Spot paling ikonik di Nusa Penida. Tebing berbentuk T-Rex yang menjulang di atas pantai pasir putih tersembunyi dengan air biru toska.',
    },
    body: {
      en: [
        'Kelingking Beach is the postcard image of Nusa Penida — a curving limestone cliff that looks like a giant T-Rex bowing over the sea, with a slice of pristine white sand at its base. The viewpoint sits roughly 200 metres above the beach and is reachable by a short drive from anywhere on the island.',
        'Most visitors come for the viewpoint photo. A small fraction of fit travellers also descend the steep 30-minute trail to the beach itself. The path is rough, partly held together by bamboo handrails, and unsuitable for anyone with knee or balance issues — but the reward is a near-empty beach with crashing turquoise waves.',
        'The viewpoint is included in our West Trip and Mix Trip packages, with parking, entrance fee, and a professional guide who knows the safer parts of the trail.',
      ],
      id: [
        'Kelingking Beach adalah gambar kartu pos Nusa Penida — tebing kapur melengkung yang mirip T-Rex raksasa membungkuk ke laut, dengan sepetak pasir putih bersih di bawahnya. Viewpoint berada sekitar 200 meter di atas pantai dan bisa dijangkau dengan perjalanan singkat dari mana saja di pulau.',
        'Sebagian besar wisatawan datang untuk berfoto di viewpoint. Hanya sebagian kecil yang turun ke pantai melalui jalur tangga curam selama 30 menit. Jalurnya kasar, sebagian hanya dipegang pegangan bambu, dan tidak cocok untuk yang punya masalah lutut atau keseimbangan — tapi imbalannya adalah pantai sepi dengan ombak biru toska.',
        'Viewpoint Kelingking sudah termasuk dalam paket West Trip dan Mix Trip kami, lengkap dengan parkir, tiket masuk, dan pemandu lokal yang tahu bagian jalur yang aman.',
      ],
    },
    highlights: {
      en: [
        'Iconic T-Rex cliff viewpoint',
        'White sand beach 200m below',
        'Best photography spot on the island',
        'Located in West Nusa Penida',
        'Entry fee: included in our tour packages',
      ],
      id: [
        'Viewpoint tebing T-Rex yang ikonik',
        'Pantai pasir putih 200m di bawah',
        'Spot foto terbaik di pulau ini',
        'Berada di Nusa Penida bagian Barat',
        'Tiket masuk: termasuk dalam paket tur kami',
      ],
    },
    tips: {
      en: [
        'Arrive before 10 AM for the best light and to avoid crowds',
        'Wear closed shoes with good grip if descending to the beach',
        'Bring water — there are limited stalls at the top',
        'The descent takes 30 minutes, the climb back up takes 60',
        'Currents are strong; swimming is at your own risk',
      ],
      id: [
        'Tiba sebelum jam 10 pagi untuk cahaya terbaik dan menghindari keramaian',
        'Pakai sepatu tertutup yang grip-nya bagus kalau mau turun ke pantai',
        'Bawa air minum — warung di atas terbatas',
        'Turun butuh 30 menit, naik kembali 60 menit',
        'Arusnya kuat, berenang dengan risiko sendiri',
      ],
    },
    bestTime: {
      en: 'Early morning (07:00–10:00) for golden light and few people',
      id: 'Pagi hari (07.00–10.00) untuk cahaya emas dan sepi',
    },
    accessibility: {
      en: 'Viewpoint: easy. Beach descent: hard, requires good fitness.',
      id: 'Viewpoint: mudah. Turun ke pantai: sulit, perlu fisik prima.',
    },
    heroImage: '/images/West%20Trip/West%20trip%20Kelingking%20Beach%202.jpeg',
    images: [
      '/images/West%20Trip/West%20trip%20%20kelingking%20beach.jpeg',
      '/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg',
      '/images/West%20Trip/West%20Trip%20Kelingking%20Beach%206.jpeg',
      '/images/West%20Trip/West%20Trip%20Kelingking%20Beach%207.jpeg',
      '/images/West%20Trip/West%20trip%20Kelingking%20Beach%203.jpeg',
    ],
    relatedTourSlugs: ['west-trip', 'mix-trip', 'west-trip-snorkeling'],
  },
  {
    slug: 'diamond-beach',
    name: 'Diamond Beach',
    region: 'east',
    geo: { lat: -8.7681, lng: 115.6333 },
    description: {
      en: 'Crystal turquoise water meets sharp limestone pinnacles in this stunning east-coast beach with carved stone steps leading down to the sand.',
      id: 'Air biru toska bertemu pilar batu kapur tajam di pantai timur menakjubkan ini, dengan tangga batu pahatan menuju ke pasir.',
    },
    body: {
      en: [
        'Diamond Beach earned its name from the diamond-shaped limestone formations standing in the water. The carved stone staircase that leads down was hand-cut to make the once-secret beach accessible to visitors. From the top of the cliff, you get a sweeping view of three contrasting blues — sky, sea, and the deeper trench beyond the rocks.',
        'The water here is calmer than Kelingking but still has unpredictable currents close to the rocks. Most guests come for the photos at the viewpoint and the staircase, then walk along the soft sand for 15–20 minutes.',
        'Diamond Beach is a flagship stop in our East Trip and Mix Trip itineraries.',
      ],
      id: [
        'Diamond Beach mendapat namanya dari formasi batu kapur berbentuk berlian yang berdiri di air. Tangga batu pahatan yang menuju ke bawah dibuat tangan untuk membuka akses ke pantai yang dulu rahasia ini. Dari puncak tebing, Anda akan melihat tiga gradasi biru kontras — langit, laut, dan palung lebih dalam di balik batu.',
        'Airnya lebih tenang daripada Kelingking tapi tetap punya arus tak terduga dekat batu. Mayoritas tamu datang untuk berfoto di viewpoint dan tangga, lalu jalan di pasir lembut selama 15–20 menit.',
        'Diamond Beach adalah salah satu titik utama di rute East Trip dan Mix Trip kami.',
      ],
    },
    highlights: {
      en: [
        'Diamond-shaped limestone pillars',
        'Hand-carved staircase down to the beach',
        'White sand and three shades of blue water',
        'Located in East Nusa Penida',
        'Pairs naturally with Atuh Beach (5 min away)',
      ],
      id: [
        'Pilar batu kapur berbentuk berlian',
        'Tangga pahatan tangan menuju pantai',
        'Pasir putih dan tiga gradasi air biru',
        'Berada di Nusa Penida bagian Timur',
        'Dekat dengan Atuh Beach (5 menit)',
      ],
    },
    tips: {
      en: [
        'Use the staircase for the best photo — the iconic shot is from the steps looking down',
        'Late afternoon (15:00–17:00) gives soft light without the harsh midday sun',
        'Combine with Atuh Beach in one trip — they are 5 minutes apart',
        'Bring sunscreen, the cliff has very little shade',
      ],
      id: [
        'Gunakan tangga untuk foto terbaik — angle ikonik adalah dari tangga melihat ke bawah',
        'Sore hari (15.00–17.00) memberikan cahaya lembut tanpa matahari tengah hari yang menyilaukan',
        'Gabungkan dengan Atuh Beach dalam satu trip — jaraknya 5 menit',
        'Bawa sunscreen, tebingnya sangat sedikit teduhnya',
      ],
    },
    bestTime: {
      en: 'Late afternoon (15:00–17:00) for soft light and fewer crowds',
      id: 'Sore hari (15.00–17.00) untuk cahaya lembut dan lebih sepi',
    },
    accessibility: {
      en: 'Moderate — the staircase is steep but well-maintained.',
      id: 'Sedang — tangganya curam tapi terawat baik.',
    },
    heroImage: '/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg',
    images: [
      '/images/East%20Trip/East%20Trip%20Diamond%20Beach%202.jpeg',
      '/images/East%20Trip/East%20Trip%20Diamond%20Beach%203.jpeg',
      '/images/East%20Trip/East%20Trip%20Diamond%20Beach%205.jpeg',
      '/images/East%20Trip/East%20Trip%20Diamond%20Beach%20Snorkeling.png',
    ],
    relatedTourSlugs: ['east-trip', 'mix-trip', 'east-trip-snorkeling'],
  },
  {
    slug: 'broken-beach',
    name: 'Broken Beach',
    region: 'west',
    geo: { lat: -8.7847, lng: 115.4694 },
    description: {
      en: 'A natural arch of stone wraps around a hidden lagoon. Walk the cliff loop trail for unmatched views of the turquoise pool below.',
      id: 'Lengkungan batu alami membungkus laguna tersembunyi. Berjalan di jalur tepi tebing untuk pemandangan kolam toska di bawahnya.',
    },
    body: {
      en: [
        'Broken Beach (Pasih Uug in Balinese) is a near-perfect circle of cliffs surrounding a tidal pool, with a natural rock arch acting as the only opening to the open sea. The walking path circles the entire lagoon, giving you a 360° view of the geological formation in under 10 minutes.',
        'You cannot swim at Broken Beach — the cliffs are too steep and the currents below the arch are strong — but the photographs are arguably the best on the island. The blue of the water against the rough limestone walls is unreal.',
        'Broken Beach is included in West Trip and Mix Trip packages, often visited together with Angel Billabong which is right next door.',
      ],
      id: [
        'Broken Beach (Pasih Uug dalam bahasa Bali) adalah lingkaran tebing nyaris sempurna yang mengelilingi kolam pasang surut, dengan lengkungan batu alami sebagai satu-satunya bukaan ke laut lepas. Jalur jalan mengelilingi seluruh laguna, memberikan pemandangan 360° formasi geologi dalam waktu kurang dari 10 menit.',
        'Anda tidak bisa berenang di Broken Beach — tebingnya terlalu curam dan arus di bawah lengkungan kuat — tapi fotonya bisa dibilang yang terbaik di pulau. Birunya air dengan dinding batu kapur kasar terlihat tidak nyata.',
        'Broken Beach termasuk dalam paket West Trip dan Mix Trip, biasanya dikunjungi bersama Angel Billabong yang persis sebelahnya.',
      ],
    },
    highlights: {
      en: [
        'Natural rock arch over the sea',
        '360° cliff loop walking trail',
        'Hidden tidal lagoon below',
        'Located next to Angel Billabong',
        'Top photography spot in West Nusa Penida',
      ],
      id: [
        'Lengkungan batu alami di atas laut',
        'Jalur jalan kaki tepi tebing 360°',
        'Laguna pasang surut tersembunyi di bawah',
        'Berdampingan dengan Angel Billabong',
        'Spot foto terbaik di Nusa Penida bagian Barat',
      ],
    },
    tips: {
      en: [
        'Walk the full loop — the angles change dramatically',
        'Combine with Angel Billabong (200 metres away) in one stop',
        'No swimming — the cliffs have no safe entry point',
        'Keep distance from the cliff edge in windy conditions',
      ],
      id: [
        'Jalani jalur penuh — sudutnya berubah dramatis',
        'Gabungkan dengan Angel Billabong (200 meter) dalam satu kunjungan',
        'Tidak ada berenang — tebingnya tidak punya titik masuk yang aman',
        'Jaga jarak dari tepi tebing saat angin kencang',
      ],
    },
    bestTime: {
      en: 'Mid morning (09:00–11:00) when the sun lights up the lagoon',
      id: 'Pagi menjelang siang (09.00–11.00) saat matahari menyinari laguna',
    },
    accessibility: {
      en: 'Easy — flat walking trail, suitable for all ages.',
      id: 'Mudah — jalur datar, cocok untuk semua usia.',
    },
    heroImage: '/images/West%20Trip/West%20trip%20BROKEN%20BEACH.jpeg',
    images: [
      '/images/West%20Trip/West%20Trip%20Broken%20Beach%202.jpeg',
      '/images/West%20Trip/West%20Trip%20Broken%20Beach%203.jpeg',
      '/images/West%20Trip/West%20Trip%20Broken%20Beach%204.jpeg',
    ],
    relatedTourSlugs: ['west-trip', 'mix-trip', 'west-trip-snorkeling'],
  },
  {
    slug: 'angel-billabong',
    name: 'Angel Billabong',
    region: 'west',
    geo: { lat: -8.7831, lng: 115.4683 },
    description: {
      en: 'A natural infinity pool carved into the cliffs. At low tide it becomes a calm tidal pool with views straight out to the Indian Ocean.',
      id: 'Kolam infinity alami yang terukir di tebing. Saat air surut menjadi kolam pasang surut tenang dengan pemandangan Samudra Hindia.',
    },
    body: {
      en: [
        'Angel Billabong is a natural cliff-top pool where rainwater and seawater collect into a clear, mineral-coloured basin. It became famous on Instagram as the "infinity pool that drops into the ocean", and the photo angle still draws daily crowds.',
        'Swimming inside the pool used to be popular, but local authorities now discourage it — sudden waves can sweep visitors out to sea. Still, the photo from above is one of the most distinctive in Nusa Penida.',
        'Angel Billabong is right next to Broken Beach, so both are usually visited as a single stop on our West Trip and Mix Trip itineraries.',
      ],
      id: [
        'Angel Billabong adalah kolam alami di atas tebing tempat air hujan dan air laut berkumpul menjadi cekungan jernih berwarna mineral. Spot ini terkenal di Instagram sebagai "kolam infinity yang jatuh ke laut", dan angle foto itu masih menarik orang setiap hari.',
        'Berenang di dalam kolam dulunya populer, tapi otoritas lokal kini melarang — gelombang tiba-tiba bisa menyapu pengunjung ke laut. Tetap, foto dari atas adalah salah satu yang paling khas di Nusa Penida.',
        'Angel Billabong berdampingan dengan Broken Beach, jadi keduanya biasanya dikunjungi sebagai satu titik dalam itinerary West Trip dan Mix Trip kami.',
      ],
    },
    highlights: {
      en: [
        'Natural infinity pool over the cliff',
        'Best Instagram photo angle on the island',
        'Walk-through with Broken Beach',
        'Free public access',
      ],
      id: [
        'Kolam infinity alami di atas tebing',
        'Sudut foto Instagram terbaik di pulau',
        'Satu rute dengan Broken Beach',
        'Akses publik gratis',
      ],
    },
    tips: {
      en: [
        'Do not enter the pool — even at low tide waves can be unpredictable',
        'Pair the visit with Broken Beach to save time',
        'Best for photos in the morning before haze sets in',
      ],
      id: [
        'Jangan masuk ke dalam kolam — bahkan saat surut, gelombang tidak terduga',
        'Gabungkan dengan Broken Beach untuk hemat waktu',
        'Terbaik untuk foto di pagi hari sebelum udara berkabut',
      ],
    },
    bestTime: {
      en: 'Morning at low tide (check tide tables before visiting)',
      id: 'Pagi saat air surut (cek jadwal pasang surut sebelum datang)',
    },
    accessibility: {
      en: 'Easy — short walk from the parking area.',
      id: 'Mudah — jalan singkat dari area parkir.',
    },
    heroImage: '/images/West%20Trip/West%20trip%20ANGEL%20BILABONG.jpeg',
    images: ['/images/West%20Trip/West%20trip%20ANGEL%20BILABONG.jpeg'],
    relatedTourSlugs: ['west-trip', 'mix-trip', 'west-trip-snorkeling'],
  },
  {
    slug: 'atuh-beach',
    name: 'Atuh Beach',
    region: 'east',
    geo: { lat: -8.7639, lng: 115.6336 },
    description: {
      en: 'A pristine bay framed by towering cliffs and dramatic rock formations. Calmer water than Kelingking and a peaceful place to swim.',
      id: 'Teluk asri dibingkai tebing tinggi dan formasi batu dramatis. Airnya lebih tenang daripada Kelingking dan tempat yang damai untuk berenang.',
    },
    body: {
      en: [
        'Atuh Beach lies in a deep bay protected by rock pillars rising straight from the sea. The water is calmer than the south coast, the sand is fine and white, and the swimming is among the safest of any beach on Nusa Penida. The trail down is steep but properly maintained.',
        'You can walk all the way to the western end and reach a small natural arch. Local warungs at the top sell drinks and basic food. The atmosphere is much more relaxed than the busier west-coast viewpoints — Atuh feels like a hidden corner of the island even though it is included in most tour itineraries.',
        'Atuh Beach is part of our East Trip and Mix Trip packages, paired with Diamond Beach which is just five minutes away.',
      ],
      id: [
        'Atuh Beach terletak di teluk dalam yang dilindungi pilar batu yang menjulang langsung dari laut. Airnya lebih tenang daripada pantai selatan, pasirnya halus dan putih, dan berenangnya termasuk paling aman di antara pantai-pantai Nusa Penida. Jalur turunnya curam tapi terawat baik.',
        'Anda bisa berjalan ke ujung barat dan sampai ke lengkungan batu alami kecil. Warung-warung lokal di atas menjual minuman dan makanan dasar. Suasananya jauh lebih santai dibanding viewpoint-viewpoint pantai barat yang ramai — Atuh terasa seperti sudut pulau yang tersembunyi meskipun masuk dalam mayoritas itinerary tur.',
        'Atuh Beach termasuk dalam paket East Trip dan Mix Trip kami, dipasangkan dengan Diamond Beach yang berjarak lima menit saja.',
      ],
    },
    highlights: {
      en: [
        'Calm bay protected by rock pillars',
        'Safe to swim with calmer waves',
        'Natural arch at the west end',
        'Local warungs at the viewpoint',
        'Pairs with Diamond Beach (5 min away)',
      ],
      id: [
        'Teluk tenang yang dilindungi pilar batu',
        'Aman untuk berenang, ombak lebih tenang',
        'Lengkungan batu alami di ujung barat',
        'Warung lokal di area viewpoint',
        'Berpasangan dengan Diamond Beach (5 menit)',
      ],
    },
    tips: {
      en: [
        'Bring a swimsuit and towel — this is one of the few beaches you can actually swim at',
        'Walk to the western arch for a quieter spot',
        'Sunset paints the cliffs gold, but plan the trip back before dark',
      ],
      id: [
        'Bawa baju renang dan handuk — ini salah satu pantai yang benar-benar bisa untuk berenang',
        'Jalan ke lengkungan barat untuk spot yang lebih sepi',
        'Matahari terbenam mewarnai tebing menjadi emas, tapi atur perjalanan pulang sebelum gelap',
      ],
    },
    bestTime: {
      en: 'Mid afternoon (14:00–16:00) for swimming and golden cliffs',
      id: 'Sore (14.00–16.00) untuk berenang dan tebing keemasan',
    },
    accessibility: {
      en: 'Moderate — staircase down to the beach.',
      id: 'Sedang — tangga turun ke pantai.',
    },
    heroImage: '/images/East%20Trip/East%20trip%20ATUH%20BEACH.jpeg',
    images: ['/images/East%20Trip/East%20trip%20ATUH%20BEACH.jpeg'],
    relatedTourSlugs: ['east-trip', 'mix-trip', 'east-trip-snorkeling'],
  },
  {
    slug: 'crystal-bay-beach',
    name: 'Crystal Bay Beach',
    region: 'west',
    geo: { lat: -8.7172, lng: 115.4517 },
    description: {
      en: 'A wide, calm beach with crystal-clear water and shaded coconut trees. The most family-friendly beach on Nusa Penida.',
      id: 'Pantai luas dan tenang dengan air sejernih kristal dan pohon kelapa yang teduh. Pantai paling ramah keluarga di Nusa Penida.',
    },
    body: {
      en: [
        'Crystal Bay is the gentle face of Nusa Penida. The bay is wide and shallow near shore, the water is clear enough to see fish without snorkelling, and rows of coconut trees provide natural shade. It is the only beach where small children can play comfortably.',
        'The bay is also the launch point for snorkeling boats heading to Manta Bay and Gamat Bay. If you stay until sunset, the beach faces directly into the western horizon, framed by the silhouette of the offshore island Nusa Lembongan.',
        'Crystal Bay appears in our West Trip and Mix Trip itineraries.',
      ],
      id: [
        'Crystal Bay adalah sisi lembut Nusa Penida. Teluknya luas dan dangkal dekat pantai, airnya jernih sampai bisa melihat ikan tanpa snorkeling, dan deretan pohon kelapa memberikan teduh alami. Ini satu-satunya pantai yang aman untuk anak kecil bermain.',
        'Teluk ini juga titik berangkat perahu snorkeling yang menuju Manta Bay dan Gamat Bay. Kalau Anda tinggal sampai matahari terbenam, pantai ini menghadap langsung ke barat, dibingkai siluet pulau Nusa Lembongan.',
        'Crystal Bay ada di rute West Trip dan Mix Trip kami.',
      ],
    },
    highlights: {
      en: [
        'Calm, family-friendly swimming',
        'Crystal-clear shallow water',
        'Coconut tree shade and warungs',
        'Sunset facing west',
        'Snorkeling boat launch point',
      ],
      id: [
        'Berenang yang tenang dan ramah keluarga',
        'Air jernih dan dangkal',
        'Teduh pohon kelapa dan warung',
        'Matahari terbenam menghadap barat',
        'Titik keberangkatan perahu snorkeling',
      ],
    },
    tips: {
      en: [
        'Bring snorkel gear — fish swim near the rocks at the south end',
        'Stay for sunset if your itinerary allows',
        'Avoid swimming far out — the channel between Penida and Lembongan has currents',
      ],
      id: [
        'Bawa peralatan snorkel — ikan-ikan berenang dekat batu di ujung selatan',
        'Tinggal sampai sunset kalau jadwal memungkinkan',
        'Jangan berenang terlalu jauh — selat antara Penida dan Lembongan punya arus',
      ],
    },
    bestTime: {
      en: 'Late afternoon to sunset',
      id: 'Sore menjelang matahari terbenam',
    },
    accessibility: {
      en: 'Easy — drive directly to the beach, no stairs.',
      id: 'Mudah — bisa langsung ke pantai, tanpa tangga.',
    },
    heroImage: '/images/West%20Trip/West%20trip%20CRYSTAL%20BAY%20BEACH.jpeg',
    images: [
      '/images/West%20Trip/West%20Trip%20Crystal%20Bay%20Beach%202.jpeg',
      '/images/West%20Trip/West%20Trip%20Crystal%20Bay%20Beach%203.jpeg',
      '/images/West%20Trip/West%20Trip%20Crystal%20Bay%20Beach%204.jpeg',
      '/images/West%20Trip/West%20Trip%20Crystal%20Bay%20Beach%205.jpeg',
    ],
    relatedTourSlugs: ['west-trip', 'mix-trip', 'snorkeling-manta'],
  },
];

export function getDestinationBySlug(slug: string): Destination | null {
  return DESTINATIONS.find((d) => d.slug === slug) || null;
}
