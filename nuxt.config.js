
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: '四分之一潛水 - Quarter Diving',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@300&display=swap' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.4/gsap.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.1/ScrollTrigger.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/d3/5.15.1/d3.js' },
      { src: 'https://kit.fontawesome.com/7f26feae15.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    './stylus/public.styl',
    './stylus/initial.styl',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/components'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    stylus: [
      './stylus/mixin.styl',
      './stylus/setting.styl'
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
