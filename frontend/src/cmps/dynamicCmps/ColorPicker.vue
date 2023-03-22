<template>
  <section class="color-picker">
    <div
      v-for="(color, idx) in colors"
      :key="idx"
      class="color"
      @click="updateColor(color)"
      :style="{ backgroundColor: color }"
    ></div>
  </section>
</template>

<script>
export default {
  props: ['groupColor'],
  name: 'color-picker',
  data() {
    return {
      colors: [
        '#037f4c',
        '#00c875',
        '#9cd326',
        '#cab641',
        '#ffcb00',
        '#784bd1',
        '#a25ddc',
        '#0086c0',
        '#66ccff',
        '#bb3354',
        '#e2445c',
        '#ff158a',
        '#ff5ac4',
        '#ff642e',
        '#fdab3d',
        '#7f5347',
        '#c4c4c4',
        '#808080',
      ],
    }
  },
  methods: {
    updateColor(color) {
      console.log('color from colorPicker', color)
      this.$emit('updateColor', { toChange: 'color', data: color })
    },
  },
  computed: {},
  created() {},
  components: {},
}
</script>
