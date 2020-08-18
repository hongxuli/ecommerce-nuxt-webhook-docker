const pkg = require("./package");

module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000"
  },
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#FFFFFF" },

  /*
   ** Global CSS
   */
  css: [
    "element-ui/lib/theme-chalk/reset.css",
    "element-ui/lib/theme-chalk/index.css",
    "@/assets/css/main.css"
  ],

  /*
   ** Plugins to load before mounting the App
   */
  // plugins: ["@/plugins/element-ui", "@/plugins/axios"],
  plugins: ["@/plugins/element-ui"],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios",
    "@nuxtjs/dotenv"
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // baseURL: "http://localhost:3000"
    baseURL:
      process.env.NODE_ENV === "production"
        ? process.env.PROD_API
        : process.env.DEV_API
    // baseURL: process.env.PROD_API
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // analyze: true,
    babel: {
      plugins: [
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk"
          }
        ],
        "lodash"
      ]
    },

    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    },
    // https://github.com/nuxt/nuxt.js/issues/3804
    cache: false
  }
};
