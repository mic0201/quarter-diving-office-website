<template lang="pug">
  section
    transition(
      :name="name"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"

      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
    )
      slot
</template>

<script>
import * as transition from '@/methods/transition'

export default {
  name: "CustomTransition",
  props: {
    name: String,
    mode: String,
    debug: Boolean,
  },
  methods: {
    console(type, el) {
      console.log(type, el)
    },

    beforeEnter(el) {
      let mode = this.mode
      this.debug && this.console('beforeEnter', el)
      transition[mode] ? transition[mode]().beforeEnter(el) : transition['defaultAnimation']().beforeEnter(el)
    },

    enter(el) {
      let mode = this.mode
      this.debug && this.console('enter', el)
      transition[mode] ? transition[mode]().enter(el) : transition['defaultAnimation']().enter(el)
    },

    afterEnter(el) {
      let mode = this.mode
      this.debug && this.console('afterEnter', el)
      transition[mode] ? transition[mode]().afterEnter(el) : transition['defaultAnimation']().afterEnter(el)
    },

    beforeLeave(el) {
      let mode = this.mode
      this.debug && this.console('beforeLeave', el)
      transition[mode] ? transition[mode]().beforeLeave(el) : transition['defaultAnimation']().beforeLeave(el)
    },

    leave(el) {
      let mode = this.mode
      this.debug && this.console('leave', el)
      transition[mode] ? transition[mode]().leave(el) : transition['defaultAnimation']().leave(el)
    },

    afterLeave(el) {
      let mode = this.mode
      this.debug && this.console('afterLeave', el)
      transition[mode] ? transition[mode]().afterLeave(el) : transition['defaultAnimation']().afterLeave(el)
    },
  }
}
</script>
