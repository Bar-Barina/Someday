import { boardService } from '../services/board.service.local'
// import { boardService } from '../services/board.service'

export function getActionRemoveBoard(boardId) {
  return {
    type: 'removeBoard',
    boardId,
  }
}
export function getActionAddBoard(board) {
  return {
    type: 'addBoard',
    board,
  }
}
export function getActionUpdateBoard(board) {
  return {
    type: 'updateBoard',
    board,
  }
}
export function getActionAddBoardMsg(boardId) {
  return {
    type: 'addBoardMsg',
    boardId,
    txt: 'Stam txt',
  }
}

export const boardStore = {
  state: {
    boards: [],
    currBoard: null,
    currGroup: null,
    filterBy: {
      activeFilters: [],
      txt: '',
      member :null
    },
    isBlackScreen:false,
    statuses: ['Working on it' , 'Stuck' , 'Done' , 'Blank'],
    filteredLabels: [
      "Date",
      "Text",
      "Priority",
      "Person",
      "Files",
      "Status",
      "Timeline",
    ],
  },
  getters: {
    boards({ boards }) {
      return boards
    },
    currBoard({ currBoard, filterBy }) {
      if (filterBy.txt || filterBy.activeFilters.length > 0 || filterBy.member) {
        const boardToFilter = JSON.parse(JSON.stringify(currBoard))
        const filteredBoard = boardService.filterBoard(boardToFilter, filterBy)
        return filteredBoard
      } else {
        return currBoard
      }
    },
    currGroup({ currGroup }) {
      return currGroup
    },
    currActiveFilters({ filterBy }) {
      return filterBy.activeFilters
    },
    isBlackScreen({isBlackScreen}) {
      return isBlackScreen
    },
    kanbanStatuses({statuses}) {
      return statuses
    },
    currLabelsOrder({filteredLabels}) {
      return filteredLabels
    },
    currActiveMember({filterBy}) {
      return filterBy.member
    },
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards
    },
    setCurrBoard(state, { board }) {
      state.currBoard = board
    },
    addBoard(state, { board }) {
      state.boards.push(board)
    },
    updateBoard(state, { board }) {
      const idx = state.boards.findIndex((c) => c._id === board._id)
      state.boards.splice(idx, 1, board)
      state.currBoard = board
    },
    removeBoard(state, { boardId }) {
      state.boards = state.boards.filter((board) => board._id !== boardId)
    },
    addBoardMsg(state, { boardId, msg }) {
      const board = state.boards.find((board) => board._id === boardId)
      if (!board.msgs) board.msgs = []
      board.msgs.push(msg)
    },
    setCurrGroup(state, { group }) {
      state.currGroup = group
    },
    setCurrLabels(state, { labelsOrder }) {
      state.filteredLabels = labelsOrder
    },
    setStatuses(state, { statuses }) {
      state.statuses = statuses
    },
    updateActiveFilters(state, { label }) {
      // FOR LATER USE!!!
      // if(label === 'Empty status' || 'Empty priority') label = ''
      if (state.filterBy.activeFilters.includes(label)) {
        const labelIdx = state.filterBy.activeFilters.findIndex(
          (l) => l === label
        )
        state.filterBy.activeFilters.splice(labelIdx, 1)
      } else state.filterBy.activeFilters.push(label)
    },
    updateActiveMember(state ,{ member }) {
      if(!member) state.filterBy.member = ''
      state.filterBy.member = member
    },
    setFilterBy(state, { searchQuery }) {
      state.filterBy.txt = searchQuery
    },
    filterBoard({ board, filterBy }) {
      const filteredBoard = boardService.filterBoard(board, filterBy)
      return filteredBoard
    },
    toggleBlackScreen(state) {
      state.isBlackScreen = !state.isBlackScreen 
    },
    closeBlackScreen(state) {
      state.isBlackScreen = false
    },
    setBoardActivity(state , { activity }) {
      if(!state.currBoard.activities) state.currBoard.activities = []
      state.currBoard.activities.push(activity)
    }
  },
  actions: {
    async addBoard(context, { board }) {
      try {
        board = await boardService.save(board)
        context.commit(getActionAddBoard(board))
        return board
      } catch (err) {
        console.log('boardStore: Error in addBoard', err)
        throw err
      }
    },
    async getBoardById({ commit }, { boardId }) {
      const board = await boardService.getById(boardId)
      commit({ type: 'setCurrBoard', board })
      return board
    },
    async updateBoard(context, { board }) {
      try {
        board = await boardService.save(board)
        context.commit(getActionUpdateBoard(board))
        return board
      } catch (err) {
        console.log('boardStore: Error in updateBoard', err)
        throw err
      }
    },
    async loadBoards(context) {
      try {
        const boards = await boardService.query()
        context.commit({ type: 'setBoards', boards })
        context.commit({ type: 'setCurrBoard', board: boards[0] })
      } catch (err) {
        console.log('boardStore: Error in loadBoards', err)
        throw err
      }
    },
    async removeBoard(context, { boardId }) {
      try {
        await boardService.remove(boardId)
        context.commit(getActionRemoveBoard(boardId))
      } catch (err) {
        console.log('boardStore: Error in removeBoard', err)
        throw err
      }
    },
    async addBoardMsg(context, { boardId, txt }) {
      try {
        const msg = await boardService.addBoardMsg(boardId, txt)
        context.commit({ type: 'addBoardMsg', boardId, msg })
      } catch (err) {
        console.log('boardStore: Error in addBoardMsg', err)
        throw err
      }
    },
    async saveTask({ state, commit }, { toUpdate }) {
      console.log('toUpdate', toUpdate)
      const currBoard = state.currBoard
      if (!toUpdate.task) toUpdate.task = null
      try {
        const board = await boardService.saveTask(
          currBoard,
          toUpdate.group,
          toUpdate.task
        )
        commit({ type: 'updateBoard', board })
        commit({ type: 'setCurrGroup', group: toUpdate.group })
      } catch (err) {
        throw new Error(err)
      }
    },
    async remove({ state, commit }, { toRemove }) {
      const board = await boardService.removeItem(
        state.currBoard,
        toRemove.groupId,
        toRemove.taskId
      )
      commit({ type: 'updateBoard', board })
    },
  },
}
