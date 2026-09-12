import site from '../content/site.json';
export { site };
export const siteConfig = { ...site.brand, shortName: site.brand.name };
export const textTemplate = (text, values) => text.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
