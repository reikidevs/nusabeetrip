import type { GuideIdTranslation } from './guides-id-types';
import { GUIDE_ID_TRANSLATIONS_A } from './guides-id-a';
import { GUIDE_ID_TRANSLATIONS_B } from './guides-id-b';

/** Complete Indonesian copy keyed by the canonical guide slug. */
export const GUIDE_ID_TRANSLATIONS: Record<string, GuideIdTranslation> = {
  ...GUIDE_ID_TRANSLATIONS_A,
  ...GUIDE_ID_TRANSLATIONS_B,
};

