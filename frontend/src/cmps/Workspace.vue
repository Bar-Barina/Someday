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
        <Container
        class="vertical workspace-container"
        orientation="vertical"
        group-name="boards"
        tag="div"
        @drop="onBoardDrop($event)">
            <Draggable v-for="(board, idx) in filteredBoards"
            :key="idx"
            @click="moveToBoard(board, idx)"
            :class="{ 'selected-board': currBoard._id === board._id }"
            class="flex align-center workspace-boards pointer">
              <BoardTitlePreview :board="board" @removeBoard="removeBoard" />
            </Draggable>
        </Container>
      </section>
    </section>
  </section>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import { takeWhile } from "lodash";
import { svgService } from "../services/svg.service.js";
import { boardService } from "../services/board.service.local.js";
import BoardTitlePreview from "../cmps/BoardTitlePreview.vue";
import { utilService } from '../services/util.service.js';
export default {
  props: {
    boards: Array,
  },
  created() {
    this.currBoards = this.boards
  },
  data() {
    return {
      isWorkspaceOpen: false,
      newBoard: boardService.getEmptyBoard(),
      searchTerm: "",
      selectedBoard: null,
      currBoards: null,
    };
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    openWorkspace() {
      this.isWorkspaceOpen = !this.isWorkspaceOpen;
    },
    addBoard(board) {
      this.$store.dispatch({ type: "addBoard", board });
    },
    removeBoard(boardId) {
      this.$store.dispatch({ type: "removeBoard", boardId });
    },
    moveToBoard(board, idx) {
      this.$store.commit({ type: "setCurrBoard", board });
      this.$router.push(`/board/${board._id}`);
      this.selectedBoard = idx;
    },
    onBoardDrop(dropResult) {
      let boards = JSON.parse(JSON.stringify(this.currBoards))
      boards = utilService.applyDrag(boards, dropResult)
      this.currBoards = boards
    },
  },
  computed: {
    // boards() {
    //   return this.$store.getters.boards
    // },
    filteredBoards() {
      const regex = new RegExp(this.searchTerm, "i");
      return this.currBoards.filter((board) => regex.test(board.title));
    },
    currBoard() {
      return this.$store.getters.currBoard;
    },
  },
  components: {
    BoardTitlePreview,
    Container,
    Draggable,
  },
  mounted() {
    setTimeout(() => {
      const { boardId } = this.$route.params;
      // console.log('boardId',boardId)
      // console.log('this.boards',this.boards)
      this.selectedBoard = this.boards.findIndex((b) => b._id === boardId);
      // console.log('this.selectedBoard',this.selectedBoard)
    }, 0);
  },
};
</script>
