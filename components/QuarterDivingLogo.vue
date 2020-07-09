<template lang="pug">
  .qLogo
</template>

<script>
export default {
  name: "QuarterDivingLogo",
  props: {
    mode: {
      type: String,
      default: 'white'
    }
  },

  mounted() {
    this.createQuarterDivingLogo()
  },
  methods: {
    /**
    * Create Quarter Diving Logo
    */
    createQuarterDivingLogo() {
      const svg = this.createSvg('.qLogo', 'svg')
        .attr('width', 200)
        .attr('height', 138)
      const squareRootOf3 = 1.73205
      const [cx, cy] = [75, 75]
      const l = 25
      const d = 1000
      const fish = this.createSvg('.qLogo svg', 'g')
        .attr('class', 'fish')
      // 中心往右上
      this.drawLine(fish, { x1: cx, y1: cy }, { x2: cx + l, y2: cy - l }, { d: d })
      // 中心往右下
      this.drawLine(fish, { x1: cx, y1: cy }, { x2: cx + l + l / 2, y2: cy + l + l / 2 }, { d: d * 1.5 })
      // 中心往左上
      this.drawLine(fish, { x1: cx, y1: cy }, { x2: cx - l, y2: cy - l }, { d: d * 1.5 })
      // 中心往左下
      this.drawLine(fish, { x1: cx, y1: cy }, { x2: cx - l, y2: cy + l }, { d: d })
      // 左方往下補滿
      this.drawLine(fish, { x1: cx - l, y1: cy - l }, { x2: cx - l, y2: cy + l }, { d: d * 2 })
      // 中心往上下補腩
      this.drawLine(fish, { x1: cx, y1: cy }, { x2: cx, y2: cy + l * 2 }, { d: d * 2 })
      this.drawLine(fish, { x1: cx, y1: cy }, { x2: cx, y2: cy - l * 2 }, { d: d * 2 })
      // 上往右方補滿
      this.drawLine(fish, { x1: cx, y1: cy - l * 2 }, { x2: cx + l * 2 + l / 2, y2: cy + l / 2 }, { d: d * 2.5 })
      // 下往右方補滿
      this.drawLine(fish, { x1: cx, y1: cy + l * 2 }, { x2: cx + l * 2, y2: cy }, { d: d * 2 })
      // 中右方往上補滿
      this.drawLine(fish, { x1: cx + l, y1: cy + l }, { x2: cx + l, y2: cy - l }, { d: d * 2.5 })

      // 頭 (顏色區塊)
      let gap = 1.8
      this.drawPolygon(fish, `${cx + l + gap},${cy - l + gap * 2.5} ${cx + l * 2 - gap * 1.4},${cy} ${cx + l + gap},${cy + l - gap * 2.5}`, { d: d * 3, fill: 'rgba(116, 188, 213, 1.00)' })
      // 眼睛
      this.drawCircle(fish, { cx: cx + l * 2 - 14, cy: cy - 5, r: 1.5 }, { fill: this.mode, stroke: this.mode })

      const bubble = this.createSvg('.qLogo svg', 'g')
      // 氣泡
      this.drawCircle(bubble, { cx: cx + l * 2.5, cy: cy - l, r: 2.5 }, { d: d * .3, delay: d * 2, fill: 'transparent', stroke: this.mode })
      this.drawCircle(bubble, { cx: cx + l * 2.5 - gap * 4.7, cy: cy - l - gap * 6.2, r: 3.5 }, { d: d * .3, delay: d * 2.2, fill: 'transparent', stroke: this.mode })
      this.drawCircle(bubble, { cx: cx + l * 2.5 - gap * 8.3, cy: cy - l - gap * 14, r: 5 }, { d: d * .5, delay: d * 2.4, fill: 'transparent', stroke: this.mode })
      this.drawCircle(bubble, { cx: cx + l * 2.5 - gap * 10.4, cy: cy - l - gap * 24, r: 6 }, { d: d * .3, delay: d * 3, fill: 'transparent', stroke: this.mode })

    },

    /**
    * Create svg tag via d3.js
    */
    createSvg(target, tag) {
      return d3.select(target).append(tag)
    },

    /**
    * from: {x1,y1}
    * to: {x2,y2}
    * option: other setting
    */
    drawLine(svg, { x1, y1 }, { x2, y2 }, option) {
      let tempSvg = svg.append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x1)
        .attr('y2', y1)
        .style('stroke', this.mode)
        .style('stroke-width', 2.5)

      if (!option)
        tempSvg
          .attr('x2', x2)
          .attr('y2', y2)

      if (option)
        tempSvg
          .transition()
          .duration(option.d)
          .attr('x2', x2)
          .attr('y2', y2)
    },

    /**
    * cx, cy, r
    */
    drawCircle(svg, { cx, cy, r }, option) {
      let tempSvg = svg.append('circle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', 0)
        .style('fill', 'transparent')
        .style('stroke-width', 2)

      if (option)
        tempSvg
          .style('fill', option.fill)
          .style('stroke', option.stroke)
          .transition()
          .delay(option.delay || 0)
          .duration(option.d)
          .attr('r', r)
    },

    /**
    * point
    */
    drawPolygon(svg, point, option) {
      let tempSvg = svg.append('polygon')
        .attr('points', point)
        .style('opacity', 0)
        .style('fill', option.fill)


      if (option)
        tempSvg
          .transition()
          .duration(option.d)
          .style('opacity', 1)
    }
  }
}
</script>

<style lang="stylus" scoped>

  @keyframes bounce
    0%,
      transform translateY(0px) rotate(0deg)
    20%
      transform translateY(-20px) rotate(-10deg)
    30%
      transform translateY(-30px) rotate(-10deg)
    40%
      transform translateY(-10px) rotate(0deg)
    50%
      transform translateY(0px) rotate(15deg)
    60%
      transform translateY(-10px) rotate(15deg)
    80%
      transform translateY(0px) rotate(0deg)
    100%
      transform translateY(0px) rotate(0deg)

  .qLogo
    animation bounce .7s linear 3s

</style>
