<template>
  <section class="board-header">
    <section class="up-header flex align-center space-between">

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
    <section class="flex align-center justify-center">

    <div class="logged-in-user flex align-center">
      Activity
      <img src="../assets/img/profile-icon.png" alt="">
    </div>

    <div class="invite flex align-center">
      <div class="icon">
      <span v-html="getSvg('invitePeople')"></span>
      </div>
      Invite / 1
    </div>
    </section>
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
