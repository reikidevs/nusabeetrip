import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('homepage image assets', () => {
  it('uses the production-safe snorkeling image path', () => {
    const homepageSource = readFileSync(join(process.cwd(), 'src/app/page.tsx'), 'utf8');

    expect(homepageSource).toContain('/images/Snorkeling%20+%20Manta%20Rays/snorkeling%203.jpeg');
    expect(homepageSource).not.toContain('/images/Snorkeling%20%2B%20Manta%20Rays/snorkeling%203.jpeg');
  });
});
