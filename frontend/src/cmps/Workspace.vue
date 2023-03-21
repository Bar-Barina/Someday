<template>
  <section class="workspace">
    <div class="workspace-header">
    <p class="pink-div flex">
      <span class="Main-letter">M</span>
      <span class="home-svg" v-html="getSvg('home')"></span>
    </p>
    <h1>Main workspace</h1>
    <span v-html="getSvg('arrowDownReg')"></span>
    <span v-html="getSvg('dots')"></span>
  </div>
  <div class="workspace-input-btn flex">
    <!-- <span v-html="getSvg('searchGray')"></span> -->
    <input type="text" class="workspace-input" placeholder="Search">
      <button class="workspace-button">+</button>
    </div>
  </section>
</template>

<script>
import { svgService } from "../services/svg.service.js";
export default {
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
}
}
</script>

