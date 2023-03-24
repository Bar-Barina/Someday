<template>
  <section class="main-layout board-index">
    <SideNav />
    <Workspace />
    <BoardHeader />
    <RouterView />
  </section>
</template>

<script>

import BoardHeader from "../cmps/BoardHeader.vue";
import SideNav from "../cmps/SideNav.vue";
import Workspace from "../cmps/Workspace.vue";
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { boardService } from "../services/board.service.local";
import { getActionRemoveBoard,getActionUpdateBoard,getActionAddBoardMsg,} from "../store/board.store";
export default {
  data() {
    return {
      boardToAdd: boardService.getEmptyBoard(),
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    boards() {
      return this.$store.getters.boards;
    },
  },
  methods: {
    async addBoard() {
      try {
        await this.$store.dispatch({
          type: "addBoard",
          board: this.boardToAdd,
        });
        showSuccessMsg("Board added")
        this.boardToAdd = boardService.getEmptyBoard()
      } catch (err) {
        showErrorMsg("Cannot add board")
      }
    },
    async removeBoard(boardId) {
      try {
        await this.$store.dispatch(getActionRemoveBoard(boardId))
        showSuccessMsg("Board removed")
      } catch (err) {
        showErrorMsg("Cannot remove board")
      }
    },
    async updateBoard(board) {
      try {
        board = { ...board }
        board.price = +prompt("New price?", board.price)
        await this.$store.dispatch(getActionUpdateBoard(board))
        showSuccessMsg("Board updated")
      } catch (err) {
        showErrorMsg("Cannot update board")
      }
    },
    async addBoardMsg(boardId) {
      try {
        await this.$store.dispatch(getActionAddBoardMsg(boardId))
        showSuccessMsg("Board msg added")
      } catch (err) {
        showErrorMsg("Cannot add board msg")
      }
    },
    printBoardToConsole(board) {
      console.log("Board msgs:", board.msgs)
    },
  },
  components: {
    SideNav,
    Workspace,
    BoardHeader,
  }
}
</script>
