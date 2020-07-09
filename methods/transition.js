export function emptyFunction() {
  let animation = {
    beforeEnter: (el) => {

    },
    enter: (el) => {

    },
    afterEnter: (el) => {

    },
    beforeLeave: (el) => {

    },
    leave: (el) => {

    },
    afterLeave: (el) => {

    }
  }

  return animation
}

export function defaultAnimation() {
  let animation = {
    beforeEnter: (el) => {
      if (!el.dataset) el.dataset = {};

      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;

      el.style.height = '0';
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    },
    enter: (el) => {
      el.dataset.oldOverflow = el.style.overflow;
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      } else {
        el.style.height = '';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      }

      el.style.overflow = 'hidden';
    },
    afterEnter: (el) => {
      // for safari: remove class then reset height is necessary
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
    },
    beforeLeave: (el) => {
      if (!el.dataset) el.dataset = {};
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;

      el.style.height = el.scrollHeight + 'px';
      el.style.overflow = 'hidden';
    },
    leave: (el) => {
      if (el.scrollHeight !== 0) {
        // for safari: add class after set height, or it will jump to zero height suddenly, weired
        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      }
    },
    afterLeave: (el) => {
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }
  }

  return animation
}

export function fadeIn() {
  let animation = {
    beforeEnter: (el) => {
      el.style.opacity = 0
      el.style.position = 'absolute'
    },
    enter: (el) => {
      el.style.opacity = 1
      el.style.transition = 'opacity .3s'
      el.style.position = 'relative'
    },
    afterEnter: (el) => {
      el.style.opacity = 1
    },
    beforeLeave: (el) => {
      el.style.opacity = 1
      el.style.position = 'absolute'
    },
    leave: (el) => {
      el.style.opacity = 0
      el.style.transition = 'opacity .3s'
    },
    afterLeave: (el) => {
      el.style.opacity = 0
      el.style.position = 'relative'
    }
  }

  return animation
}
