// Site statique déployé sur GitHub Pages (voir .github/workflows/deploy-pages.yml).
// Le workflow fournit NUXT_APP_BASE_URL = '/<nom-du-depot>/' ; en local : '/'.
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      // Adresse du service de formulaires (ex. https://formspree.io/f/xxxxxxx),
      // fournie au build par NUXT_PUBLIC_DEVIS_ENDPOINT (voir .env.example).
      devisEndpoint: ''
    }
  },
  app: {
    baseURL,
    head: {
      title: "ADV Service CIV — L'exigence du sur-mesure",
      htmlAttrs: { lang: 'fr' },
      script: [
        {
          // Active le masquage des éléments v-reveal avant le premier affichage
          // (plugins/reveal.js). Filet de sécurité : si le plugin ne démarre pas
          // sous 4 s, tout redevient visible.
          innerHTML:
            "if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){var d=document.documentElement;d.classList.add('reveal-ready');setTimeout(function(){if(!window.__revealStarted)d.classList.remove('reveal-ready')},4000)}",
          tagPosition: 'head'
        }
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            "Atelier de menuiserie sur mesure à Abidjan (Port-Bouet, Gonzagueville). Cuisines, dressings, bureaux, portes PVC et décoration intérieure. L'exigence du sur-mesure : design, qualité, durabilité."
        }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap'
        }
      ]
    }
  }
})
