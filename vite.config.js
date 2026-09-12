import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readContent } from './scripts/content.js';

const escapeHtml = text => text.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
export default defineConfig({
  plugins: [react(), {
    name: 'tomtamx-content',
    buildStart() { readContent(); },
    transformIndexHtml(html) {
      const { site } = readContent();
      const values = {
        TITLE: site.seo.title,
        DESCRIPTION: site.seo.description,
        LANGUAGE: site.seo.language,
        LOGO: site.brand.logo,
        ACCENT: site.appearance.accentColor,
        THEME: site.appearance.defaultTheme
      };
      return html.replace(/__SITE_(\w+)__/g, (match, key) => escapeHtml(values[key] ?? match));
    },
    handleHotUpdate({ file, server }) {
      if (/[/\\]content[/\\](site|suite)\.json$/.test(file)) {
        readContent();
        server.ws.send({ type: 'full-reload' });
      }
    }
  }],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api/rscripts': {
        target: 'https://rscripts.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rscripts/, '/api/v2/scripts')
      }
    }
  }
});
