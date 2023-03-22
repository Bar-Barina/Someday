<template>
  <section class="workspace" :class="{ 'is-open': isWorkspaceOpen }">
    <button class="workspace-open-btn" @click="openWorkspace">
      <span
        v-html="getSvg('arrowLeft')"
        class="workspace-icon arrowLeft"
      ></span>
    </button>
    <section v-if="isWorkspaceOpen">

    <div class="workspace-title flex space-between">
      <span>Workspace</span>
      <span v-html="getSvg('Dots')"></span>
    </div>
    <div class="workspace-header flex align-center">
      <p class="pink-div flex">
        <span class="Main-letter">M</span>
        <span class="home-svg" v-html="getSvg('home')"></span>
      </p>
      <h1>Main workspace</h1>
      <span v-html="getSvg('arrowDownReg')"></span>
      <span v-html="getSvg('dots')"></span>
    </div>
    <section class="flex column workspace-container">
      <div class="workspace-add flex align-center">
        <span v-html="getSvg('plus')" class="workspace-icon"></span>
        <span class="add">Add</span>
      </div>
      <div class="workspace-filter flex align-center">
        <span v-html="getSvg('filter')" class="workspace-icon"></span>
        <span>Filter</span>
      </div>
      <div class="workspace-search flex align-center">
        <span v-html="getSvg('searchGray')" class="workspace-icon"></span>
        <span>Search</span>
      </div>
      <br />
      <div class="workspace-line"></div>
      <div
        v-for="(board, idx) in boards"
        :key="idx"
        class="flex align-center workspace-boards"
      >
        <span v-html="getSvg('board')" class="workspace-icon"></span>
        <span>{{ board.title }}</span>
      </div>
    </section>
  </section>
  </section>
</template>

<script>
import { takeWhile } from 'lodash'
import { svgService } from '../services/svg.service.js'
export default {
  data() {
    return {
      isWorkspaceOpen: false,
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    openWorkspace() {
      this.isWorkspaceOpen = !this.isWorkspaceOpen
    },
  },
  computed: {
    boards() {
      return this.$store.getters.boards
    },
  },
}
</script>
