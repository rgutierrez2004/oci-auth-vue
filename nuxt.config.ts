export default defineNuxtConfig({
  runtimeConfig: {
    // The private vars which are only available within server-side
    ociClientId: process.env.OCI_CLIENT_ID,
    ociClientSecret:  process.env.OCI_CLIENT_SECRET,
    ociDomainUrl: process.env.OCI_DOMAIN_URL,
    ociWellKnownUrl: process.env.OCI_WELL_KNOWN_URL,
    ociLogoutUrl: process.env.OCI_LOGOUT_URL,
    ociUserinfoUrl: process.env.OCI_USERINFO_URL,
    ociScope: process.env.OCI_SCOPE,
    // Vars within public, will be also exposed to the client-side
    public: {
      // Your public variables
    }
  },

  modules: [
    '@sidebase/nuxt-auth',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
    'nuxt-og-image',
    '@pinia/nuxt'
  ],

  extends: ['@nuxt/ui-pro'],

  ui: {
    icons: ['heroicons', 'simple-icons'],
    prefix: 'U'
  },

  components: {
    global: true,
    dirs: ['~/components']
  },

  fontMetrics: {
    fonts: ['DM Sans']
  },

  googleFonts: {
    display: 'swap',
    download: true,
    families: {
      'DM+Sans': [400, 500, 600, 700]
    }
  },

  devtools: { enabled: true },
  typescript: { strict: true },

  auth: {
    isEnabled: true,
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: 'authjs'
    },
    globalAppMiddleware: true
  },

  nitro: {
    moduleSideEffects: ['punycode']
  },

  experimental: {
    watcher: 'parcel'
  },

  vite: {
    optimizeDeps: {
      include: ['punycode']
    }
  },

  compatibilityDate: '2024-12-22'
})