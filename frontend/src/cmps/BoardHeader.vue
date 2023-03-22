<template>
  <section class="board-header">
    <section class="board-name">
    <div class="title editable-div" contenteditable="true">
      Board header
    </div>
    <div class="icon">
  <div className="icon" v-html="getSvg('descrip')"></div>
    </div>
    <div class="icon">
  <div className="icon" v-html="getSvg('descrip')"></div>
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
