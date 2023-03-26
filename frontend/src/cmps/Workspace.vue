<template>
  <section class="workspace" :class="{ 'is-open': isWorkspaceOpen }">
    <button
      v-tippy="{
        content: isWorkspaceOpen ? 'Close navigation' : 'Open navigation',
        theme: 'classic',
        placement: 'right',
        arrow: true,
      }"
      class="workspace-open-btn"
      @click="openWorkspace"
    >
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
        <span class="main-workspace">Main workspace</span>
        <span
          v-html="getSvg('workspaceArrow')"
          class="arrowDown-workspace"
        ></span>
        <span v-html="getSvg('dots')"></span>
      </div>
      <section class="flex column workspace-container">
        <div
          class="workspace-add flex align-center pointer"
          @click="addBoard(newBoard)"
        >
          <span v-html="getSvg('plus')" class="workspace-icon"></span>
          <span class="add">Add</span>
        </div>
        <div class="workspace-filter flex align-center pointer">
          <span v-html="getSvg('filter')" class="workspace-icon"></span>
          <span>Filters</span>
        </div>
        <div class="workspace-search flex align-center pointer">
          <span v-html="getSvg('searchGray')" class="workspace-icon"></span>
          <input
            type="text"
            placeholder="Search"
            class="workspace-input"
            v-model="searchTerm"
          />
        </div>
        <br />
        <div class="workspace-line"></div>
        <div
          v-for="(board, idx) in filteredBoards"
          :key="idx"
          @click="moveToBoard(board, idx)"
          :class="{ 'selected-board': currBoard._id === board._id }"
          class="flex align-center workspace-boards pointer"
        >
          <BoardTitlePreview :board="board" @removeBoard="removeBoard" />
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { takeWhile } from 'lodash'
import { svgService } from '../services/svg.service.js'
import { boardService } from '../services/board.service.local.js'
import BoardTitlePreview from '../cmps/BoardTitlePreview.vue'
export default {
  props:{
    boards:Array
  },
  data() {
    return {
      isWorkspaceOpen: false,
      newBoard: boardService.getEmptyBoard(),
      searchTerm: '',
      selectedBoard: 0,
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    openWorkspace() {
      this.isWorkspaceOpen = !this.isWorkspaceOpen
    },
    addBoard(board) {
      this.$store.dispatch({ type: 'addBoard', board })
    },
    removeBoard(boardId) {
      this.$store.dispatch({ type: 'removeBoard', boardId })
    },
    moveToBoard(board, idx) {
      this.$store.commit({ type: 'setCurrBoard', board })
      this.$router.push(`/board/${board._id}`)
      this.selectedBoard = idx
    },
  },
  computed: {
    // boards() {
    //   return this.$store.getters.boards
    // },
    filteredBoards() {
      const regex = new RegExp(this.searchTerm, 'i')
      return this.boards.filter((board) => regex.test(board.title))
    },
    currBoard() {
      return this.$store.getters.currBoard
    },
  },
  components: {
    BoardTitlePreview,
  },
  mounted() {
    const {boardId} = this.$route.params
    console.log('boardId',boardId)
    console.log('this.boards',this.boards)
    this.selectedBoard = this.boards.findIndex(b=>b._id === boardId)
    console.log('this.selectedBoard',this.selectedBoard)
  }
}
</script>
