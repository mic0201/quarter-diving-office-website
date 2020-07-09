<template lang="pug">
  section#LeadingAnimation.flex.center-center
    .bg-mask
    .content.flex.center-center
      QuarterDivingLogo.logo(v-if="logoIn")
      .name
        h1#writingDom(:class="typing && 'typing'") {{ websiteName }}
        h4#writingDomEn.en(:class="typingEn && 'typing'") {{ websiteNameEn }}

    .scrollDown.flex.align-flex-end
      i.icon.fas.fa-chevron-circle-down
</template>

<script>
import QuarterDivingLogo from './QuarterDivingLogo'

export default {
  name: 'LeadingAnimation',
  components: {
    QuarterDivingLogo
  },

  data() {
    return {
      logoIn: false,
      typing: false,
      typingEn: false,
      isLogoRender: false,
      websiteName: '四分之一潛水',
      websiteNameEn: 'Quarter Diving'
    }
  },

  mounted() {
    //- 打字效果
    // setTimeout(() => this.writing('#writingDom', 'typing', this.websiteName, 500), 1500)
    //- v-if 開關 Logo
    setTimeout(() => this.logoIn = true, 500)
    //- 網站名稱淡入
    setTimeout(() => gsap.fromTo('.name', { x: 0, y: 0, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 3 }), 4000)
    //- 打字效果
    // setTimeout(() => this.writing('#writingDomEn', 'typingEn', this.websiteNameEn, 200), 5000)
    //- Scroll Down Icon
    setTimeout(() => {
      gsap.fromTo('.scrollDown', { x: 0, y: 0, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1 })
      document.querySelector('.scrollDown').classList.add('animate')
    }, 6000)
  },
  methods: {
    writing(id, typing, word, ms) {
      const dom = document.querySelector(id)
      const data = word.split('')
      let index = 0
      writing.call(this, index)
      function writing(index) {
        this[typing] = index < data.length
        if (index < data.length) {
          dom.innerHTML += data[index]
          setTimeout(writing.bind(this), ms, ++index)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

  @keyframes blink
    from
        opacity .3
    to
        opacity 1

  h1, h4
    margin 0
    color white
  .en
    font-family Montserrat Alternates
  .typing
    &::after
      content: '|'
      animation blink 1s infinite
  .name
    opacity 0

  #LeadingAnimation
    position relative
    width 100vw
    height 100vh
    h1
      font-size 3rem
    h4
      letter-spacing .5rem
      text-align center
    
    .content
      position relative
      z-index 5

  .scrollDown
    cursor pointer
    opacity 0
    position absolute
    z-index 5
    bottom 1.5rem
    left 50%
    height 60px
    border 2px solid white
    border-radius 2rem
    background-color transparent
    transform translateX(50%)
    &.animate
      animation blink 1s infinite alternate
    &::before
      position absolute
      right -100%
      content: '向下滾動'
      writing-mode: vertical-lr
      letter-spacing 2px
      color white
      font-size .5rem
      white-space nowrap
    .icon
      font-size 1.5rem
      color white
      transform scale(1.2)

</style>
