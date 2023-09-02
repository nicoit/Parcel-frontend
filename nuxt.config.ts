// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
//  devtools: { enabled: true },
  app: {
    head: {
      link: [{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css' }]
    }
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ]
})
