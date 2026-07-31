import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('homepage image assets', () => {
  it('uses the production-safe snorkeling image path', () => {
    const homepageSource = readFileSync(join(process.cwd(), 'src/app/page.tsx'), 'utf8');

    expect(homepageSource).toContain('/images/snorkeling-manta-rays/snorkeling-manta-rays-nusa-penida-3.jpeg');
    expect(homepageSource).not.toContain('/images/Snorkeling%20+%20Manta%20Rays');
  });
});
