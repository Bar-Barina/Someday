<template>
  <section class="board-header">
    <section class="board-name flex align-center justify-center">
    <h1 class="title editable-div" contenteditable="true">
      Board header
    </h1>
    <div class="icon">
  <div className="icon" v-html="getSvg('descrip')"></div>
    </div>
    <div class="icon">
  <div className="icon" v-html="getSvg('headerStar')"></div>
    </div>
    </section>
  </section>
</template>

<script>
import {svgService} from '../services/svg.service.js'
export default {
  name: 'BoardHeader', 
  props: [],
components:{},
created() {},
  data() {
    return {}
  },
  methods: {
    getSvg(iconName) {
    return svgService.getSvg(iconName)
  }
  },
  computed: {},
}

</script>
