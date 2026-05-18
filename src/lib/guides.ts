/**
 * Travel guides — evergreen long-form articles that target informational
 * search queries (how-to, best-time-to-visit, comparison, packing list, etc).
 *
 * Each guide is a standalone landing page with Article / BlogPosting schema
 * and is designed to rank for long-tail keywords without daily content output.
 */

export interface GuideSection {
  /** Heading of the section (rendered as <h2>) */
  heading: string;
  /** One or more paragraphs of body content */
  paragraphs: string[];
  /** Optional bullet list shown after the paragraphs */
  bullets?: string[];
}

export interface Guide {
  slug: string;
  /** Search-optimized H1 / page title */
  title: string;
  /** ~155-char meta description */
  excerpt: string;
  /** Hero image — must exist in /public */
  heroImage: string;
  /** Estimated reading time in minutes */
  readingMinutes: number;
  /** ISO date the article was first published */
  datePublished: string;
  /** ISO date of the last meaningful edit */
  dateModified: string;
  /** Top-level category (used for grouping) */
  category: 'planning' | 'getting-around' | 'comparison' | 'tips';
  /** Keywords associated with this article — used for meta keywords */
  keywords: string[];
  /** Body sections rendered in order */
  sections: GuideSection[];
  /** Slugs of related guides shown at the bottom */
  relatedGuideSlugs: string[];
}

/* ─────────────────────────────────────────────────────────────────── */

