import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
  getEmptyTask,
  saveTask,
  removeItem,
  filterBoard,
  getEmptyActivity,
  getDefaultLabels
}
window.cs = boardService

async function query(user) {
  let userId = null
  const demoCache = utilService.loadFromStorage('userId')
  if (user) userId = user._id
  else if (demoCache) userId = demoCache
  else userId =  "64233ebc79347a439c027636"
  return httpService.get(STORAGE_KEY + '/', userId)
}

function getById(boardId) {
  return httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
  return httpService.delete(`board/${boardId}`)
  // return httpService.delete(`board/`,boardId)
}

async function save(board) {
  var savedBoard
  if (board._id) {
    // console.log('board._id', board._id)
    savedBoard = await httpService.put(`board/${board._id}`, board)
  } else {
    // Later, owner is set by the backend
    const cache = utilService.loadFromStorage('userId')
    const user = userService.getLoggedInUser()
    if(user) board.owner = user._id
    else if(cache) board.owner = cache
    savedBoard = await httpService.post('board', board)
  }
  return savedBoard
}

function filterBoard(board, filterBy) {
  const filteredBoard = JSON.parse(JSON.stringify(board))
  const regex = new RegExp(filterBy.txt, 'i')
  filteredBoard.groups = filteredBoard.groups
    .map((group) => {
      const filteredTasks = group.tasks.filter((task) => {
        return JSON.stringify(task).match(regex)
      })
      return { ...group, tasks: filteredTasks }
    })
    .filter((group) => group.tasks.length > 0)
  if (filterBy.activeFilters.length > 0) {
    filteredBoard.groups = filteredBoard.groups.filter((group) => {
      return (group.tasks = group.tasks.filter((task) => {
        return filterBy.activeFilters.some((label) => {
          if (task.status === label) return true
          if (task.priority === label) return true
          if (task.person.some((p) => p.name === label)) return true
          return false
        })
      }))
    })
  }
  if (filterBy.member) {
    filteredBoard.groups = filteredBoard.groups.filter((group) => {
      return (group.tasks = group.tasks.filter((task) => {
        return task.person.some((p) => p._id === filterBy.member._id)
      }))
    })
  }
  return filteredBoard
}

function getEmptyActivity() {
  return {
    createdAt: Date.now(),
    changedBy: userService.getLoggedInUser(),
    changed: null,
    whatChanged: null,
    from: null,
    to: null,
  }
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
    // console.log('task', task)
    await save(boardToSave)
    return boardToSave
  }
  if (group) {
    if (group._id) {
      const groupIdx = boardToSave.groups.findIndex((g) => g._id === group._id)
      boardToSave.groups.splice(groupIdx, 1, group)
    } else {
      group._id = utilService.makeId()
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

function getDefaultLabels() {
  return {
    status: [
      { id: '101', name: 'Working on it', color: '#fdab3d', class: 'status-working', },
      { id: '102', name: 'Stuck', color: '#e2445c', class: 'status-stuck' },
      { id: '103', name: 'Done', color: '#00c875', class: 'status-done' },
      { id: '104', name: '', color: '#c3c4c3', class: 'status-empty' },
    ],
    priority: [
      { id: '105', name: 'Critical', color: '#333333', class: 'priority-critical', },
      { id: '106', name: 'High', color: '#401694', class: 'priority-high' },
      { id: '107', name: 'Medium', color: '#5559df', class: 'priority-medium', },
      { id: '108', name: 'Low', color: '#579bfc', class: 'priority-low' },
      { id: '109', name: '', color: '#c3c4c3', class: 'priority-empty' },
    ],
  }
}

function getEmptyBoard() {
  return {
    title: 'New Board',
    members: [],
    description: 'Add your board\'s description here',
    labels: {
      status: [
        { id: '101', name: 'Working on it', color: '#fdab3d', class: 'status-working', },
        { id: '102', name: 'Stuck', color: '#e2445c', class: 'status-stuck' },
        { id: '103', name: 'Done', color: '#00c875', class: 'status-done' },
        { id: '104', name: '', color: '#c3c4c3', class: 'status-empty' },
      ],
      priority: [
        { id: '105', name: 'Critical', color: '#333333', class: 'priority-critical', },
        { id: '106', name: 'High', color: '#401694', class: 'priority-high' },
        { id: '107', name: 'Medium', color: '#5559df', class: 'priority-medium', },
        { id: '108', name: 'Low', color: '#579bfc', class: 'priority-low' },
        { id: '109', name: '', color: '#c3c4c3', class: 'priority-empty' },
      ],
    },
    groups: [
      {
        title: 'Frontend',
        _id: Math.random().toString(36).slice(2),
        color: 'rgb(0, 134, 192)',
        tasks: [
          {
            id: 't106',
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
            id: 't105',
            side: 'null',
            taskTitle: 'Task 2',
            person: [
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
            id: 't104',
            taskTitle: 'Task 3',
            person: [
            ],
            date: '',
            status: '',
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
            id: 't103',
            taskTitle: 'Task 2',
            person: [
            
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
            taskTitle: 'Task 3',
            person: [
            ],
            date: '',
            status: '',
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
    activities: [],
  }
}