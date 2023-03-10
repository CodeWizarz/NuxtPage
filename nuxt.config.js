import { isDevelopment } from 'std-env';
import GLSL from 'vite-plugin-glsl';
import SVGLoader from 'vite-svg-loader';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  routeRules: {
    '/sitemap.xml': { prerender: true },
  },

  sourcemap: isDevelopment,

  css: [
    'normalize.css/normalize.css',
    'locomotive-scroll/dist/locomotive-scroll.css',
    '~/assets/fonts/styles.css',
    '~/assets/styles/global.css',
  ],

  build: {
    transpile: ['gsap'],
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/fontaine',
    '@logotip4ik_/nuxt-cloudflare-headers',
  ],

  vite: {
    plugins: [GLSL({ compress: !isDevelopment }), SVGLoader({ svgo: false })],
  },

  cloudflareHeaders: {
    '/*': [
      { 'X-Robots-Tag': 'all' },
      { 'X-Frame-Options': 'DENY' },
      { 'X-Content-Type-Options': 'nosniff' },
      { 'Referrer-Policy': 'no-referrer' },
      { 'Permissions-Policy': 'document-domain=()' },
      // no cache by default
      { 'Cache-Control': 'private, must-revalidate, max-age=0' }
    ],
    // but long cache for assets with build hash
    // week cache and 6 months stale while revalidate
    '/_nuxt/*': { 'Cache-Control': 'public, immutable, max-age=604800, stale-while-revalidate=16070400' },
  },
});
