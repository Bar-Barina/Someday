<template>
  <section class="board-desc-container"  >
    <section class="dialog-editable-wrapper">
      <h1 contenteditable="true" ref="boardTitle" @focusout="updateBoard">{{ currBoard.title }}</h1>
      <div contenteditable="true" ref="boardDesc" @focusout="updateBoard">
        {{currBoard.description}}
      </div>
      <span class="feedback">Give feedback</span>
    </section>
    <!-- INFO -->
    <section class="board-info">
      <span v-icon="'x'" class="x-btn-desc" @click="closeDesc"></span>
      <div class="board-info-title">Board info</div>
      <!-- WORKSPACE -->
      <div>
      <div class="info-title">Workspace</div>
      <div class="workspace-info-div flex align-center">
        <p class="pink-div flex">
          <span class="Main-letter">M</span>
          <span class="home-svg" v-html="getSvg('home')"></span>
        </p>
        <span class="info-subtitle">Main workspace</span>
      </div>
    </div>
      <!-- CREATED AT -->
      <div class="info-title">Created by</div>
      <div class="created-info-div flex align-center">
        <img :src="currBoard.members[1].url" />
        <span class="info-subtitle"> March 22,2023</span>
      </div>
       <!-- OWNERS -->
       <div class="info-title">Owners</div>
       <div class="owners-info-div flex align-center">
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
    },
    updateBoard() {
      const board = JSON.parse(JSON.stringify(this.currBoard))
      board.description = this.$refs.boardDesc.innerText
      board.title = this.$refs.boardTitle.innerText
      this.$store.dispatch({ type: 'updateBoard', board })
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
