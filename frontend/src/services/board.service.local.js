
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'boards'

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    addBoardMsg,
    saveTask
}
window.cs = boardService


async function query(filterBy = {}) {
    var boards = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     boards = boards.filter(board => regex.test(board.vendor) || regex.test(board.description))
    // }
    // if (filterBy.price) {
    //     boards = boards.filter(board => board.price <= filterBy.price)
    // }
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        // Later, owner is set by the backend
        board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    // Later, this is all done by the backend
    const board = await getById(boardId)
    if (!board.msgs) board.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    board.msgs.push(msg)
    await storageService.put(STORAGE_KEY, board)

    return msg
}

function getEmptyBoard() {
    return {
        title: 'Susita-' + (Date.now() % 1000),
        date: utilService.getRandomIntInclusive(1000, 9000),
    }
}

function saveTask(board, groupId, task) {
    console.log('task', task)
    const boardToSave = JSON.parse(JSON.stringify(board))
    const groupIdx = boardToSave.groups.findIndex(g => g._id === groupId)
    const taskIdx = boardToSave.groups[groupIdx].tasks.findIndex(t => t.id === task.id)
    boardToSave.groups[groupIdx].tasks.splice(taskIdx , 1 , task)
    // PUT /api/board/b123/task/t678
    // board.activities.unshift(activity)
    save(boardToSave)
    return boardToSave
    // return task
}

// ; (async () => {
//     await storageService.post(STORAGE_KEY,
//         {
//             title: 'First board',
//             groups: [
//                 {
//                     title: 'First task',
//                     _id: Math.random().toString(36).slice(2),
//                     color: "red",
//                     tasks: [
//                         {
//                             id: "t101",
//                             side: "null",
//                             taskTitle: "learn CSS",
//                             person: [
//                                 { name: "tal", color: "red" },
//                                 { name: "bal", color: "black" },
//                                 { name: "shal", color: "green" },
//                             ],
//                             date: "27-02-2022",
//                             status: "Working on it",
//                             priority: "Low",
//                             timeline: 'late',
//                             file: '11',
//                             text: 'Something'
//                         },
//                         {
//                             id: "t102",
//                             side: "null",
//                             taskTitle: "learn vue",
//                             person: [
//                                 { name: "tal", color: "red" },
//                                 { name: "bal", color: "black" },
//                                 { name: "shal", color: "green" },
//                             ],
//                             date: "27-02-2022",
//                             status: "Stuck",
//                             priority: "Low",
//                             timeline: 'late',
//                             file: '11',
//                             text: 'Something'
//                         },
//                         {
//                             id: "t103",
//                             side: "null",
//                             taskTitle: "learn js",
//                             person: [
//                                 { name: "tal", color: "red" },
//                                 { name: "bal", color: "black" },
//                                 { name: "shal", color: "green" },
//                             ],
//                             date: "27-02-2022",
//                             status: "Done",
//                             priority: "Low",
//                             timeline: 'late',
//                             file: '11',
//                             text: 'Something'
//                         },
//                     ],
//                 },
//                 {
//                     title: 'First task',
//                     _id: Math.random().toString(36).slice(2),
//                     color: "red",
//                     tasks: [
//                         {
//                             id: "t101",
//                             side: "null",
//                             taskTitle: "learn CSS",
//                             person: [
//                                 { name: "tal", color: "red" },
//                                 { name: "bal", color: "black" },
//                                 { name: "shal", color: "green" },
//                             ],
//                             date: "27-02-2022",
//                             status: "Working on it",
//                             priority: "Low",
//                             timeline: 'late',
//                             file: '11',
//                             text: 'Something'
//                         },
//                         {
//                             id: "t102",
//                             side: "null",
//                             taskTitle: "learn vue",
//                             person: [
//                                 { name: "tal", color: "red" },
//                                 { name: "bal", color: "black" },
//                                 { name: "shal", color: "green" },
//                             ],
//                             date: "27-02-2022",
//                             status: "Stuck",
//                             priority: "Low",
//                             timeline: 'late',
//                             file: '11',
//                             text: 'Something'
//                         },
//                         {
//                             id: "t103",
//                             side: "null",
//                             taskTitle: "learn js",
//                             person: [
//                                 { name: "tal", color: "red" },
//                                 { name: "bal", color: "black" },
//                                 { name: "shal", color: "green" },
//                             ],
//                             date: "27-02-2022",
//                             status: "Done",
//                             priority: "Low",
//                             timeline: 'late',
//                             file: '11',
//                             text: 'Something'
//                         },
//                     ],
//                 }
//             ]
//         }
//     )
// })();