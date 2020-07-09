<template lang="pug">
  #AboutUs
    .bg-mask
    .content.flex.center-center
      //-
      .img-diver(@mouseenter="hoverDiver(true)" @mouseleave="hoverDiver(false)")
        img(:class="!isHoverDiver && 'active'" :src="diver_black")
        img(:class="isHoverDiver && 'active'" :src="diver_colorful")
      
      //- 
      .wording
        h1 {{ title }}
        h4 {{ subTitle }}
        p(v-for="p of paragraph") {{ p }}

</template>

<script>
import diver_black from '@/assets/img/diver_black.webp'
import diver_colorful from '@/assets/img/diver_colorful.webp'
import teachingVideo from '@/assets/video/teaching.mp4'

export default {
  name: 'AboutUs',
  data() {
    return {
      teachingVideo,
      diver_black,
      diver_colorful,
      isHoverDiver: false,

      title: '關於四分之一潛水',
      subTitle: 'About Quarter Diving',
      paragraph: [
        '三個潛水教練與一個設計師開始所組成的小團隊',
        '我們各自擁有不同的經驗和歷程，卻在相同的興趣裡遇到彼此',
        '慢慢地演變成現在成為PADI五星IDC教練發展中心',
        '​擁有超過八位的教練通力合作',
        '\n',
        '四分之一，代表我們都是團隊的一份子',
        '四分之一，當然也代表我們最愛的季節-夏天',
        '\n',
        '在這裡不用擔心遇到嚴肅的教練，我們把學生當成自己最好的朋友一般',
        '學習，就要在自願且開心的情況下進步，不是嗎?'
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
      gsap.fromTo('.img-diver', {
        x: -400
      }, {
        scrollTrigger: {
          trigger: '.img-diver',
          start: 'center bottom',
          end: 'top center',
          scrub: true
        },
        x: 0,
        rotation: 360
      })
    },

    wordingAnimation() {
      gsap.fromTo('.wording', {
        opacity: 0.3
      }, {
        scrollTrigger: {
          trigger: '.wording',
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

  #AboutUs
    position relative
    width 100vw
    height 100vh
    .content
      position relative
      z-index 5
      height 100%

      .img-diver
        width 50%
        max-width 500px
        > img
          display none
          width 100%
          &.active
            display block
      
      .wording
        opacity 0
        color white
        h1, h4, p
          margin 0
          white-space pre
        h1
          font-size 2.2rem
        h4
          margin 1rem 0

</style>