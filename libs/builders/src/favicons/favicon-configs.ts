import { PngFaviconOptions, IcoFaviconOptions, SvgFaviconOptions } from './create-favicon';

export interface FaviconConfig {
  config: PngFaviconOptions | IcoFaviconOptions | SvgFaviconOptions;
  dest: 'link' | 'manifest';
  rel?: string;
  type?: string;
}

// Configuration taken from https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
export const faviconConfigs: FaviconConfig[] = [
  { config: { type: 'ico', background: null }, dest: 'link', rel: 'icon' },
  { config: { type: 'svg', background: null }, dest: 'link', rel: 'icon', type: 'image/svg+xml' },
  { config: { type: 'png', width: 180, height: 180, padding: 20, background: null }, dest: 'link', rel: 'apple-touch-icon' },
  { config: { type: 'png', width: 192, height: 192, background: null }, dest: 'manifest', type: 'image/png' },
  { config: { type: 'png', width: 512, height: 512, background: null }, dest: 'manifest', type: 'image/png' },
];
