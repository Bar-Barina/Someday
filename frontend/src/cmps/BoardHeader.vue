<template>
  <section class="board-header">
    <section class="up-header flex align-center space-between">

    <section class="board-name flex align-center justify-center">
    <h1 class="title editable-div" contenteditable="true">
      Board header
    </h1>
    <div class="icon btn-hover">
  <div className="icon" v-html="getSvg('descrip')"></div>
    </div>
    <div class="icon btn-hover">
  <div className="icon" v-html="getSvg('headerStar')"></div>
    </div>
    </section>
    <section class="right-up-header flex align-center justify-center">

    <div class="logged-in-user flex align-center btn-hover">
      Activity
      <img src="../assets/img/profile-icon.png" alt="">
    </div>

    <div class="invite flex align-center btn-hover">
      <div class="icon">
      <span v-html="getSvg('invitePeople')"></span>
      </div>
      Invite / 1
    </div>

    <div class="dots flex align-center justify-center icon btn-hover">
      <div v-html="getSvg('headerDots')"></div>
    </div>
    </section>
    </section>
    <div contenteditable="true" class="description editable-div">
      Add your board's description here 
    </div>
    <section class="board-view-change">
      <div class="view-option-container">
        <div class="view-option">
          
        </div>
      </div>
      <div class="view-option-container">
        <div class="view-option">
          
        </div>
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
