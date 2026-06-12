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

  {
    slug: 'is-nusa-penida-worth-it',
    title: 'Is Nusa Penida Worth Visiting? An Honest Answer',
    excerpt:
      'A straight answer on whether Nusa Penida is worth the trip from Bali — the highlights, the rough roads, the crowds, and who will love it most.',
    heroImage: '/images/West%20Trip/West%20Trip%20Kelingking%20Beach%205.jpeg',
    readingMinutes: 6,
    datePublished: '2026-03-18',
    dateModified: '2026-06-01',
    category: 'planning',
    keywords: [
      'is nusa penida worth it',
      'is nusa penida worth visiting',
      'nusa penida day trip worth it',
      'should i visit nusa penida',
      'apakah nusa penida worth it',
    ],
    sections: [
      {
        heading: 'The short answer: yes, with one caveat',
        paragraphs: [
          'Nusa Penida is worth it. The scenery at Kelingking, Diamond Beach, and Broken Beach is among the most striking in all of Indonesia, and photos genuinely do not do it justice. The one caveat is the roads — they are rough, steep, and slow, so a day here involves more driving than people expect.',
          'If you accept that the island trades comfort for raw beauty, you will leave happy. If you need smooth roads and quick transfers, manage your expectations or book a guided tour so you are not navigating the tracks yourself.',
        ],
      },
      {
        heading: 'What makes it worth the trip',
        paragraphs: [
          'The west coast viewpoints are the headline. Kelingking\'s T-Rex cliff, the natural arch at Broken Beach, and the infinity pool at Angel Billabong are all within a short drive of each other. On the east coast, Diamond Beach and Atuh Beach deliver the postcard turquoise water.',
          'Beyond the views, the manta ray snorkeling off the south coast is a highlight in its own right — you can reliably swim alongside wild manta rays year-round.',
        ],
        bullets: [
          'Kelingking Beach — the most photographed spot in Bali',
          'Diamond Beach & Atuh Beach — turquoise bays on the east',
          'Manta ray snorkeling — wild mantas, all year',
          'Far fewer resorts and traffic than mainland Bali',
        ],
      },
      {
        heading: 'The honest downsides',
        paragraphs: [
          'Roads to the famous spots are narrow and potholed. Popular viewpoints get busy between 10:00 and 14:00 when day-tripper boats arrive together. And facilities are basic — expect simple warungs, not beach clubs.',
          'A guided tour solves most of this: an experienced driver handles the roads, times your stops to dodge the crowds, and knows where to park.',
        ],
      },
      {
        heading: 'Who will love Nusa Penida most',
        paragraphs: [
          'Adventure travellers, photographers, and anyone who prioritises scenery over polish will love it. Families do well on a guided Mix Trip with a car. Travellers who want a resort-style relaxed beach day may prefer Nusa Lembongan next door.',
        ],
      },
    ],
    relatedGuideSlugs: [
      'nusa-penida-itinerary',
      'nusa-penida-vs-lembongan',
      'nusa-penida-tour-cost',
    ],
  },

  {
    slug: 'nusa-penida-tour-cost',
    title: 'How Much Does a Nusa Penida Tour Cost? (2026 Prices)',
    excerpt:
      'A clear breakdown of Nusa Penida tour prices in 2026 — tour packages, boat tickets, scooter rental, entrance fees, and how to budget your day trip.',
    heroImage: '/images/Mix%20Trip%20View%20Thoussand%20Island%20and%20Crystal%20bay%20Beach.png',
    readingMinutes: 7,
    datePublished: '2026-03-25',
    dateModified: '2026-06-05',
    category: 'planning',
    keywords: [
      'nusa penida tour cost',
      'nusa penida tour price',
      'how much is a nusa penida tour',
      'nusa penida day trip price',
      'harga tour nusa penida',
      'budget nusa penida',
    ],
    sections: [
      {
        heading: 'Quick price overview',
        paragraphs: [
          'A guided Nusa Penida day tour with NusaBeeTrip starts at IDR 390,000 per person for the West Trip and IDR 430,000 for the East Trip, with the Mix Trip at IDR 500,000. Manta ray snorkeling starts from IDR 200,000. Prices include transport on the island, a guide, and hotel pickup.',
          'On top of the tour, budget for the fast boat from Sanur (roughly IDR 100,000–175,000 each way) and a small amount of cash for entrance fees and lunch.',
        ],
        bullets: [
          'West Trip — from IDR 390,000 per person',
          'East Trip — from IDR 430,000 per person',
          'Mix Trip (west + east) — from IDR 500,000 per person',
          'Manta snorkeling — from IDR 200,000 per person',
          'Fast boat Sanur ↔ Penida — IDR 100,000–175,000 each way',
        ],
      },
      {
        heading: 'What is included in our tour price',
        paragraphs: [
          'Our packages bundle the costs that catch independent travellers by surprise. Each tour covers private transport, fuel, a local guide/driver, hotel or harbour pickup and drop-off, and the destination entrance/parking fees along the route.',
        ],
        bullets: [
          'Private air-conditioned car or scooter transport',
          'Local English-speaking guide / driver',
          'Hotel or harbour pickup and drop-off',
          'Entrance and parking fees on the itinerary',
        ],
      },
      {
        heading: 'Costs to budget separately',
        paragraphs: [
          'The fast boat ticket is booked separately and is the largest add-on. Lunch at a local warung is cheap (IDR 30,000–60,000). Bring small IDR notes for occasional harbour fees and tips.',
        ],
        bullets: [
          'Fast boat ticket (round trip): IDR 200,000–350,000',
          'Lunch: IDR 30,000–60,000 at local warungs',
          'Optional travel insurance and tips',
        ],
      },
      {
        heading: 'How to keep the cost down',
        paragraphs: [
          'Travelling as a small group lowers the per-person transport cost, so bring friends. Book the early boat for a full day so you get more value from the tour. And book directly via WhatsApp — there is no agent markup, so you pay the local price.',
        ],
      },
    ],
    relatedGuideSlugs: [
      'how-to-get-to-nusa-penida',
      'nusa-penida-itinerary',
      'is-nusa-penida-worth-it',
    ],
  },

  {
    slug: 'manta-ray-snorkeling-nusa-penida',
    title: 'Manta Ray Snorkeling in Nusa Penida: Complete Guide',
    excerpt:
      'Everything about snorkeling with manta rays in Nusa Penida — Manta Point vs Manta Bay, the best season, what to expect, and how to book a responsible trip.',
    heroImage: '/images/Snorkeling%20%2B%20Manta%20Rays/snorkeling%203.jpeg',
    readingMinutes: 6,
    datePublished: '2026-04-02',
    dateModified: '2026-06-08',
    category: 'tips',
    keywords: [
      'manta ray snorkeling nusa penida',
      'manta point nusa penida',
      'swim with manta rays bali',
      'manta bay nusa penida',
      'snorkeling manta nusa penida',
    ],
    sections: [
      {
        heading: 'Why manta snorkeling is the island\'s best activity',
        paragraphs: [
          'Off the south coast of Nusa Penida, wild manta rays gather to feed and visit cleaning stations year-round. Unlike many places where sightings are seasonal or rare, here you have a genuinely high chance of swimming alongside mantas with wingspans of three metres or more.',
          'You do not need a diving licence. The snorkeling trips float you above the mantas at the surface, so any confident swimmer can join.',
        ],
      },
      {
        heading: 'Manta Point vs Manta Bay',
        paragraphs: [
          'There are two main manta sites. Manta Point (Batu Lumbung) is the most reliable spot for sightings and is the classic stop. Manta Bay is closer to Crystal Bay and used when seas at Manta Point are rough. Boats choose the calmer, better site on the day.',
        ],
        bullets: [
          'Manta Point (Batu Lumbung) — highest sighting rate, can be choppy',
          'Manta Bay — calmer alternative, used in bigger swells',
          'Other reef stops — Crystal Bay & Gamat Bay for colourful fish',
        ],
      },
      {
        heading: 'Best time and conditions',
        paragraphs: [
          'Mantas are present all year, with especially good encounters from April to November. Mornings usually have the calmest sea. The water can be cooler at the manta sites because of upwelling, so a rash guard helps.',
        ],
      },
      {
        heading: 'What to expect and how to be responsible',
        paragraphs: [
          'A typical trip visits two to three snorkel spots over about two hours on the water. Keep a respectful distance from the mantas, never touch or chase them, and use reef-safe sunscreen. Our guides brief you before you enter the water and keep the group safe around the swell.',
          'You can add manta snorkeling to a West Trip, or book it as part of our snorkeling packages.',
        ],
      },
    ],
    relatedGuideSlugs: [
      'best-time-to-visit-nusa-penida',
      'what-to-pack-nusa-penida',
      'nusa-penida-itinerary',
    ],
  },

  {
    slug: 'renting-a-scooter-in-nusa-penida',
    title: 'Renting a Scooter in Nusa Penida: What You Need to Know',
    excerpt:
      'Honest advice on renting a scooter in Nusa Penida — prices, road conditions, safety, licence rules, and when hiring a driver is the smarter choice.',
    heroImage: '/images/Vehicle%20Rentals/Yamaha%20N-Max.webp',
    readingMinutes: 6,
    datePublished: '2026-04-10',
    dateModified: '2026-06-09',
    category: 'getting-around',
    keywords: [
      'renting a scooter in nusa penida',
      'nusa penida scooter rental',
      'sewa motor nusa penida',
      'nusa penida motorbike rental',
      'rental motor nusa penida murah',
    ],
    sections: [
      {
        heading: 'How much does scooter rental cost?',
        paragraphs: [
          'A scooter in Nusa Penida typically rents for IDR 70,000–100,000 per day for a basic automatic like a Honda Scoopy, and a little more for a larger Yamaha N-Max with stronger brakes. We provide well-serviced scooters, helmets, and a quick safety briefing before you ride.',
          'Fuel is cheap and sold at small roadside shops in glass bottles as well as proper stations. Budget a small amount of cash for petrol top-ups during the day.',
        ],
        bullets: [
          'Honda Scoopy / Vario — from IDR 70,000–90,000 per day',
          'Yamaha N-Max (stronger brakes, recommended) — slightly higher',
          'Helmet included; bring your own if you prefer',
        ],
      },
      {
        heading: 'The roads are the real consideration',
        paragraphs: [
          'This is the part many travellers underestimate. Roads to the famous viewpoints are steep, narrow, and broken in places. The climb back up from Kelingking and the tracks to Diamond Beach are demanding even for experienced riders, especially two-up with a passenger and bags.',
          'If you ride confidently and travel light, a scooter gives you total freedom. If you are a nervous rider or carrying a passenger, the steep sections can be genuinely risky.',
        ],
      },
      {
        heading: 'Safety and the licence question',
        paragraphs: [
          'Wear the helmet, ride within your limits, and never rush to beat a boat. Carry an International Driving Permit with a motorcycle category plus your home licence — it is required to ride legally and matters for travel insurance if anything happens.',
          'Most travel insurance only covers scooter accidents if you hold the correct licence. Ride uninsured and a small fall can become an expensive problem.',
        ],
      },
      {
        heading: 'When to hire a driver instead',
        paragraphs: [
          'For first-time visitors, families, or anyone uneasy on steep roads, a car with a driver or a guided tour is the safer and often more relaxing choice. You see the same spots without managing the tracks yourself, and a local driver knows the timing that avoids the crowds.',
          'We offer both — scooter rental for confident riders and a car-with-driver option for everyone else.',
        ],
      },
    ],
    relatedGuideSlugs: [
      'nusa-penida-itinerary',
      'what-to-pack-nusa-penida',
      'is-nusa-penida-worth-it',
    ],
  },

  {
    slug: 'where-to-stay-nusa-penida',
    title: 'Where to Stay in Nusa Penida: Best Areas Explained',
    excerpt:
      'A guide to the best areas to stay in Nusa Penida — Toyapakeh, Crystal Bay, Ped, and the east coast — matched to what you want from your trip.',
    heroImage: '/images/West%20Trip/West%20Trip%20Crystal%20Bay%20Beach%203.jpeg',
    readingMinutes: 5,
    datePublished: '2026-04-18',
    dateModified: '2026-06-10',
    category: 'planning',
    keywords: [
      'where to stay nusa penida',
      'best area to stay nusa penida',
      'nusa penida accommodation',
      'nusa penida hotels',
      'penginapan nusa penida',
    ],
    sections: [
      {
        heading: 'Pick your area by what you want',
        paragraphs: [
          'Nusa Penida has no single "main town", so where you stay shapes your trip. The north-west coast around Toyapakeh and Ped is the most convenient base — close to the harbour, restaurants, and the west-coast viewpoints. The east coast is quieter and more scenic but far from everything else.',
        ],
      },
      {
        heading: 'North-west: Toyapakeh & Ped (most convenient)',
        paragraphs: [
          'This stretch near the main harbour has the widest choice of accommodation, the most warungs and cafes, and the shortest transfers to Kelingking, Broken Beach, and Crystal Bay. If it is your first visit or a short stay, base yourself here.',
        ],
        bullets: [
          'Closest to the fast-boat harbour',
          'Most restaurants and shops',
          'Short drive to west-coast viewpoints',
        ],
      },
      {
        heading: 'Crystal Bay area (beach & sunset)',
        paragraphs: [
          'Staying near Crystal Bay puts you next to the island\'s most swimmable beach and the best sunsets. It is slightly further from the harbour but ideal if you want a relaxed beach base and easy access to snorkeling boats.',
        ],
      },
      {
        heading: 'East coast (quiet & scenic)',
        paragraphs: [
          'The east coast near Atuh and Diamond Beach is beautiful and peaceful, with clifftop views. The trade-off is distance — everything else on the island is a long, slow drive away, so it suits travellers staying several nights who want calm over convenience.',
        ],
      },
      {
        heading: 'Our tip for short trips',
        paragraphs: [
          'For a one or two-night trip, stay in the Toyapakeh–Ped area and let us handle transport to the viewpoints. You waste no time on long transfers and can still reach both coasts on a Mix Trip. Tell us your hotel when booking and we arrange pickup.',
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
    slug: 'nusa-penida-day-trip-from-ubud',
    title: 'Nusa Penida Day Trip from Ubud: Full Guide',
    excerpt:
      'How to do a Nusa Penida day trip from Ubud — transfer times, the right boat, a realistic timeline, costs, and the easiest way to see Kelingking in one day.',
    heroImage: '/images/West%20Trip/West%20trip%20kelingking%20beach%202.jpeg',
    readingMinutes: 6,
    datePublished: '2026-06-12',
    dateModified: '2026-06-12',
    category: 'planning',
    keywords: [
      'nusa penida day trip from ubud',
      'ubud to nusa penida',
      'nusa penida from ubud',
      'day trip nusa penida ubud',
      'ubud to nusa penida tour',
    ],
    sections: [
      {
        heading: 'Is a day trip from Ubud realistic?',
        paragraphs: [
          'Yes — but it is a long day, so the plan matters. Ubud sits inland, about 60–90 minutes by car from Sanur harbour, which is where most Nusa Penida fast boats leave. Add the 30-minute crossing and you are looking at roughly two hours of travel each way before you even reach a viewpoint.',
          'The trick is an early start. Leave Ubud by 06:00, catch the 07:30–08:00 boat from Sanur, and you arrive on the island with a full day ahead. Done right, you can comfortably see the west-coast highlights and be back in Ubud for dinner.',
        ],
      },
      {
        heading: 'A realistic day-trip timeline',
        paragraphs: [
          'This is the schedule we run for guests staying in Ubud. It keeps driving on the island to a minimum and front-loads the most famous spots before the midday crowds.',
        ],
        bullets: [
          '06:00 — Private car picks you up in Ubud',
          '07:30 — Fast boat from Sanur to Nusa Penida',
          '08:15 — Meet your driver/guide at the harbour',
          '09:00 — Kelingking Beach viewpoint',
          '10:30 — Broken Beach & Angel\'s Billabong',
          '12:00 — Crystal Bay for lunch and a swim',
          '14:30 — Return boat to Sanur',
          '16:30 — Back in Ubud',
        ],
      },
      {
        heading: 'West Trip vs East Trip from Ubud',
        paragraphs: [
          'With the travel time from Ubud, a single day suits the West Trip — Kelingking, Broken Beach, Angel\'s Billabong, and Crystal Bay are all close together on the north-west of the island. The East Trip (Diamond Beach, Atuh) involves much longer drives on rough roads and is better as a second day or an overnight stay.',
          'If you only have one day from Ubud and want the postcard shots, choose the West Trip. If you can stay a night, do both coasts at a relaxed pace.',
        ],
      },
      {
        heading: 'What it costs',
        paragraphs: [
          'Budget roughly for: the Ubud–Sanur car transfer, the return fast-boat ticket (about 250,000–350,000 IDR round trip), and your island tour with a driver-guide. Booking it as one package removes the stress of timing each connection yourself — miss the boat and the whole day unravels.',
          'We arrange the entire chain — Ubud pickup, boat, island guide, and return — as a single private day trip so every leg is timed to connect.',
        ],
      },
      {
        heading: 'Tips for the Ubud route',
        paragraphs: [
          'Reserve your boat the night before in high season. Sit on the left side of the boat leaving Sanur for the calmest ride. And avoid the very last return boat — if weather cancels it, you are stuck overnight far from Ubud.',
        ],
      },
    ],
    relatedGuideSlugs: [
      'how-to-get-to-nusa-penida',
      'nusa-penida-itinerary',
      'nusa-penida-tour-cost',
    ],
  },

  {
    slug: 'nusa-penida-day-trip-from-kuta-seminyak',
    title: 'Nusa Penida Day Trip from Kuta & Seminyak',
    excerpt:
      'Planning a Nusa Penida day trip from Kuta, Seminyak, or Legian? Transfer times to Sanur, the right boat, a one-day timeline, and how to make it stress-free.',
    heroImage: '/images/West%20Trip/West%20Trip%20Broken%20Beach%202.jpeg',
    readingMinutes: 6,
    datePublished: '2026-06-12',
    dateModified: '2026-06-12',
    category: 'planning',
    keywords: [
      'nusa penida day trip from kuta',
      'nusa penida from seminyak',
      'kuta to nusa penida',
      'seminyak to nusa penida',
      'nusa penida day trip from legian',
    ],
    sections: [
      {
        heading: 'Getting from Kuta or Seminyak to the boat',
        paragraphs: [
          'Almost every Nusa Penida fast boat leaves from Sanur, on the east side of south Bali. From Kuta, Legian, or Seminyak the drive to Sanur is about 30–50 minutes depending on traffic — and Bali traffic in the morning can be heavy, so leave early.',
          'Plan a car pickup around 06:30 to make the 07:30–08:00 boat. That early start is what makes a relaxed day on the island possible instead of a rushed one.',
        ],
      },
      {
        heading: 'A one-day plan from the Kuta area',
        paragraphs: [
          'Because you spend less time in transfers than guests coming from Ubud, you have a little more flexibility — but the west coast is still the smart choice for a single day.',
        ],
        bullets: [
          '06:30 — Pickup in Kuta / Seminyak / Legian',
          '07:30 — Fast boat from Sanur',
          '08:15 — Meet your guide on the island',
          '09:00 — Kelingking Beach',
          '10:30 — Broken Beach & Angel\'s Billabong',
          '12:00 — Crystal Bay (lunch + swim)',
          '14:30 — Return boat to Sanur',
          '15:30 — Back in Kuta / Seminyak',
        ],
      },
      {
        heading: 'Should you stay overnight instead?',
        paragraphs: [
          'A day trip works well for the west-coast highlights. But if you want both Kelingking and Diamond Beach without rushing, an overnight stay removes the boat-time pressure and lets you catch sunrise or sunset at the viewpoints. From the Kuta area it is easy to do either — your call on pace versus depth.',
        ],
      },
      {
        heading: 'Make it stress-free',
        paragraphs: [
          'The hardest part of a day trip from Kuta or Seminyak is connecting the car, the boat, and the island transport on a tight schedule. We package all three into one private trip so the timing is handled and you simply enjoy the day. Tell us your hotel and we arrange pickup at the right time.',
        ],
      },
    ],
    relatedGuideSlugs: [
      'how-to-get-to-nusa-penida',
      'nusa-penida-day-trip-from-ubud',
      'nusa-penida-tour-cost',
    ],
  },

  {
    slug: 'best-beaches-nusa-penida',
    title: 'Best Beaches in Nusa Penida',
    excerpt:
      'The best beaches in Nusa Penida ranked — Kelingking, Crystal Bay, Diamond Beach, Atuh, and more — with what each is good for and how hard they are to reach.',
    heroImage: '/images/East%20Trip/East%20Trip%20Atuh%20Beach%202.jpeg',
    readingMinutes: 7,
    datePublished: '2026-06-12',
    dateModified: '2026-06-12',
    category: 'tips',
    keywords: [
      'best beaches nusa penida',
      'nusa penida beaches',
      'crystal bay nusa penida',
      'atuh beach nusa penida',
      'pantai terbaik nusa penida',
    ],
    sections: [
      {
        heading: 'How to choose a Nusa Penida beach',
        paragraphs: [
          'Nusa Penida beaches fall into two types: dramatic clifftop viewpoints you photograph from above, and swimmable bays you actually relax on. Some of the most famous "beaches" are really viewpoints with a hard climb down — knowing the difference saves disappointment.',
        ],
      },
      {
        heading: 'Crystal Bay — best for swimming & sunset',
        paragraphs: [
          'Crystal Bay is the most accessible swimmable beach on the island, with calm clear water, soft sand, and shade. It is the easiest place to relax, snorkel near the shore, and watch the sunset. If you want a beach you can lie on, this is the one.',
        ],
      },
      {
        heading: 'Kelingking Beach — best view, hardest descent',
        paragraphs: [
          'The T-Rex-shaped cliff at Kelingking is the island\'s signature shot. The viewpoint at the top is unmissable. Reaching the sand itself means a steep, rope-assisted 30–45 minute climb down — and a tougher climb back up. The view from the top is the real reward; the descent is for the adventurous.',
        ],
      },
      {
        heading: 'Diamond Beach & Atuh — best on the east coast',
        paragraphs: [
          'Diamond Beach has a carved stairway down to white sand framed by limestone pillars — stunning, though swimming can be unsafe due to currents. Next door, Atuh Beach is gentler and easier to enjoy in the water. Both sit on the quieter east coast and pair naturally on an East Trip.',
        ],
        bullets: [
          'Diamond Beach — iconic stairway and pillars (photos)',
          'Atuh Beach — calmer, easier to swim',
          'Best combined on a single East Trip day',
        ],
      },
      {
        heading: 'Which beaches fit which trip',
        paragraphs: [
          'On a West Trip you get Crystal Bay and the Kelingking viewpoint. On an East Trip you get Diamond and Atuh. To see beaches on both coasts in one day you need a Mix Trip and an early start. If a relaxed swim is your priority, build the day around Crystal Bay; if it is photos, prioritise Kelingking and Diamond.',
        ],
      },
    ],
    relatedGuideSlugs: [
      'nusa-penida-itinerary',
      'manta-ray-snorkeling-nusa-penida',
      'best-time-to-visit-nusa-penida',
    ],
  },

  {
    slug: 'things-to-do-nusa-penida',
    title: 'Things to Do in Nusa Penida: Top Activities',
    excerpt:
      'The best things to do in Nusa Penida — viewpoints, snorkeling with manta rays, beaches, and hidden spots — and how to fit them into your trip.',
    heroImage: '/images/West%20Trip/West%20trip%20kelingking%20beach%203.jpeg',
    readingMinutes: 6,
    datePublished: '2026-06-12',
    dateModified: '2026-06-12',
    category: 'planning',
    keywords: [
      'things to do in nusa penida',
      'what to do in nusa penida',
      'nusa penida activities',
      'nusa penida attractions',
      'tempat wisata nusa penida',
    ],
    sections: [
      {
        heading: 'The essentials you should not miss',
        paragraphs: [
          'Nusa Penida packs an enormous amount into a small island. If it is your first visit, prioritise the icons: the Kelingking cliff viewpoint, Broken Beach and Angel\'s Billabong, Crystal Bay for swimming, and — if you can stay longer — Diamond and Atuh beaches on the east coast.',
        ],
        bullets: [
          'Kelingking Beach viewpoint (the T-Rex cliff)',
          'Broken Beach & Angel\'s Billabong',
          'Crystal Bay — swim and sunset',
          'Diamond Beach & Atuh (east coast)',
          'Snorkeling with manta rays',
        ],
      },
      {
        heading: 'Snorkeling & manta rays',
        paragraphs: [
          'The waters around Nusa Penida are some of the best in Bali for snorkeling. Boat trips visit Manta Point, where you can swim alongside manta rays year-round, plus colourful reef stops like Gamat Bay and Wall. It is the single most memorable activity on the island for many visitors.',
        ],
      },
      {
        heading: 'Viewpoints & photography',
        paragraphs: [
          'Beyond the famous beaches, the island is full of clifftop viewpoints — Thousand Islands viewpoint on the east, Banah Cliff, and the Tree House at Molenteng. Early morning gives soft light and far fewer people, so plan the photogenic spots first.',
        ],
      },
      {
        heading: 'How much can you do in one day?',
        paragraphs: [
          'In a single day you can realistically cover one coast well — either the west (Kelingking, Broken Beach, Crystal Bay) or the east (Diamond, Atuh, Thousand Islands). Trying to do both in a day means a lot of rough driving and little time to enjoy each stop. Two days, or an overnight, lets you see it all at a relaxed pace.',
          'We run West, East, Mix, and snorkeling trips so you can match the day to what you most want to see. Tell us your priorities and we build the route around them.',
        ],
      },
    ],
    relatedGuideSlugs: [
      'nusa-penida-itinerary',
      'best-beaches-nusa-penida',
      'manta-ray-snorkeling-nusa-penida',
    ],
  },

  {
    slug: 'nusa-penida-with-family',
    title: 'Nusa Penida with Family: Kids & Easy Days',
    excerpt:
      'Visiting Nusa Penida with kids or older parents? Which spots are family-friendly, which to skip, and how to plan an easy, safe day on the island.',
    heroImage: '/images/West%20Trip/West%20Trip%20Crystal%20Bay%20Beach%202.jpeg',
    readingMinutes: 5,
    datePublished: '2026-06-12',
    dateModified: '2026-06-12',
    category: 'tips',
    keywords: [
      'nusa penida with family',
      'nusa penida with kids',
      'nusa penida family trip',
      'is nusa penida good for families',
      'nusa penida family friendly',
    ],
    sections: [
      {
        heading: 'Is Nusa Penida good for families?',
        paragraphs: [
          'Yes — with the right plan. Nusa Penida is wonderful for families if you focus on the easy, swimmable spots and skip the steep cliff descents. The island\'s roads are bumpy and some viewpoints involve hard climbs, so a private car with a driver makes all the difference for travelling with kids or older relatives.',
        ],
      },
      {
        heading: 'Family-friendly spots',
        paragraphs: [
          'Crystal Bay is the standout for families — calm water, sand to play on, shade, and easy access. The Kelingking viewpoint is fine for everyone from the top (no need to climb down). Broken Beach and Angel\'s Billabong are short, flat walks with big payoffs.',
        ],
        bullets: [
          'Crystal Bay — swimming and sand',
          'Kelingking — viewpoint from the top only',
          'Broken Beach — easy flat loop',
          'Calm-water snorkeling near Crystal Bay',
        ],
      },
      {
        heading: 'What to skip with young kids',
        paragraphs: [
          'Skip the climb down to Kelingking\'s sand — it is steep, rope-assisted, and not safe for small children or anyone unsteady. Diamond Beach\'s stairway is dramatic but the swimming there can be dangerous. Long east-coast drives can also be tiring for little ones, so keep the day short.',
        ],
      },
      {
        heading: 'Planning an easy family day',
        paragraphs: [
          'Take the morning boat when the sea is calmest, use a private car so you control the pace and can rest when needed, and build the day around Crystal Bay. Bring water, snacks, sun protection, and reef-safe sunscreen. We arrange child-friendly private trips with a driver who knows which stops work for families.',
        ],
      },
    ],
    relatedGuideSlugs: [
      'best-beaches-nusa-penida',
      'what-to-pack-nusa-penida',
      'nusa-penida-itinerary',
    ],
  },

  {
    slug: 'nusa-penida-travel-tips',
    title: 'Nusa Penida Travel Tips: First-Timer Guide',
    excerpt:
      'Essential Nusa Penida travel tips — safety, money, roads, what to avoid, and the common mistakes first-time visitors make. Read this before you go.',
    heroImage: '/images/East%20Trip/East%20Trip%20Diamond%20Beach%203.jpeg',
    readingMinutes: 6,
    datePublished: '2026-06-12',
    dateModified: '2026-06-12',
    category: 'tips',
    keywords: [
      'nusa penida travel tips',
      'is nusa penida safe',
      'nusa penida first time',
      'nusa penida mistakes to avoid',
      'tips wisata nusa penida',
    ],
    sections: [
      {
        heading: 'Is Nusa Penida safe?',
        paragraphs: [
          'Nusa Penida is generally very safe for travellers. The real risks are not crime — they are the roads, the cliffs, and the sea. Steep, narrow roads make inexperienced scooter riders the most common cause of injury, some "beaches" have strong currents, and a few viewpoints have unfenced edges. Respect those and you will have a safe trip.',
        ],
      },
      {
        heading: 'Money & connectivity',
        paragraphs: [
          'Bring enough cash in IDR. ATMs exist but are limited and sometimes empty, and many small warungs and harbour fees are cash-only. Mobile signal is good near the harbour and main areas but patchy in the east. Download an offline map before you go.',
        ],
        bullets: [
          'Carry cash — ATMs are scarce and unreliable',
          'Download an offline map of the island',
          'Signal is weak on the east coast',
        ],
      },
      {
        heading: 'Getting around safely',
        paragraphs: [
          'Only rent a scooter if you are a confident rider — the roads are steep, sandy, and busy with trucks. For most visitors a private car with a driver is safer, cooler, and lets you enjoy the views instead of fighting the road. If you do ride, wear a helmet and check the brakes before you leave.',
        ],
      },
      {
        heading: 'Common first-timer mistakes',
        paragraphs: [
          'The biggest mistakes: trying to see both coasts in one short day, booking the last return boat (which strands you if it cancels), underestimating the Kelingking climb, and arriving at popular viewpoints at midday with the crowds. Start early, plan one coast per day, and you avoid all four.',
          'When you book with us we handle the boat timing, the route, and the pace — so first-timers skip the rookie mistakes entirely.',
        ],
      },
    ],
    relatedGuideSlugs: [
      'what-to-pack-nusa-penida',
      'how-to-get-to-nusa-penida',
      'renting-a-scooter-in-nusa-penida',
    ],
  },
];

export const GUIDE_CATEGORIES: Record<Guide['category'], string> = {
  planning: 'Trip planning',
  'getting-around': 'Getting around',
  comparison: 'Comparisons',
  tips: 'Tips & essentials',
};

/** Flatten all section text into a single plain-text body (for Article schema). */
export function getGuideArticleBody(guide: Guide): string {
  return guide.sections
    .flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])])
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Approximate word count of a guide — a depth signal for search engines. */
export function getGuideWordCount(guide: Guide): number {
  const body = getGuideArticleBody(guide);
  return body ? body.split(/\s+/).length : 0;
}

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
