<template lang="pug">
  section#main-page
    LeadingAnimation
    AboutUs
    Teaching
</template>

<script>
import LeadingAnimation from '@/components/LeadingAnimation'
import AboutUs from '@/components/AboutUs'
import Teaching from '@/components/Teaching'

export default {
  name: 'Index',
  components: {
    LeadingAnimation,
    AboutUs,
    Teaching
  },

  mounted() {
    gsap.registerPlugin(ScrollTrigger)
  }
}
</script>

<style lang="stylus" scoped>

</style>
