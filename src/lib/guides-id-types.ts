/**
 * Indonesian copy for an English guide.
 *
 * Routing, images, dates, categories, and relationship slugs remain in the
 * canonical English guide record. Only user-visible and search-facing copy is
 * overridden here so both locales stay structurally in sync.
 */
export interface GuideIdSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuideIdFaq {
  question: string;
  answer: string;
}

export interface GuideIdTranslation {
  title: string;
  excerpt: string;
  keywords: string[];
  sections: GuideIdSection[];
  faq?: GuideIdFaq[];
  howTo?: {
    name: string;
    description: string;
    totalTime?: string;
    steps: { name: string; text: string }[];
  };
}
