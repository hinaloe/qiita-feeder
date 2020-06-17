// const pkg = require('./package')

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Qiita Feeder',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Qiitaの新着投稿を眺めるためだけのWebサービス',
      },
      { hid: 'theme-color', name: 'theme-color', content: '#03a9f4' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#3B8070' },

  /*
   ** Global CSS
   */
  css: ['vuetify/src/stylus/main.styl'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vuetify'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: 'https://qiita.com',
    proxyHeaders: false,
    credentials: false,
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
      if (ctx.isServer) {
        const nodeExternals = require('webpack-node-externals')
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/],
          }),
        ]
      }
    },
    vendor: ['axios'],
    extractCSS: true,
  },
  render: {
    http2: { push: true },
  },
}
