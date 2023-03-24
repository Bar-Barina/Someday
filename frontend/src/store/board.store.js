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
        filterBy:{
            activeFilters:[],
        }
    },
    getters: {
        boards({ boards }) { return boards },
        currBoard({ currBoard }) { return currBoard },
        currGroup({ currGroup }) { return currGroup },
        currActiveFilters({filterBy}) {return filterBy.activeFilters},
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
            const idx = state.boards.findIndex(c => c._id === board._id)
            state.boards.splice(idx, 1, board)
            state.currBoard = board
        },
        removeBoard(state, { boardId }) {
            state.boards = state.boards.filter(board => board._id !== boardId)
        },
        addBoardMsg(state, { boardId, msg }) {
            const board = state.boards.find(board => board._id === boardId)
            if (!board.msgs) board.msgs = []
            board.msgs.push(msg)
        },
        setCurrGroup(state, { group }) {
            state.currGroup = group
        },
        updateActiveFilters(state,{label}) {
            // if(label === 'Empty status' || 'Empty priority') label = ''
            if(state.filterBy.activeFilters.includes(label)) {
                const labelIdx = state.filterBy.activeFilters.findIndex(l=>l===label)
                state.filterBy.activeFilters.splice(labelIdx,1)
            } else state.filterBy.activeFilters.push(label)
        }
    },
    actions: {
        filterBoard({commit} ,{filteredBoard}) {
            console.log('from store',filteredBoard)
            commit({type: 'setCurrBoard', board:filteredBoard})
        //    state.currBoard = filteredBoard
        },
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
            const currBoard = state.currBoard
            // commit(ACTION) // dispatch(ACTION)
            if (!toUpdate.task) toUpdate.task = null
            try {
                const board = await boardService.saveTask(currBoard, toUpdate.group, toUpdate.task)
                commit({type: 'updateBoard' , board})
                commit({type: 'setCurrGroup', group:toUpdate.group})
            } catch(err) {
                throw new Error(err)
            }
        },
        async remove({ state, commit }, { toRemove }) {
            const board = await boardService.removeItem(state.currBoard, toRemove.groupId, toRemove.taskId)
            commit({type: 'updateBoard' , board})
        },
        FilterBoard({state,commit}) {
            try {
                const FilteredBoard = boardService.filterBoard(state.currBoard,state.filterBy)
                commit(getActionUpdateBoard(FilteredBoard))
            } catch(err) {
                throw new Error(err)
            }
        }
    }
}
