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
  saveTask,
  getEmptyTask,
  removeItem,
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
    board.owner = userService.getLoggedInUser()
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
    by: userService.getLoggedInUser(),
    txt,
  }
  board.msgs.push(msg)
  await storageService.put(STORAGE_KEY, board)

  return msg
}

async function saveTask(board, group, task) {
  const boardToSave = JSON.parse(JSON.stringify(board))
  if (task) {
    const groupIdx = boardToSave.groups.findIndex((g) => g._id === group._id)
    if (task.id) {
      const taskIdx = boardToSave.groups[groupIdx].tasks.findIndex(
        (t) => t.id === task.id
      )
      boardToSave.groups[groupIdx].tasks.splice(taskIdx, 1, task)
    } else {
      task.id = utilService.makeId()
      boardToSave.groups[groupIdx].tasks.push(task)
    }
    await save(boardToSave)
    return boardToSave
  }
  if (group) {
    if (group._id) {
      const groupIdx = boardToSave.groups.findIndex((g) => g._id === group._id)
      boardToSave.groups.splice(groupIdx, 1, group)
    } else {
      group.id = utilService.makeId()
      boardToSave.groups.push(group)
    }
    await save(boardToSave)
    return boardToSave
  }
  await save(boardToSave)
  return boardToSave

  // PUT /api/board/b123/task/t678
  // board.activities.unshift(activity)
}

async function removeItem(board, groupId, taskId) {
  const currBoard = JSON.parse(JSON.stringify(board))
  const groupIdx = currBoard.groups.findIndex((g) => g._id === groupId)
  if (taskId) {
    const taskIdx = currBoard.groups[groupIdx].tasks.findIndex(
      (t) => t.id === taskId
    )
    currBoard.groups[groupIdx].tasks.splice(taskIdx, 1)
  } else {
    currBoard.groups.splice(groupIdx, 1)
  }
  save(currBoard)
  return currBoard
}

function getEmptyBoard() {
  return {
    title: 'New Board',
    members: [],
    groups: [
      {
        title: 'Frontend',
        _id: Math.random().toString(36).slice(2),
        color: 'rgb(0, 134, 192)',
        tasks: [
          {
            id: 't101',
            side: 'null',
            taskTitle: 'Task 1',
            person: [],
            date: '',
            status: 'Working on it',
            priority: 'High',
            timeline: [],
            files: [],
            text: '',
          },
          {
            id: 't102',
            side: 'null',
            taskTitle: 'Task 2',
            person: [
              {
                name: 'Bar',
                color: 'green',
                url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04GRRF255G-b265ef8c888a-512',
              },
            ],
            date: '',
            status: 'Done',
            priority: 'Critical',
            timeline: [],
            files: [],
            text: '',
          },
          {
            id: 't102',
            side: 'null',
            taskTitle: 'Task 3',
            person: [
              {
                name: 'Bar',
                color: 'green',
                url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04GRRF255G-b265ef8c888a-512',
              },
            ],
            date: '',
            status: 'Null',
            priority: 'High',
            timeline: [],
            files: [],
            text: '',
          },
        ],
      },
      {
        title: 'Backend',
        _id: Math.random().toString(36).slice(2),
        color: 'rgb(0, 134, 192)',
        tasks: [
          {
            id: 't101',
            side: 'null',
            taskTitle: 'Task 1',
            person: [],
            date: '',
            status: 'Done',
            priority: 'Low',
            timeline: [],
            files: [],
            text: 'Something',
          },
          {
            id: 't102',
            side: 'null',
            taskTitle: 'Task 2',
            person: [
              {
                name: 'Bar',
                color: 'green',
                url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04GRRF255G-b265ef8c888a-512',
              },
            ],
            date: '',
            status: 'Working on it',
            priority: 'Medium',
            timeline: [],
            files: [],
            text: 'Something',
          },
          {
            id: 't102',
            side: 'null',
            taskTitle: 'Task 3',
            person: [
              {
                name: 'Bar',
                color: 'green',
                url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04GRRF255G-b265ef8c888a-512',
              },
            ],
            date: '',
            status: 'null',
            priority: 'Low',
            timeline: [],
            files: [],
            text: 'Something',
          },
        ],
      },
    ],
  }
}

function getEmptyTask() {
  return {
    taskTitle: '',
    person: [],
    date: '',
    status: '',
    priority: '',
    timeline: [],
    files: '',
    text: '',
  }
}

