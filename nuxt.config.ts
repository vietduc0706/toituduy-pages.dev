// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
      head: {
        charset: "utf-8",
        viewport: "width=device-width,initial-scale=1",
        title: "Home",
        titleTemplate: "%s - News",
        meta: [{ name: "description", content: "News" }],
      },
    },
    modules: ["@nuxtjs/tailwindcss"],
    runtimeConfig: {
      public: {
        WP_URL: 'https://wp.hauca.win',
      },
    },
  });
  