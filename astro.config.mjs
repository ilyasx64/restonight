import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://restonight.netlify.app',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
