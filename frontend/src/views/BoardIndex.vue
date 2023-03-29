<template>
  <section class="main-layout board-index">
    <SideNav />
    <Workspace :boards="boards" />
    <section :class="mainClass">
      <BoardHeader/>
    <RouterView />
    </section>
    </section>

</template>

<script>
import { socketService } from '../services/socket.service';
import BoardHeader from '../cmps/BoardHeader.vue'
import SideNav from '../cmps/SideNav.vue'
import Workspace from '../cmps/Workspace.vue'
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { boardService } from '../services/board.service.local'
import {
  getActionRemoveBoard,
  getActionUpdateBoard,
  getActionAddBoardMsg,
} from '../store/board.store'
export default {
  data() {
    return {
      boardToAdd: boardService.getEmptyBoard(),
      mainClass: 'main-content-table',
    }
  },
  created() {
    this.$store.dispatch('loadBoards')
    socketService.on('update-board' , this.updateBoard)
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
    boards() {
      return this.$store.getters.boards
    },
    isBlackScreen() {
      return this.$store.getters.isBlackScreen
    },
    currBoard() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard))
    }
  },
  methods: {
    async addBoard() {
      try {
        await this.$store.dispatch({
          type: 'addBoard',
          board: this.boardToAdd,
        })
        showSuccessMsg('Board added')
        this.boardToAdd = boardService.getEmptyBoard()
      } catch (err) {
        showErrorMsg('Cannot add board')
      }
    },
    async removeBoard(boardId) {
      try {
        await this.$store.dispatch(getActionRemoveBoard(boardId))
        showSuccessMsg('Board removed')
      } catch (err) {
        showErrorMsg('Cannot remove board')
      }
    },
    async updateBoard(board) {
      try {
        board = { ...board }
        board.price = +prompt('New price?', board.price)
        await this.$store.dispatch(getActionUpdateBoard(board))
        showSuccessMsg('Board updated')
      } catch (err) {
        showErrorMsg('Cannot update board')
      }
    },
    async addBoardMsg(boardId) {
      try {
        await this.$store.dispatch(getActionAddBoardMsg(boardId))
        showSuccessMsg('Board msg added')
      } catch (err) {
        showErrorMsg('Cannot add board msg')
      }
    },
    updateBoard(groups) {
      console.log('groups', groups)
      const board = this.currBoard
      board.groups = groups
      this.$store.commit({type:'setCurrBoard' , board})
    }
  },
  watch: {
    "$route.params": {
      async handler() {
        const routeName  = this.$route.name
        if(routeName === 'table') this.mainClass = 'main-content-table'
        else this.mainClass = 'main-content-kanban'
      },
      immediate: true,
    },
  },
  destroyed() {
    socketService.off('update-board')
  },
  components: {
    SideNav,
    Workspace,
    BoardHeader,
  },
}
</script>
