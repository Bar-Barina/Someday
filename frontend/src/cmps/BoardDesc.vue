<template>
  <section class="board-desc-container" v-clickOutSide="closeDesc">
    <section class="dialog-editable-wrapper">
      <h1 contenteditable="true">{{ currBoard.title }}</h1>
      <div contenteditable="true">
        Add a description here to make sure your team is aligned on the purpose
        of this board
      </div>
      <span class="feedback">Give feedback</span>
    </section>
    <!-- INFO -->
    <section class="board-info">
      <span v-icon="'x'" class="x-btn-desc" @click="closeDesc"></span>
      <div class="board-info-title">Board info</div>
      <!-- WORKSPACE -->
      <div class="workspace-info-div">
          <div class="info-title">Workspace</div>
        <p class="pink-div flex">
          <span class="Main-letter">M</span>
          <span class="home-svg" v-html="getSvg('home')"></span>
          <span class="info-subtitle">Main workspace</span>
        </p>
      </div>
      <!-- CREATED AT -->
      <div class="created-info-div">
        <div class="info-title">Created by</div>
        <img :src="currBoard.members[1].url" />
        <span class="info-subtitle"> March 22,2023</span>
      </div>
       <!-- OWNERS -->
       <div class="owners-info-div">
        <div class="info-title">Owners</div>
        <img :src="currBoard.members[1].url" />
        <span class="info-subtitle"> {{currBoard.members[1].name}}</span>
      </div>
      <!-- BOARD TYPE -->
      <div class="type-info-div">
        <div class="info-title">Board type</div>
        <div class="board-type flex">
        <span v-html="getSvg('board')" class="workspace-icon"></span>
        <span>This board is public, visible to all
            <br>
             team members.</span>
     </div>
      </div>
    </section>
  </section>
</template>

<script>
import { svgService } from '../services/svg.service.js'
export default {
  name: '',
  data() {
    return {
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    closeDesc() {
      this.$emit('closeDesc')
      this.$store.commit({type:'closeBlackScreen'})
    }
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
  },
  created() {},
  components: {},
}
</script>
