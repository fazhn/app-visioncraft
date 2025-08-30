import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'marquee'
    }
  },

  modules: [
   '@nuxt/icon',
   '@nuxt/image',
   '@nuxt/ui',
   '@nuxt/fonts',
   '@nuxtjs/color-mode',
   '@vite-pwa/nuxt',
   '@clerk/nuxt'
  ],
  
  runtimeConfig: {
    public: {
      geminiApiKey: process.env.GEMINI_API_KEY
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'VisionCraft AI',
      short_name: 'VisionCraft',
      description: 'AI-powered image editor and generator with Gemini 2.5 Flash',
      theme_color: '#8B5CF6',
      icons: [
        {
          src: '/192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox:{
      navigateFallback: '/',
    },
    devOptions: {
      enabled: true,
      type: 'module',
    }

  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  ui: {
    colorMode: false
  }


})