// ; (async () => {
//     await storageService.post(STORAGE_KEY,
//         {
//             title: 'Sprint 4 Monday',
//             description: 'Add your board\'s description here',
//             members: [
//                 { name: "Tal", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04HWCV61T3-224de62cdd30-512' },
//                 { name: "Dor", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04C1V8MCT0-3405b9727a5c-512' },
//                 { name: "Bar", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04GRRF255G-b265ef8c888a-512' },
//                 { name: "Ofek", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04FAC6TULV-3a2724e5957b-512' },
//             ],
//             groups: [
//                 {
//                     title: 'Frontend',
//                     _id: Math.random().toString(36).slice(2),
//                     color: "rgb(0, 134, 192)",
//                     tasks: [
//                         {
//                             id: "t101",
//                             side: "null",
//                             taskTitle: "Navbar",
//                             person: [
//                                 { name: "Tal", color: "red", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04HWCV61T3-224de62cdd30-512' },
//                                 { name: "Ofek", color: "green", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04FAC6TULV-3a2724e5957b-512' },
//                             ],
//                             date: "",
//                             status: "Working on it",
//                             priority: "High",
//                             timeline: '[]',
//                             file: '11',
//                             text: '',
//                             timeline: [],
//                             file: [],
//                             text: ''
//                         },
//                         {
//                             id: "t102",
//                             side: "null",
//                             taskTitle: "Making header",
//                             person: [
//                                 { name: "Bar", color: "green", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04GRRF255G-b265ef8c888a-512' },
//                             ],
//                             date: "",
//                             status: "Stuck",
//                             priority: "Low",
//                             timeline: '[]',
//                             file: '11',
//                             text: '',
//                             timeline: [],
//                             file: [],
//                             text: ''
//                         },
//                         {
//                             id: "t103",
//                             side: "null",
//                             taskTitle: "Pixel perfect",
//                             person: [
//                                 { name: "Ofek", color: "green", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04FAC6TULV-3a2724e5957b-512' },
//                                 { name: "Bar", color: "green", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04GRRF255G-b265ef8c888a-512' },
//                             ],
//                             date: "",
//                             status: "Done",
//                             priority: "Critical",
//                             timeline: '[]',
//                             file: '11',
//                             text: '',
//                             timeline: [],
//                             file: [],
//                             text: ''
//                         },
//                     ],
//                 },
//                 {
//                     title: 'Backend',
//                     _id: Math.random().toString(36).slice(2),
//                     color: "rgb(255, 21, 138)",
//                     tasks: [
//                         {
//                             id: "t101",
//                             side: "null",
//                             taskTitle: "Full crud",
//                             person: [
//                                   { name: "Tal", color: "red", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04HWCV61T3-224de62cdd30-512' },
//                                 { name: "Dor", color: "black", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04C1V8MCT0-3405b9727a5c-512' },
//                                 { name: "Ofek", color: "green", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04FAC6TULV-3a2724e5957b-512' },
//                             ],
//                             date: "",
//                             status: "Working on it",
//                             priority: "High",
//                             timeline: '[]',
//                             file: '11',
//                             text: '',
//                             timeline: [],
//                             file: [],
//                             text: ''
//                         },
//                         {
//                             id: "t102",
//                             side: "null",
//                             taskTitle: "Check postman",
//                             person: [
//                                 { name: "Dor", color: "black", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04C1V8MCT0-3405b9727a5c-512' },
//                             ],
//                             date: "",
//                             status: "Stuck",
//                             priority: "High",
//                             timeline: '[]',
//                             file: '11',
//                             text: '',
//                             timeline: [],
//                             file: [],
//                             text: ''
//                         },
//                         {
//                             id: "t103",
//                             side: "null",
//                             taskTitle: "Connect sockets",
//                             person: [
//                                 { name: "Dor", color: "black", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04C1V8MCT0-3405b9727a5c-512' },
//                                 { name: "Bar", color: "green", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04GRRF255G-b265ef8c888a-512' },
//                             ],
//                             date: "",
//                             status: "Done",
//                             priority: "Low",
//                             timeline: '[]',
//                             file: '11',
//                             text: '',
//                             timeline: [],
//                             file: [],
//                             text: ''
//                         },
//                     ],
//                 }
//             ]
//         }
//     )
// })();

// Use for no logged in users only!
// { name: "Dor", color: "black", url: 'https://cdn1.monday.com/dapulse_default_photo.png' },