const GUIDES: Guide[] = [
  {
    slug: 'how-to-get-to-nusa-penida',
    title: 'How to Get to Nusa Penida from Bali',
    excerpt:
      'Step-by-step guide to reaching Nusa Penida from Sanur, Padang Bai, and Kusamba. Boat schedules, ticket prices, and what to expect at each harbour.',
    heroImage: '/images/West%20Trip/West%20trip%20CRYSTAL%20BAY%20BEACH.jpeg',
    readingMinutes: 6,
    datePublished: '2026-01-15',
    dateModified: '2026-05-10',
    category: 'getting-around',
    keywords: [
      'how to get to nusa penida',
      'sanur to nusa penida ferry',
      'fast boat nusa penida',
      'nusa penida from bali',
      'kapal cepat nusa penida',
    ],
    sections: [
      {
        heading: 'The short answer',
        paragraphs: [
          'The fastest, easiest, and most popular route is a 30-minute fast boat from Sanur to Banjar Nyuh harbour on the north coast of Nusa Penida. Boats run from around 07:00 until 16:00 daily, and a one-way ticket costs roughly 100,000–175,000 IDR depending on the operator.',
          'You do not need to book days ahead in low season. In high season (July–August, Christmas, and New Year) it is worth reserving the boat the night before through your hotel or a local agent.',
        ],
      },
      {
        heading: 'Departure points compared',
        paragraphs: [
          'Most travellers leave from Sanur. It has the largest selection of boats, the most predictable schedules, and is easiest to reach from anywhere in south Bali.',
          'Padang Bai is an alternative if you are coming from east Bali (Ubud, Amed, Candidasa). The journey takes a similar 30–45 minutes but boat frequency is lower.',
          'Kusamba has cheap public boats used by locals. They are slower (60+ minutes), much rougher in waves, and rarely worth the small saving for tourists.',
        ],
        bullets: [
          'Sanur — easiest, most options, 30 minutes',
          'Padang Bai — for east Bali departures, 30–45 minutes',
          'Kusamba — local boats only, slow, not recommended',
        ],
      },
      {
        heading: 'What happens at the harbour',
        paragraphs: [
          'At Sanur Beach you board directly from the sand. Wear shoes you can walk in shallow water with — there is no jetty for most boats. Luggage is loaded by a porter at the front of the boat. Wear something you do not mind getting splashed.',
          'On arrival at Banjar Nyuh in Nusa Penida, you walk off the same way. Drivers, scooter rental shops, and tour guides wait near the beach holding signs. If we are picking you up, just look for a NusaBeeTrip sign — we coordinate the meet via WhatsApp.',
        ],
      },
      {
        heading: 'Tips that save time and money',
        paragraphs: [
          'Bring small change in IDR. Some operators add a small "harbour fee" on the day you board. It is small but pay-on-the-spot only.',
          'Avoid the last boat back to Bali. If it is cancelled due to weather you will need an unplanned overnight on the island. Aim to be on a 14:00–15:00 return boat to give yourself a buffer.',
          'For day trips, leave Sanur on the 07:00–08:00 boat. You get a full day on the island and the morning sea is the calmest.',
        ],
      },
    ],
    relatedGuideSlugs: [
      'best-time-to-visit-nusa-penida',
      'nusa-penida-itinerary',
      'what-to-pack-nusa-penida',
    ],
  },

  {
    slug: 'best-time-to-visit-nusa-penida',
    title: 'Best Time to Visit Nusa Penida',
    excerpt:
      'Month-by-month breakdown of weather, crowds, sea conditions, and prices in Nusa Penida — so you can pick the right time for your trip.',
    heroImage: '/images/East%20Trip/East%20Trip%20Diamond%20Beach%205.jpeg',
    readingMinutes: 5,
    datePublished: '2026-01-20',
    dateModified: '2026-04-15',
    category: 'planning',
    keywords: [
      'best time to visit nusa penida',
      'nusa penida weather',
      'nusa penida rainy season',
      'manta ray season nusa penida',
      'kapan ke nusa penida',
    ],
    sections: [
      {
        heading: 'The short answer',
        paragraphs: [
          'May and September are the sweet spot — dry weather, calm seas, manageable crowds, and decent prices. Both months avoid the heaviest rain and the peak-season crush.',
          'If you only care about avoiding rain, anytime from April through October works. If you want manta rays, plan around April–November.',
        ],
      },
      {
        heading: 'Dry season (April – October)',
        paragraphs: [
          'This is the long stretch of mostly sunny weather. Trails are dry, viewpoints are clear, and the boat ride from Sanur is calmer. Prices are higher in July, August, and around Christmas/New Year.',
          'Manta ray sightings peak from May to November when the surrounding water is rich in plankton. June through August is also the most reliable for snorkeling visibility.',
        ],
      },
      {
        heading: 'Wet season (November – March)',
        paragraphs: [
          'Rain is more frequent, usually as short heavy bursts in the afternoon. Mornings often stay clear, so a tour starting at 07:00–08:00 can still get all the photos in.',
          'The trade-off is choppier water for the Sanur boat ride, occasional sea-day cancellations, and a higher chance that a snorkeling trip is rescheduled. Prices and crowds drop noticeably.',
        ],
      },
      {
        heading: 'Month by month at a glance',
        paragraphs: [],
        bullets: [
          'Apr — End of rains, lush green, fewer crowds. Great month overall.',
          'May — Dry, calm seas, manta rays starting. Top recommendation.',
          'Jun – Aug — Peak season. Best weather but most expensive and busiest.',
          'Sep — Quiet shoulder month with great weather. Top recommendation.',
          'Oct — Still mostly dry, prices drop. Good value.',
          'Nov – Mar — Wet season. Cheaper but plan for changeable weather.',
        ],
      },
    ],
    relatedGuideSlugs: [
      'how-to-get-to-nusa-penida',
      'nusa-penida-itinerary',
      'nusa-penida-vs-lembongan',
    ],
  },

  {
    slug: 'nusa-penida-itinerary',
    title: 'Nusa Penida Itinerary: 1 Day, 2 Days, and 3 Days',
    excerpt:
      'Three battle-tested itineraries for Nusa Penida. What to see, when to start, and which combinations actually work in a single day on the road.',
    heroImage: '/images/Mix%20Trip%20View%20Thoussand%20Island%20and%20Crystal%20bay%20Beach.png',
    readingMinutes: 8,
    datePublished: '2026-02-01',
    dateModified: '2026-04-28',
    category: 'planning',
    keywords: [
      'nusa penida itinerary',
      'nusa penida 1 day',
      'nusa penida 2 days',
      'nusa penida 3 days',
      'nusa penida day trip',
      'rencana perjalanan nusa penida',
    ],
    sections: [
      {
        heading: 'How big is the island, really?',
        paragraphs: [
          'Nusa Penida looks small on a map but the roads twist, climb, and turn into rough tracks at the famous viewpoints. Driving from the western tip to the eastern tip takes around 90 minutes one-way without stops, so trying to do both in a hurry leaves you racing daylight.',
          'The two main route choices are West (Kelingking, Angel Billabong, Broken Beach, Crystal Bay) and East (Diamond Beach, Atuh Beach, Tree House, Thousand Islands viewpoint). Most one-day trips pick one direction. Mix tours combine the highlights of both.',
        ],
      },
      {
        heading: '1-day itinerary (the day-tripper)',
        paragraphs: [
          'You arrive on the 08:00 boat from Sanur and leave on the 16:00 return. That is roughly 7 hours of usable time. Pick one direction and commit.',
        ],
        bullets: [
          '08:30 — Arrive at Banjar Nyuh, meet the driver',
          '09:30 — First viewpoint (Kelingking or Diamond)',
          '11:30 — Second viewpoint',
          '12:30 — Lunch at a local warung',
          '13:30 — Third viewpoint or beach swim',
          '15:00 — Drive back to harbour',
          '16:00 — Boat to Sanur',
        ],
      },
      {
        heading: '2-day itinerary (the comfortable one)',
        paragraphs: [
          'Stay one night and the trip stops feeling rushed. Day 1 covers one direction with time for proper photos and a swim. Day 2 covers the other direction or includes manta snorkeling.',
        ],
        bullets: [
          'Day 1 — West trip: Kelingking → Angel Billabong → Broken Beach → Crystal Bay sunset',
          'Day 1 evening — Dinner at a beachside warung, sleep in Toyapakeh or Crystal Bay area',
          'Day 2 morning — Manta snorkeling (3 spots, ~2 hours on the water)',
          'Day 2 afternoon — East side: Diamond Beach, Atuh Beach, Tree House',
          'Day 2 evening — 16:00 boat back to Sanur',
        ],
      },
      {
        heading: '3-day itinerary (the slow one)',
        paragraphs: [
          'Three days lets you actually rest and dive deeper. Day 3 opens up Nusa Lembongan and Ceningan — they are connected to Penida by a quick boat or the famous yellow bridge.',
        ],
        bullets: [
          'Day 1 — West trip with a longer stop at Crystal Bay for sunset',
          'Day 2 — Manta snorkeling + East side',
          'Day 3 — Cross to Nusa Lembongan, see Devil\'s Tear and Dream Beach, return in the evening',
        ],
      },
      {
        heading: 'Which one fits you?',
        paragraphs: [
          'If you only have a day from Bali, take a Mix Trip — it includes the most-photographed spots from both sides in 8 hours.',
          'If your bag is already packed for two days, do East one day and West-plus-snorkeling the next. You will leave the island actually relaxed instead of exhausted.',
          'Three days is the sweet spot if Nusa Penida is the main destination of your Bali trip. You stop ticking boxes and start enjoying the place.',
        ],
      },
    ],
    relatedGuideSlugs: [
      'how-to-get-to-nusa-penida',
      'best-time-to-visit-nusa-penida',
      'what-to-pack-nusa-penida',
    ],
  },

  {
    slug: 'what-to-pack-nusa-penida',
    title: 'What to Pack for Nusa Penida',
    excerpt:
      'A focused packing list for a Nusa Penida day trip or short stay. What is essential, what is overkill, and what locals actually wish tourists brought.',
    heroImage: '/images/Snorkeling%20%2B%20Manta%20Rays/snorkeling%202.jpeg',
    readingMinutes: 4,
    datePublished: '2026-02-12',
    dateModified: '2026-04-20',
    category: 'tips',
    keywords: [
      'what to pack nusa penida',
      'nusa penida packing list',
      'apa yang dibawa ke nusa penida',
      'nusa penida day trip essentials',
    ],
    sections: [
      {
        heading: 'The short list',
        paragraphs: [
          'For a day trip, three things matter most: shoes that grip, sunscreen, and water. The rest is comfort.',
        ],
        bullets: [
          'Closed shoes with good grip (Kelingking trail is loose rock)',
          'Reef-safe sunscreen (the local sun is stronger than people expect)',
          'A 1L water bottle (warungs at viewpoints sell water but it is plastic)',
          'Swimsuit worn under your clothes — saves changing-room hassle',
          'Quick-dry towel (small)',
          'Cash in IDR — small notes for parking and warungs',
          'Phone in a waterproof pouch for snorkeling boats',
        ],
      },
      {
        heading: 'For staying overnight',
        paragraphs: [
          'Add only what you actually need. Most accommodations have soap, shampoo, and towels. The island is hot — pack thin clothes, not heavy ones.',
        ],
        bullets: [
          'Basic toiletries (some places run out of common items)',
          'A light long-sleeve shirt for sun protection on snorkel boats',
          'Mosquito repellent for evenings near beaches',
          'Adapter (Indonesia uses Type C/F plugs)',
          'Power bank — charging during the day is rare',
        ],
      },
      {
        heading: 'What to skip',
        paragraphs: [
          'Heavy hiking boots are overkill — running shoes with grip are enough.',
          'Drone — most popular spots restrict drones for safety, and Indonesian airspace rules around tourist sites are tightening. If you do bring one, ask before flying.',
          'Cash in USD — only IDR is accepted island-wide, and ATMs are unreliable. Withdraw enough in Bali first.',
        ],
      },
    ],
    relatedGuideSlugs: [
      'how-to-get-to-nusa-penida',
      'best-time-to-visit-nusa-penida',
      'nusa-penida-itinerary',
    ],
  },

  {
    slug: 'nusa-penida-vs-lembongan',
    title: 'Nusa Penida vs Nusa Lembongan: Which One Should You Visit?',
    excerpt:
      'Both islands are gorgeous and 15 minutes apart, but they serve different traveller types. Honest comparison of crowds, scenery, food, and what to expect.',
    heroImage: '/images/East%20Trip/East%20trip%20VIEW%20THOUSAND%20ISLAND.jpeg',
    readingMinutes: 6,
    datePublished: '2026-03-05',
    dateModified: '2026-05-02',
    category: 'comparison',
    keywords: [
      'nusa penida vs nusa lembongan',
      'nusa lembongan or penida',
      'nusa lembongan ceningan penida',
      'which nusa island to visit',
    ],
    sections: [
      {
        heading: 'The short answer',
        paragraphs: [
          'Nusa Penida is for dramatic cliffs, hidden beaches, and the most photographed spots in Bali. Nusa Lembongan is for sunset cocktails, easy snorkeling, and a slower-paced beach holiday. They are 15 minutes apart by boat — many trips combine both.',
        ],
      },
      {
        heading: 'Visit Nusa Penida if you want…',
        paragraphs: [
          'You came to Bali to see Kelingking Beach, Diamond Beach, Broken Beach, or Angel Billabong — those are all on Penida. The island is bigger, less developed, and the roads to the viewpoints are rougher. The reward is some of the most striking coastal scenery in Indonesia.',
        ],
        bullets: [
          'Adventure travellers chasing iconic photos',
          'Manta ray snorkeling (peak spots are off Penida)',
          'Day trips from Bali',
          'Travellers who do not mind bumpy rides for big payoff',
        ],
      },
      {
        heading: 'Visit Nusa Lembongan if you want…',
        paragraphs: [
          'You want a quieter island, more developed accommodation, easier snorkeling at calm beaches, and a sunset bar scene. Lembongan is smaller and you can comfortably explore it with a scooter in a single day. Devil\'s Tear, Dream Beach, and the yellow bridge to Ceningan are the highlights.',
        ],
        bullets: [
          'Couples on a relaxed beach holiday',
          'First-time snorkelers who want gentler water',
          'Travellers who want walkable bars and restaurants',
          'Surfers (the surf around Lembongan is well-loved)',
        ],
      },
      {
        heading: 'Doing both in one trip',
        paragraphs: [
          'A common 3-day plan: arrive in Lembongan on day 1 for a relaxed start, take the 15-minute boat to Penida for a full Mix Trip on day 2, and return for sunset back on Lembongan. Boats between the two run hourly through the day.',
          'For day-trippers from Bali, Penida is the better single-day choice because the iconic viewpoints are concentrated there. If you have at least one overnight, doing both gives you the variety.',
        ],
      },
    ],
    relatedGuideSlugs: [
      'how-to-get-to-nusa-penida',
      'best-time-to-visit-nusa-penida',
      'nusa-penida-itinerary',
    ],
  },
];

export const GUIDE_CATEGORIES: Record<Guide['category'], string> = {
  planning: 'Trip planning',
  'getting-around': 'Getting around',
  comparison: 'Comparisons',
  tips: 'Tips & essentials',
};

export function getAllGuides(): Guide[] {
  return [...GUIDES].sort(
    (a, b) =>
      new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime(),
  );
}

export function getGuideBySlug(slug: string): Guide | null {
  return GUIDES.find((g) => g.slug === slug) || null;
}

export function getGuidesBySlugs(slugs: string[]): Guide[] {
  return slugs
    .map((s) => GUIDES.find((g) => g.slug === s))
    .filter((g): g is Guide => g !== undefined);
}
