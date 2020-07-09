<template lang="pug">
  #Teaching
    .bg-mask
    BackgroundVideo(:src="teachingVideo" type="video/mp4" autoplay muted)

    .content.flex.center-center
      .img-scuba-diver(@mouseenter="hoverDiver(true)" @mouseleave="hoverDiver(false)")
        img(:class="!isHoverDiver && 'active'" :src="diver_scuba")
        img(:class="isHoverDiver && 'active'" :src="diver_scuba_light")

      .wording.teaching-wording
        h1 {{ title }}
        h4 {{ subTitle }}
        p(v-for="p of paragraph") {{ p }}
</template>

<script>
import diver_scuba from '@/assets/img/diver_scuba.webp'
import diver_scuba_light from '@/assets/img/diver_scuba_light.webp'
import teachingVideo from '@/assets/video/teaching.mp4'

export default {
  name: 'Teaching',
  data() {
    return {
      teachingVideo,
      diver_scuba,
      diver_scuba_light,

      isHoverDiver: false,
      loopDiverAnimation: null,

      title: '課程教學',
      subTitle: 'Scuba diving course',
      paragraph: [
        '全球至今已經有數百萬人取得開放水域初級潛水員以上的潛水執照，並藉此踏入內太空的',
        '奇幻世界。你，還在等甚麼呢?',
        '我們提供完整的教學規劃以及彈性的教學時間，配合小班教學，一定讓你能輕鬆的翱翔在',
        '內太空....'
      ]
    }
  },

  mounted() {
    this.diverAnimation()
    this.wordingAnimation()
  },
  methods: {
    hoverDiver(boolean) {
      this.isHoverDiver = boolean
    },

    diverAnimation() {
      gsap.fromTo('.img-scuba-diver', {
        rotation: 20
      }, {
        scrollTrigger: {
          trigger: '.img-scuba-diver',
          toggleActions: "restart none none none"
        },
        rotation: 50,
        duration: .5,
        repeat: 3,
        onStart: () => clearTimeout(this.loopDiverAnimation),
        onComplete: () => this.loopDiverAnimation = setTimeout(() => this.diverAnimation(), 2000),
        runBackwards: true,
        yoyo: true,
        yoyoEase: true
      })
    },

    wordingAnimation() {
      gsap.fromTo('.teaching-wording', {
        opacity: 0.3
      }, {
        scrollTrigger: {
          trigger: '.teaching-wording',
          start: 'center bottom',
          end: 'top center',
          toggleActions: "restart none none none"
        },
        opacity: 1,
        duration: 2
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

  #Teaching
    position relative
    width 100vw
    height 100vh

    .content
      position relative
      z-index 5
      height 100%
      flex-direction row-reverse

      .img-scuba-diver
        width 50%
        max-width 300px
        > img
          display none
          width 100%
          &.active
            display block

      .wording
        color white
        margin-right 3rem
        h1, h4, p
          margin 0
          white-space pre
        h1
          font-size 2.2rem
        h4
          margin 1rem 0

</style>