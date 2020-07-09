<template lang="pug">
  .BackgroundVideo
    video.video(:autoplay="autoplay" :loop="loop" height="100%" :muted="muted")
      source(:src="src" :type="type")
</template>

<script>
export default {
  name: "BackgroundVideo",
  props: {
    src: String,
    type: String,
    loop: Boolean,
    autoplay: Boolean,
    muted: Boolean
  }
}
</script>

<style lang="stylus" scoped>

  .BackgroundVideo
    position absolute
    top 0
    left 0 
    z-index 3
    width 100vw
    height 100vh
    text-align center

</style>