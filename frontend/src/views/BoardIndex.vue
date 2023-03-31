<template>
  <section class="main-layout board-index">
    <SideNav />
    <Workspace :boards="boards" />
    <section :class="mainClass">
      <BoardHeader />
      <RouterView />
    </section>
    <UserMsg />
  </section>
</template>

<script>
import { socketService } from "../services/socket.service";
import BoardHeader from "../cmps/BoardHeader.vue";
import SideNav from "../cmps/SideNav.vue";
import Workspace from "../cmps/Workspace.vue";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { boardService } from "../services/board.service.local";
import UserMsg from '../cmps/UserMsg.vue'
import {
  getActionRemoveBoard,
  getActionUpdateBoard,
  getActionAddBoardMsg,
} from "../store/board.store";
export default {
  data() {
    return {
      boardToAdd: boardService.getEmptyBoard(),
      mainClass: "main-content-table",
    };
  },
  created() {
    // this.$store.dispatch("loadBoards");
    socketService.on("update-board", this.updateBoard);
    socketService.on("update-boards", this.updateSocketBoards);
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    boards() {
      return this.$store.getters.boards;
    },
    isBlackScreen() {
      return this.$store.getters.isBlackScreen;
    },
    currBoard() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard));
    },
  },
  methods: {
    async addBoard() {
      try {
        await this.$store.dispatch({
          type: "addBoard",
          board: this.boardToAdd,
        });
        showSuccessMsg("Board added");
        this.boardToAdd = boardService.getEmptyBoard();
      } catch (err) {
        showErrorMsg("Cannot add board");
      }
    },
    async removeBoard(boardId) {
      try {
        await this.$store.dispatch(getActionRemoveBoard(boardId));
        showSuccessMsg("Board removed");
      } catch (err) {
        showErrorMsg("Cannot remove board");
      }
    },
    updateBoard(groups) {
      const board = this.currBoard;
      board.groups = groups;
      this.$store.commit({ type: "setCurrBoard", board });
    },
    updateSocketBoards({ boards, board }) {
      console.log("boards", boards);
      console.log("board", board);
      this.$store.commit({ type: "setBoards", boards });
      const currBoard = this.currBoard;
      console.log("currBoard", currBoard);
      if (currBoard._id === board._id)
        this.$store.commit({ type: "setCurrBoard", board });
    },
  },
  watch: {
    "$route.params": {
      async handler() {
        const routeName = this.$route.name;
        if (routeName === "table") this.mainClass = "main-content-table";
        else this.mainClass = "main-content-kanban";
      },
      immediate: true,
    },
  },
  destroyed() {
    socketService.off("update-board");
    socketService.off("update-boards");
    socketService.off("update-currBoard");
  },
  components: {
    SideNav,
    Workspace,
    BoardHeader,
    UserMsg
  },
};
</script>
