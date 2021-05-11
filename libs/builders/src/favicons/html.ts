import * as path from 'path';

import cheerio from 'cheerio';
import * as fs from 'fs-extra';

import { writeFormatted } from '../core';
import { FaviconConfig } from './favicon-configs';

export type CheerioRoot = ReturnType<typeof cheerio.load>;
export type Cheerio = ReturnType<typeof cheerio>;

export async function loadIndex(outputPath: string, index: string): Promise<CheerioRoot> {
  index = path.parse(index).base;
  index = path.join(outputPath, index);
  const file: Buffer = await fs.readFile(index);
  return cheerio.load(file);
}

export function removeFavicon(indexDocument: CheerioRoot): void {
  indexDocument('head').find('link[rel="icon"]').remove();
  indexDocument('head').find('link[rel="apple-touch-icon"]').remove();
}

export function addFaviconIndex(indexDocument: CheerioRoot, iconName: string | null, faviconConfig: FaviconConfig): void {
  if (faviconConfig.dest !== 'link' || iconName == null) {
    return;
  }

  const linkType: string = faviconConfig.type != null ? `type="${faviconConfig.type}"` : '';
  const link = `<link rel="${faviconConfig.rel}" href="${iconName}" ${linkType}>`;
  indexDocument('head base').after(link);
}

export async function saveIndex(outputPath: string, index: string, indexDocument: CheerioRoot): Promise<void> {
  index = path.parse(index).base;
  index = path.join(outputPath, index);
  await writeFormatted(index, indexDocument.html());
}
