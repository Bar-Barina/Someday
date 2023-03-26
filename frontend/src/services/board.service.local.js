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
  filterBoard,
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

function filterBoard(board, filterBy) {
  const filteredBoard = board
  const regex = new RegExp(filterBy.txt, 'i')
  filteredBoard.groups = filteredBoard.groups
    .map((group) => {
      const filteredTasks = group.tasks.filter((task) => {
        return JSON.stringify(task).match(regex)
      })
      return { ...group, tasks: filteredTasks }
    })
    .filter((group) => group.tasks.length > 0)

  filteredBoard.groups = filteredBoard.groups.filter((group) => {
    return (group.tasks = group.tasks.filter((task) => {
      return filterBy.activeFilters.some((label) => {
        if (task.status === label) return true
        if (task.priority === label) return true
        if (task.person.some((p) => p.name === label)) return true
        return false
      })
    }))
    return group.tasks.length > 0
  })
  return filteredBoard
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
            msgs: [],
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
            msgs: [],
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
            msgs: [],
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
            text: '',
            msgs: [],
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
            text: '',
            msgs: [],
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
            text: '',
            msgs: [],
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
    msgs: [],
  }
}

function makeMembers() {
  const members = [
    { name: "Tal", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04HWCV61T3-224de62cdd30-512' },
    { name: "Dor", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04C1V8MCT0-3405b9727a5c-512' },
    { name: "Bar", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04GRRF255G-b265ef8c888a-512' },
    { name: "Ofek", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04FAC6TULV-3a2724e5957b-512' },
  ]
  const total = utilService.getRandomIntInclusive(1, 4)
  return members.slice(0, total)
}

// ; (async () => {
//   await storageService.post(STORAGE_KEY,
//     {
//       title: 'Development',
//       description: 'Add your board\'s description here',
//       members: [
//         { name: "Tal", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04HWCV61T3-224de62cdd30-512' },
//         { name: "Dor", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04C1V8MCT0-3405b9727a5c-512' },
//         { name: "Bar", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04GRRF255G-b265ef8c888a-512' },
//         { name: "Ofek", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04FAC6TULV-3a2724e5957b-512' },
//       ],
//       groups: [
//         {
//           title: 'Web App Development',
//           _id: Math.random().toString(36).slice(2),
//           color: "#784bd1",
//           tasks: [
//             {
//               id: "t2321332",
//               taskTitle: "Implement user authentication",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "High",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t874658",
//               taskTitle: "Develop landing page design",
//               person: makeMembers(),
//               date: "",
//               status: "Working on it",
//               priority: "Medium",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t1010102",
//               taskTitle: "Build database schema",
//               person: makeMembers(),
//               date: "",
//               status: "Working on it",
//               priority: "Critical",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t242323",
//               taskTitle: "Create RESTful API endpoints",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "Low",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t239408",
//               taskTitle: "Develop front-end UI components",
//               person: makeMembers(),
//               date: "",
//               status: "Stuck",
//               priority: "Critical",
//               timeline: '[]',
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t2359320",
//               taskTitle: "Implement search functionality",
//               person: makeMembers(),
//               date: "",
//               status: "Working on it",
//               priority: "High",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t523952",
//               taskTitle: "Integrate payment gateway",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "Low",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//           ],
//         },
//         {
//           title: 'Mobile App Development',
//           _id: Math.random().toString(36).slice(2),
//           color: "#bb3354",
//           tasks: [
//             {
//               id: "t234952",
//               taskTitle: "Implement push notifications",
//               person: makeMembers(),
//               date: "",
//               status: "Working on it",
//               priority: "High",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t50235",
//               taskTitle: "Add social media integration",
//               person: makeMembers(),
//               date: "",
//               status: "Stuck",
//               priority: "High",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t402394",
//               taskTitle: "Improve UI layout",
//               person: makeMembers(),
//               date: "",
//               status: "",
//               priority: "Medium",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t148284",
//               taskTitle: "Debug user login issue",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "Critical",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t11182",
//               taskTitle: "Optimize app performance",
//               person: makeMembers(),
//               date: "",
//               status: "Working on it",
//               priority: "Medium",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t123322",
//               taskTitle: "Enable in-app purchases",
//               person: makeMembers(),
//               date: "",
//               status: "Stuck",
//               priority: "Low",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t552348",
//               taskTitle: "Add support for new languages",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "High",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//           ],
//         },
//         {
//           title: 'Backend Development',
//           _id: Math.random().toString(36).slice(2),
//           color: "#a25ddc",
//           tasks: [
//             {
//               id: "t00550",
//               taskTitle: "Implement API endpoints",
//               person: makeMembers(),
//               date: "",
//               status: "Working on it",
//               priority: "Critical",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t00089",
//               taskTitle: "Optimize database queries",
//               person: makeMembers(),
//               date: "",
//               status: "Working on it",
//               priority: "High",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t59696",
//               taskTitle: "Write unit tests",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "Low",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t69879",
//               taskTitle: "Refactor code for scalability",
//               person: makeMembers(),
//               date: "",
//               status: "Stuck",
//               priority: "Medium",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t99887",
//               taskTitle: "Set up caching system",
//               person: makeMembers(),
//               date: "",
//               status: "Working on it",
//               priority: "Low",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26" , "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//           ],
//         }
//       ]
//     }
//   )
//   await storageService.post(STORAGE_KEY,

//     {
//       title: 'Human Resources',
//       description: 'Add your board\'s description here',
//       members: [
//         { name: "Tal", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04HWCV61T3-224de62cdd30-512' },
//         { name: "Dor", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04C1V8MCT0-3405b9727a5c-512' },
//         { name: "Bar", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04GRRF255G-b265ef8c888a-512' },
//         { name: "Ofek", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04FAC6TULV-3a2724e5957b-512' },
//       ],
//       groups: [
//         {
//           title: 'Recruitment and Hiring',
//           _id: Math.random().toString(36).slice(2),
//           color: "#fdab3d",
//           tasks: [
//             {
//               id: "t20484",
//               taskTitle: "Creating job postings",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "High",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t33948",
//               taskTitle: "Reviewing resumes and applications",
//               person: makeMembers(),
//               date: "",
//               status: "Working on it",
//               priority: "High",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t67586",
//               taskTitle: "Scheduling and conducting interviews",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "Critical",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t01012",
//               taskTitle: "Extending job offers",
//               person: makeMembers(),
//               date: "",
//               status: "Stuck",
//               priority: "Medium",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t00022",
//               taskTitle: "Conducting background checks",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "Critical",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//           ],
//         },
//         {
//           title: 'Employee Training and Development',
//           _id: Math.random().toString(36).slice(2),
//           color: "#808080",
//           tasks: [
//             {
//               id: "t211032",
//               taskTitle: "Assessing employee training needs",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "Low",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t203823",
//               taskTitle: "Designing and delivering training programs",
//               person: makeMembers(),
//               date: "",
//               status: "Stuck",
//               priority: "High",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t11111",
//               taskTitle: "Facilitating workshops and seminars",
//               person: makeMembers(),
//               date: "",
//               status: "Working on it",
//               priority: "Medium",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t22302",
//               taskTitle: "Creating e-learning modules",
//               person: makeMembers(),
//               date: "",
//               status: "",
//               priority: "Low",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t01239",
//               taskTitle: "Providing on-the-job training",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "High",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//           ],
//         },
//         {
//           title: 'Employee Relations and Compliance',
//           _id: Math.random().toString(36).slice(2),
//           color: "#037f4c",
//           tasks: [
//             {
//               id: "t10384",
//               taskTitle: "Resolving employee complaints",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "Medium",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t2947",
//               taskTitle: "Maintaining employee files",
//               person: makeMembers(),
//               date: "",
//               status: "Working on it",
//               priority: "Low",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t8435",
//               taskTitle: "Administering employee surveys",
//               person: makeMembers(),
//               date: "",
//               status: "Stuck",
//               priority: "Critical",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t1153",
//               taskTitle: "Enforcing company policies and procedures",
//               person: makeMembers(),
//               date: "",
//               status: "Working on it",
//               priority: "High",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-22", "Mar-29"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t234",
//               taskTitle: "Ensuring compliance with labor laws",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "Low",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//           ],
//         }
//       ]
//     }
//   )
// })();

// ; (async () => {
//   await storageService.post(STORAGE_KEY,

//     {
//       title: 'Human Resources',
//       description: 'Add your board\'s description here',
//       members: [
//         { name: "Tal", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04HWCV61T3-224de62cdd30-512' },
//         { name: "Dor", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04C1V8MCT0-3405b9727a5c-512' },
//         { name: "Bar", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04GRRF255G-b265ef8c888a-512' },
//         { name: "Ofek", url: 'https://ca.slack-edge.com/T04CLB0SNC9-U04FAC6TULV-3a2724e5957b-512' },
//       ],
//       groups: [
//         {
//           title: 'Recruitment and Hiring',
//           _id: Math.random().toString(36).slice(2),
//           color: "#fdab3d",
//           tasks: [
//             {
//               id: "t20484",
//               taskTitle: "Creating job postings",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "High",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t33948",
//               taskTitle: "Reviewing resumes and applications",
//               person: makeMembers(),
//               date: "",
//               status: "Working on it",
//               priority: "High",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t67586",
//               taskTitle: "Scheduling and conducting interviews",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "Critical",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t01012",
//               taskTitle: "Extending job offers",
//               person: makeMembers(),
//               date: "",
//               status: "Stuck",
//               priority: "Medium",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t00022",
//               taskTitle: "Conducting background checks",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "Critical",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//           ],
//         },
//         {
//           title: 'Employee Training and Development',
//           _id: Math.random().toString(36).slice(2),
//           color: "#808080",
//           tasks: [
//             {
//               id: "t211032",
//               taskTitle: "Assessing employee training needs",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "Low",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t203823",
//               taskTitle: "Designing and delivering training programs",
//               person: makeMembers(),
//               date: "",
//               status: "Stuck",
//               priority: "High",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t11111",
//               taskTitle: "Facilitating workshops and seminars",
//               person: makeMembers(),
//               date: "",
//               status: "Working on it",
//               priority: "Medium",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t22302",
//               taskTitle: "Creating e-learning modules",
//               person: makeMembers(),
//               date: "",
//               status: "",
//               priority: "Low",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t01239",
//               taskTitle: "Providing on-the-job training",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "High",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//           ],
//         },
//         {
//           title: 'Employee Relations and Compliance',
//           _id: Math.random().toString(36).slice(2),
//           color: "#037f4c",
//           tasks: [
//             {
//               id: "t10384",
//               taskTitle: "Resolving employee complaints",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "Medium",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t2947",
//               taskTitle: "Maintaining employee files",
//               person: makeMembers(),
//               date: "",
//               status: "Working on it",
//               priority: "Low",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t8435",
//               taskTitle: "Administering employee surveys",
//               person: makeMembers(),
//               date: "",
//               status: "Stuck",
//               priority: "Critical",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t1153",
//               taskTitle: "Enforcing company policies and procedures",
//               person: makeMembers(),
//               date: "",
//               status: "Working on it",
//               priority: "High",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-22", "Mar-29"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//             {
//               id: "t234",
//               taskTitle: "Ensuring compliance with labor laws",
//               person: makeMembers(),
//               date: "",
//               status: "Done",
//               priority: "Low",
//               text: '',
//               isSelected: false,
//               timeline: ["Mar-26", "Apr-10"],
//               files: [],
//               text: '',
//               msgs: []
//             },
//           ],
//         }
//       ]
//     }
//   )
// })();



// Use for no logged in users only!
// { name: "Dor", color: "black", url: 'https://cdn1.monday.com/dapulse_default_photo.png' },
