<template lang="pug">
  section#main(:style="{ backgroundImage: bg }")
    .page
      nuxt
</template>

<script>
import fishStorm from '@/assets/img/fishstorm.webp'

export default {
  name: 'Default',
  data() {
    return {
      fishStorm
    }
  },
  computed: {
    bg() {
      return `url(${fishStorm})`
    }
  }
}
</script>

<style lang="stylus" scoped>

  #main
    width 100vw
    min-height 100vh
    background-size cover
    background-position 50% 50%
    background-attachment fixed

  .page
    position relative
    z-index 9

</style>
