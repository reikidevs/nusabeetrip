import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = process.cwd();
const SOURCE_ROOTS = [join(ROOT, 'src'), join(ROOT, 'scripts')];
const PUBLIC_ROOT = join(ROOT, 'public');
const SOURCE_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx']);

type ImageReference = {
  file: string;
  line: number;
  url: string;
};

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === '__tests__') return [];
      return sourceFiles(fullPath);
    }

    const extension = entry.name.slice(entry.name.lastIndexOf('.'));
    if (!SOURCE_EXTENSIONS.has(extension)) return [];
    if (/\.(?:test|spec)\.[jt]sx?$/.test(entry.name)) return [];
    return [fullPath];
  });
}

function imageReferences(): ImageReference[] {
  const pattern = /(["'`])(\/images\/[^"'`\r\n?#]+)\1/g;

  return SOURCE_ROOTS.flatMap(sourceFiles).flatMap((file) => {
    const source = readFileSync(file, 'utf8');
    return Array.from(source.matchAll(pattern), (match) => ({
      file: relative(ROOT, file),
      line: source.slice(0, match.index).split('\n').length,
      url: match[2],
    }));
  });
}

function exactPublicFileExists(decodedUrl: string): boolean {
  const segments = decodedUrl.replace(/^\/+/, '').split('/');
  let current = PUBLIC_ROOT;

  for (const segment of segments) {
    if (!existsSync(current) || !statSync(current).isDirectory()) return false;
    const exactEntry = readdirSync(current).find((entry) => entry === segment);
    if (!exactEntry) return false;
    current = join(current, exactEntry);
  }

  return existsSync(current) && statSync(current).isFile();
}

describe('production image assets', () => {
  const references = imageReferences();

  it('uses URL paths that are safe for the production image optimizer', () => {
    const unsafe = references.filter((reference) =>
      /\+|%2b/i.test(reference.url),
    );

    expect(
      unsafe.map(
        ({ file, line, url }) =>
          `${file}:${line} uses ${url}; reserved plus signs break the Next.js image optimizer, so use a kebab-case path.`,
      ),
    ).toEqual([]);
  });

  it('matches every local image file with exact production casing', () => {
    const problems = references.flatMap((reference) => {
      let decodedUrl: string;

      try {
        decodedUrl = decodeURIComponent(reference.url);
      } catch {
        return [
          `${reference.file}:${reference.line} has invalid URL encoding: ${reference.url}`,
        ];
      }

      const normalized = decodedUrl.split('/').join(sep);
      if (
        decodedUrl.includes('\0') ||
        decodedUrl.split('/').includes('..') ||
        !normalized.startsWith(`${sep}images${sep}`)
      ) {
        return [
          `${reference.file}:${reference.line} has an unsafe image path: ${reference.url}`,
        ];
      }

      return exactPublicFileExists(decodedUrl)
        ? []
        : [
            `${reference.file}:${reference.line} does not match a tracked public file exactly: ${reference.url}`,
          ];
    });

    expect(problems).toEqual([]);
  });

  it('ships a stable, square Google Search favicon', () => {
    const faviconPath = join(PUBLIC_ROOT, 'favicon.svg');
    expect(existsSync(faviconPath)).toBe(true);
    expect(readFileSync(faviconPath, 'utf8')).toMatch(
      /viewBox=["']0 0 512 512["']/,
    );
  });
});
