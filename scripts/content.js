import { readFileSync } from 'node:fs';

const contentRoot = new URL('../content/', import.meta.url);

export function readContent() {
  const site = JSON.parse(readFileSync(new URL('site.json', contentRoot), 'utf8').replace(/^\uFEFF/, ''));
  const suite = JSON.parse(readFileSync(new URL('suite.json', contentRoot), 'utf8').replace(/^\uFEFF/, ''));
  const fail = message => { throw new Error(`Content JSON: ${message}`); };
  const string = (value, path) => { if (typeof value !== 'string') fail(`${path} must be a string`); };
  const url = (value, path, optional = false) => {
    string(value, path);
    if (optional && !value) return;
    if (!/^(https?:\/\/|\/(?!\/)|#)/i.test(value)) fail(`${path} must start with https://, http://, / or #`);
  };
  const fields = {
    brand: ['name', 'creator', 'logo'],
    seo: ['title', 'description', 'language'],
    appearance: ['defaultTheme', 'accentColor', 'accentTextColor'],
    header: ['libraryLabel'],
    hero: ['eyebrow', 'titleLine1', 'titleLine2', 'titleAccent', 'description', 'buttonLabel', 'buttonUrl', 'creditLabel'],
    featured: ['heading', 'badge', 'subtitle', 'itemLabel', 'caption'],
    catalog: ['eyebrow', 'title', 'description', 'searchPlaceholder', 'sortLabel', 'sortOption', 'allGamesLabel', 'gameSingular', 'gamePlural', 'scriptSingular', 'scriptPlural', 'noScriptsLabel', 'noScriptsBadge', 'availableBadge', 'showingLabel', 'loadMoreLabel', 'emptyTitle', 'emptyDescription', 'clearFiltersLabel'],
    details: ['eyebrow', 'emptyTitle', 'emptyDescription', 'openGameLabel', 'chooseScriptLabel', 'copyLabel', 'copiedLabel'],
    footer: ['creditLabel', 'backToTopLabel'],
    accessibility: ['homeLabel', 'navigationLabel', 'lightThemeLabel', 'darkThemeLabel', 'searchLabel', 'clearSearchLabel', 'sortLabel', 'viewGameLabel', 'closeDetailsLabel']
  };
  for (const [section, names] of Object.entries(fields)) {
    if (!site[section] || typeof site[section] !== 'object') fail(`site.${section} is required`);
    for (const key of names) string(site[section][key], `site.${section}.${key}`);
  }
  if (!['dark', 'light'].includes(site.appearance.defaultTheme)) fail('appearance.defaultTheme must be dark or light');
  for (const key of ['accentColor', 'accentTextColor']) if (!/^#[0-9a-f]{6}$/i.test(site.appearance[key])) fail(`appearance.${key} must be a six-digit hex color`);
  if (!Number.isInteger(site.catalog.pageSize) || site.catalog.pageSize < 1 || site.catalog.pageSize > 100) fail('catalog.pageSize must be an integer from 1 to 100');
  url(site.brand.logo, 'brand.logo');
  url(site.hero.buttonUrl, 'hero.buttonUrl');
  if (!suite.masterLoader || !suite.community) fail('suite.json needs masterLoader and community');
  string(suite.masterLoader.code, 'suite.masterLoader.code');
  url(suite.community.github, 'suite.community.github');
  url(suite.community.discord, 'suite.community.discord', true);
  for (const value of [site, suite]) if (/rsc_live_[a-zA-Z0-9]{8,}/.test(JSON.stringify(value))) fail('Never put API keys in public JSON content');
  return { site, suite };
}
