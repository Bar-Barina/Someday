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
        <div class="workspace-add flex align-center pointer" @click="addBoard">
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
        <div
          @click="isAI = true"
          class="workspace-search flex align-center pointer open-ai"
        >
          <span v-html="getSvg('OpenAI')" class="workspace-icon"></span>
          <span>Open AI</span>
          <span v-if="isAI" @click.stop="isAI = false" class="close" v-icon="'x'"></span>
          <span class="top"></span>
          <span class="right"></span>
          <span class="bottom"></span>
          <span class="left"></span>
        </div>
        <br />
        <div class="workspace-line"></div>
        <Container
          v-if="!isAI"
          class="vertical workspace-container"
          orientation="vertical"
          group-name="boards"
          tag="div"
          @drop="onBoardDrop($event)"
        >
          <Draggable
            v-for="(board, idx) in filteredBoards"
            :key="idx"
            @click="moveToBoard(board, idx)"
            class="flex align-center workspace-boards pointer"
            :class="{ 'selected-board': currBoard._id === board._id }"
          >
            <BoardTitlePreview :board="board" @removeBoard="removeBoard" />
          </Draggable>
        </Container>
        <OpenAI v-if="isAI" @AIboard="addAIboard" @closeAI="isAI = false"/>
      </section>
    </section>
  </section>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import { takeWhile } from "lodash";
import { svgService } from "../services/svg.service.js";
import { boardService } from "../services/board.service.js";
import BoardTitlePreview from "../cmps/BoardTitlePreview.vue";
import { utilService } from "../services/util.service.js";
import OpenAI from "./OpenAI.vue";
import {
  eventBus,
  showSuccessMsg,
  showErrorMsg,
} from "../services/event-bus.service";
export default {
  
  props: {
    boards: Array,
  },
  created() {},
  data() {
    return {
      isWorkspaceOpen: false,
      searchTerm: "",
      selectedBoard: null,
      isAI: false,
    };
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    openWorkspace() {
      this.isWorkspaceOpen = !this.isWorkspaceOpen;
    },
    addBoard() {
      const newBoard = boardService.getEmptyBoard();
      this.$store.dispatch({ type: "addBoard", board: newBoard });
        const msg = 'New board added';
        showSuccessMsg(msg);
    },
    removeBoard(boardId) {
      this.$store.dispatch({ type: "removeBoard", boardId });
      const msg = 'Board removed';
        showSuccessMsg(msg);
    },
    moveToBoard(board, idx) {
      this.$store.commit({ type: "setCurrBoard", board });
      this.$router.push(`/board/${board._id}`);
      this.selectedBoard = idx;
    },
    onBoardDrop(dropResult) {
      let boards = JSON.parse(JSON.stringify(this.currBoards));
      boards = utilService.applyDrag(boards, dropResult);
      this.currBoards = boards;
    },
    addAIboard(board) {
      const boards = this.filteredBoards;
      console.log("boards", boards);
      const boardIdx = boards.findIndex((b) => b._id === board._id);
      this.moveToBoard(board, boardIdx);
    },
  },
  computed: {
    // boards() {
    //   return this.$store.getters.boards
    // },
    filteredBoards() {
      const regex = new RegExp(this.searchTerm, "i");
      return this.boards.filter((board) => regex.test(board.title));
    },
    currBoard() {
      return this.$store.getters.currBoard;
    },
  },
  components: {
    BoardTitlePreview,
    Container,
    Draggable,
    OpenAI,
  },
  mounted() {
    setTimeout(() => {
      const { boardId } = this.$route.params;
      this.selectedBoard = this.boards.findIndex((b) => b._id === boardId);
    }, 0);
  },
};
</script>
