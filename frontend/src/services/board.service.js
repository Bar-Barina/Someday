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
  console.log('userId', userId)
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

function getDemoBoard() {
  return {
    "_id": ObjectId("64273ef7b624a3790ca1814a"),
    "title": "Web development",
    "description": "Add your board's description here",
    "members": [

    ],
    "groups": [
      {
        "_id": "ksd398fj3d32",
        "title": "Frontend Web Development\n",
        "color": "#037f4c",
        "tasks": [
          {
            "id": "kjdshf7sdhf",
            "taskTitle": "Create responsive website layout design.",
            "person": [

            ],
            "date": "Mar-08",
            "status": "Working on it",
            "priority": "Critical",
            "timeline": [
              "Mar-15",
              "Apr-26"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "activities": [
              {
                "createdAt": 1680293635183.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Working on it",
                "taskTitle": "Develop the UI"
              },
              {
                "createdAt": 1680293645022.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "Critical",
                "taskTitle": "Develop the UI"
              },
              {
                "createdAt": 1680293752174.0,
                "changedBy": null,
                "changed": "taskTitle",
                "from": "Develop the UI",
                "to": "Create responsive website layout design.",
                "taskTitle": "Develop the UI"
              },
              {
                "createdAt": 1680294007084.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-15",
                  "Apr-26"
                ],
                "taskTitle": "Create responsive website layout design."
              },
              {
                "createdAt": 1680294086404.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-08",
                "taskTitle": "Create responsive website layout design."
              }
            ]
          },
          {
            "id": "udshf87hdsf",
            "taskTitle": "Implement user authentication and authorization.",
            "person": [

            ],
            "date": "Mar-21",
            "status": "Stuck",
            "priority": "High",
            "timeline": [
              "Mar-17",
              "Apr-18"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "activities": [
              {
                "createdAt": 1680293641203.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "High",
                "taskTitle": "Create a login form"
              },
              {
                "createdAt": 1680293648074.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Stuck",
                "taskTitle": "Create a login form"
              },
              {
                "createdAt": 1680293755741.0,
                "changedBy": null,
                "changed": "taskTitle",
                "from": "Create a login form",
                "to": "Implement user authentication and authorization.",
                "taskTitle": "Create a login form"
              },
              {
                "createdAt": 1680294009157.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-17",
                  "Apr-18"
                ],
                "taskTitle": "Implement user authentication and authorization."
              },
              {
                "createdAt": 1680294089292.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-21",
                "taskTitle": "Implement user authentication and authorization."
              }
            ]
          },
          {
            "id": "ds98fjh3ufh",
            "taskTitle": "Optimize website performance for speed.",
            "person": [

            ],
            "date": "Mar-16",
            "status": "Done",
            "priority": "Low",
            "timeline": [
              "Mar-16",
              "Apr-17"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "activities": [
              {
                "createdAt": 1680293639377.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Done",
                "taskTitle": "Design an onboarding flow"
              },
              {
                "createdAt": 1680293646687.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "Low",
                "taskTitle": "Design an onboarding flow"
              },
              {
                "createdAt": 1680293759313.0,
                "changedBy": null,
                "changed": "taskTitle",
                "from": "Design an onboarding flow",
                "to": "Optimize website performance for speed.",
                "taskTitle": "Design an onboarding flow"
              },
              {
                "createdAt": 1680294011205.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-16",
                  "Apr-17"
                ],
                "taskTitle": "Optimize website performance for speed."
              },
              {
                "createdAt": 1680294087820.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-16",
                "taskTitle": "Optimize website performance for speed."
              }
            ]
          },
          {
            "id": "oisdnf87jefnwi",
            "taskTitle": "Develop reusable frontend components.",
            "person": [

            ],
            "date": "Mar-09",
            "status": "Working on it",
            "priority": "Medium",
            "timeline": [
              "Mar-29",
              "Apr-25"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "activities": [
              {
                "createdAt": 1680293642992.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "Medium",
                "taskTitle": "Add authentication"
              },
              {
                "createdAt": 1680293764049.0,
                "changedBy": null,
                "changed": "taskTitle",
                "from": "Add authentication",
                "to": "Develop reusable frontend components.",
                "taskTitle": "Add authentication"
              },
              {
                "createdAt": 1680293876461.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Working on it",
                "taskTitle": "Develop reusable frontend components."
              },
              {
                "createdAt": 1680294014615.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-29",
                  "Apr-25"
                ],
                "taskTitle": "Develop reusable frontend components."
              },
              {
                "createdAt": 1680294090679.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-09",
                "taskTitle": "Develop reusable frontend components."
              }
            ]
          },
          {
            "taskTitle": "Integrate with third-party APIs.",
            "person": [

            ],
            "date": "Mar-07",
            "status": "Stuck",
            "priority": "High",
            "timeline": [
              "Mar-09",
              "Mar-28"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "id": "csmKlb",
            "activities": [
              {
                "createdAt": 1680293867183.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "High",
                "taskTitle": "Integrate with third-party APIs."
              },
              {
                "createdAt": 1680293871542.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Stuck",
                "taskTitle": "Integrate with third-party APIs."
              },
              {
                "createdAt": 1680294016777.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-09",
                  "Mar-28"
                ],
                "taskTitle": "Integrate with third-party APIs."
              },
              {
                "createdAt": 1680294092175.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-07",
                "taskTitle": "Integrate with third-party APIs."
              }
            ]
          },
          {
            "taskTitle": "Write unit and integration tests.",
            "person": [

            ],
            "date": "Mar-02",
            "status": "Working on it",
            "priority": "Critical",
            "timeline": [
              "Mar-16",
              "Apr-10"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "id": "IUAtBn",
            "activities": [
              {
                "createdAt": 1680293860905.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "Critical",
                "taskTitle": "Write unit and integration tests."
              },
              {
                "createdAt": 1680293877921.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Stuck",
                "taskTitle": "Write unit and integration tests."
              },
              {
                "createdAt": 1680293879535.0,
                "changedBy": null,
                "changed": "status",
                "from": "Stuck",
                "to": "Working on it",
                "taskTitle": "Write unit and integration tests."
              },
              {
                "createdAt": 1680294018648.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-16",
                  "Apr-10"
                ],
                "taskTitle": "Write unit and integration tests."
              },
              {
                "createdAt": 1680294094670.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-02",
                "taskTitle": "Write unit and integration tests."
              }
            ]
          },
          {
            "taskTitle": "Ensure website accessibility compliance.",
            "person": [

            ],
            "date": "Mar-15",
            "status": "Done",
            "priority": "Low",
            "timeline": [
              "Mar-16",
              "Apr-10"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "id": "qlys8y",
            "activities": [
              {
                "createdAt": 1680293862761.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "Low",
                "taskTitle": "Ensure website accessibility compliance."
              },
              {
                "createdAt": 1680293874518.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Done",
                "taskTitle": "Ensure website accessibility compliance."
              },
              {
                "createdAt": 1680294020637.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-16",
                  "Apr-10"
                ],
                "taskTitle": "Ensure website accessibility compliance."
              },
              {
                "createdAt": 1680294096300.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-15",
                "taskTitle": "Ensure website accessibility compliance."
              }
            ]
          }
        ]
      },
      {
        "_id": "oisdjf9hdsf",
        "title": "Backend Web Development\n",
        "color": "#9cd326",
        "tasks": [
          {
            "id": "987shdfn8f",
            "taskTitle": "Develop RESTful API endpoints.",
            "person": [

            ],
            "date": "Mar-09",
            "status": "Stuck",
            "priority": "High",
            "timeline": [
              "Mar-17",
              "Apr-16"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "activities": [
              {
                "createdAt": 1680293786640.0,
                "changedBy": null,
                "changed": "taskTitle",
                "from": "Write automated tests",
                "to": "Develop RESTful API endpoints.",
                "taskTitle": "Write automated tests"
              },
              {
                "createdAt": 1680293882238.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "High",
                "taskTitle": "Develop RESTful API endpoints."
              },
              {
                "createdAt": 1680293910188.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Stuck",
                "taskTitle": "Develop RESTful API endpoints."
              },
              {
                "createdAt": 1680294023378.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-17",
                  "Apr-16"
                ],
                "taskTitle": "Develop RESTful API endpoints."
              },
              {
                "createdAt": 1680294098583.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-09",
                "taskTitle": "Develop RESTful API endpoints."
              }
            ]
          },
          {
            "id": "oisjd8f9",
            "taskTitle": "Design and implement database schema.",
            "person": [

            ],
            "date": "Mar-08",
            "status": "Working on it",
            "priority": "Critical",
            "timeline": [
              "Mar-18",
              "Apr-18"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "activities": [
              {
                "createdAt": 1680293790353.0,
                "changedBy": null,
                "changed": "taskTitle",
                "from": "Build a user profile page",
                "to": "Design and implement database schema.",
                "taskTitle": "Build a user profile page"
              },
              {
                "createdAt": 1680293885663.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Working on it",
                "taskTitle": "Design and implement database schema."
              },
              {
                "createdAt": 1680293888707.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "Low",
                "taskTitle": "Design and implement database schema."
              },
              {
                "createdAt": 1680293897850.0,
                "changedBy": null,
                "changed": "priority",
                "from": "Low",
                "to": "Critical",
                "taskTitle": "Design and implement database schema."
              },
              {
                "createdAt": 1680294024811.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-18",
                  "Apr-18"
                ],
                "taskTitle": "Design and implement database schema."
              },
              {
                "createdAt": 1680294100092.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-08",
                "taskTitle": "Design and implement database schema."
              }
            ]
          },
          {
            "id": "dsklfn873n",
            "taskTitle": "Create data visualization dashboards.",
            "person": [

            ],
            "date": "Mar-22",
            "status": "Done",
            "priority": "Low",
            "timeline": [
              "Mar-07",
              "Apr-12"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "activities": [
              {
                "createdAt": 1680293794811.0,
                "changedBy": null,
                "changed": "taskTitle",
                "from": "Implement type",
                "to": "Create data visualization dashboards.",
                "taskTitle": "Implement type"
              },
              {
                "createdAt": 1680293894722.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "Low",
                "taskTitle": "Create data visualization dashboards."
              },
              {
                "createdAt": 1680293906413.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Done",
                "taskTitle": "Create data visualization dashboards."
              },
              {
                "createdAt": 1680294026099.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-07",
                  "Apr-12"
                ],
                "taskTitle": "Create data visualization dashboards."
              },
              {
                "createdAt": 1680294101926.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-22",
                "taskTitle": "Create data visualization dashboards."
              }
            ]
          },
          {
            "id": "3298jcds8df",
            "taskTitle": "Build real-time chat or messaging feature.",
            "person": [

            ],
            "date": "Mar-17",
            "status": "Working on it",
            "priority": "Critical",
            "timeline": [
              "Mar-16",
              "Apr-18"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "activities": [
              {
                "createdAt": 1680293801509.0,
                "changedBy": null,
                "changed": "taskTitle",
                "from": "Make a backend",
                "to": "Build real-time chat or messaging feature.",
                "taskTitle": "Make a backend"
              },
              {
                "createdAt": 1680293893307.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "Critical",
                "taskTitle": "Build real-time chat or messaging feature."
              },
              {
                "createdAt": 1680293911780.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Working on it",
                "taskTitle": "Build real-time chat or messaging feature."
              },
              {
                "createdAt": 1680294028096.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-16",
                  "Apr-18"
                ],
                "taskTitle": "Build real-time chat or messaging feature."
              },
              {
                "createdAt": 1680294103310.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-17",
                "taskTitle": "Build real-time chat or messaging feature."
              }
            ]
          },
          {
            "taskTitle": "Develop automated deployment pipelines.",
            "person": [

            ],
            "date": "Mar-10",
            "status": "Stuck",
            "priority": "High",
            "timeline": [
              "Mar-09",
              "Apr-10"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "id": "JHhQkK",
            "activities": [
              {
                "createdAt": 1680293890442.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "High",
                "taskTitle": "Develop automated deployment pipelines."
              },
              {
                "createdAt": 1680293891931.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Stuck",
                "taskTitle": "Develop automated deployment pipelines."
              },
              {
                "createdAt": 1680294029533.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-09",
                  "Apr-10"
                ],
                "taskTitle": "Develop automated deployment pipelines."
              },
              {
                "createdAt": 1680294104624.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-10",
                "taskTitle": "Develop automated deployment pipelines."
              }
            ]
          },
          {
            "taskTitle": "Implement caching and load balancing.",
            "person": [

            ],
            "date": "Mar-14",
            "status": "Done",
            "priority": "Low",
            "timeline": [
              "Feb-28",
              "Apr-12"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "id": "PPfWnd",
            "activities": [
              {
                "createdAt": 1680293896519.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "High",
                "taskTitle": "Implement caching and load balancing."
              },
              {
                "createdAt": 1680293899409.0,
                "changedBy": null,
                "changed": "priority",
                "from": "High",
                "to": "Low",
                "taskTitle": "Implement caching and load balancing."
              },
              {
                "createdAt": 1680293913416.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Done",
                "taskTitle": "Implement caching and load balancing."
              },
              {
                "createdAt": 1680294031313.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Feb-28",
                  "Apr-12"
                ],
                "taskTitle": "Implement caching and load balancing."
              },
              {
                "createdAt": 1680294106679.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-14",
                "taskTitle": "Implement caching and load balancing."
              }
            ]
          },
          {
            "taskTitle": "Monitor and troubleshoot application issues.",
            "person": [

            ],
            "date": "Mar-10",
            "status": "Done",
            "priority": "High",
            "timeline": [
              "Mar-09",
              "Apr-13"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "id": "hUWwVC",
            "activities": [
              {
                "createdAt": 1680293904117.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "High",
                "taskTitle": "Monitor and troubleshoot application issues."
              },
              {
                "createdAt": 1680293908106.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Done",
                "taskTitle": "Monitor and troubleshoot application issues."
              },
              {
                "createdAt": 1680294032672.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-09",
                  "Apr-13"
                ],
                "taskTitle": "Monitor and troubleshoot application issues."
              },
              {
                "createdAt": 1680294107977.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-10",
                "taskTitle": "Monitor and troubleshoot application issues."
              }
            ]
          }
        ]
      },
      {
        "title": "Web Marketing and E-commerce\n",
        "color": "#e2445c",
        "tasks": [
          {
            "taskTitle": "Write SEO-friendly website content.",
            "person": [

            ],
            "date": "Mar-08",
            "status": "Working on it",
            "priority": "Critical",
            "timeline": [
              "Mar-17",
              "Apr-17"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "id": "Ydp8K3",
            "activities": [
              {
                "createdAt": 1680293974369.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "Critical",
                "taskTitle": "Write SEO-friendly website content."
              },
              {
                "createdAt": 1680293987874.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Stuck",
                "taskTitle": "Write SEO-friendly website content."
              },
              {
                "createdAt": 1680294002153.0,
                "changedBy": null,
                "changed": "status",
                "from": "Stuck",
                "to": "Working on it",
                "taskTitle": "Write SEO-friendly website content."
              },
              {
                "createdAt": 1680294035766.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-17",
                  "Apr-17"
                ],
                "taskTitle": "Write SEO-friendly website content."
              },
              {
                "createdAt": 1680294111035.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-08",
                "taskTitle": "Write SEO-friendly website content."
              }
            ]
          },
          {
            "taskTitle": "Develop responsive email templates.",
            "person": [

            ],
            "date": "Mar-15",
            "status": "Done",
            "priority": "Low",
            "timeline": [
              "Mar-15",
              "Apr-13"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "id": "BDFaBX",
            "activities": [
              {
                "createdAt": 1680293978656.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "Low",
                "taskTitle": "Develop responsive email templates."
              },
              {
                "createdAt": 1680293990722.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Done",
                "taskTitle": "Develop responsive email templates."
              },
              {
                "createdAt": 1680294037557.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-15",
                  "Apr-13"
                ],
                "taskTitle": "Develop responsive email templates."
              },
              {
                "createdAt": 1680294109727.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-15",
                "taskTitle": "Develop responsive email templates."
              }
            ]
          },
          {
            "taskTitle": "Create social media integrations.",
            "person": [

            ],
            "date": "Mar-10",
            "status": "Stuck",
            "priority": "High",
            "timeline": [
              "Mar-09",
              "Apr-12"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "id": "jCQ3ON",
            "activities": [
              {
                "createdAt": 1680293975598.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "High",
                "taskTitle": "Create social media integrations."
              },
              {
                "createdAt": 1680293992127.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Working on it",
                "taskTitle": "Create social media integrations."
              },
              {
                "createdAt": 1680293996789.0,
                "changedBy": null,
                "changed": "status",
                "from": "Working on it",
                "to": "Stuck",
                "taskTitle": "Create social media integrations."
              },
              {
                "createdAt": 1680294038969.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-09",
                  "Apr-12"
                ],
                "taskTitle": "Create social media integrations."
              },
              {
                "createdAt": 1680294112323.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-10",
                "taskTitle": "Create social media integrations."
              }
            ]
          },
          {
            "taskTitle": "Optimize website for search engines.",
            "person": [

            ],
            "date": "Mar-14",
            "status": "Working on it",
            "priority": "Low",
            "timeline": [
              "Mar-16",
              "Apr-12"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "id": "P1qSNc",
            "activities": [
              {
                "createdAt": 1680293979856.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "High",
                "taskTitle": "Optimize website for search engines."
              },
              {
                "createdAt": 1680293982346.0,
                "changedBy": null,
                "changed": "priority",
                "from": "High",
                "to": "Low",
                "taskTitle": "Optimize website for search engines."
              },
              {
                "createdAt": 1680293989296.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Working on it",
                "taskTitle": "Optimize website for search engines."
              },
              {
                "createdAt": 1680294040841.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-16",
                  "Apr-12"
                ],
                "taskTitle": "Optimize website for search engines."
              },
              {
                "createdAt": 1680294114126.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-14",
                "taskTitle": "Optimize website for search engines."
              }
            ]
          },
          {
            "taskTitle": "Design and implement e-commerce features.",
            "person": [

            ],
            "date": "Mar-17",
            "status": "Stuck",
            "priority": "Medium",
            "timeline": [
              "Mar-09",
              "Apr-12"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "id": "zYCUlj",
            "activities": [
              {
                "createdAt": 1680293977267.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "Medium",
                "taskTitle": "Design and implement e-commerce features."
              },
              {
                "createdAt": 1680293995417.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Stuck",
                "taskTitle": "Design and implement e-commerce features."
              },
              {
                "createdAt": 1680294042563.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-09",
                  "Apr-12"
                ],
                "taskTitle": "Design and implement e-commerce features."
              },
              {
                "createdAt": 1680294115447.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-17",
                "taskTitle": "Design and implement e-commerce features."
              }
            ]
          },
          {
            "taskTitle": "Develop mobile-responsive checkout process.",
            "person": [

            ],
            "date": "Mar-08",
            "status": "Working on it",
            "priority": "Critical",
            "timeline": [
              "Mar-07",
              "Apr-11"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "id": "y0nW6I",
            "activities": [
              {
                "createdAt": 1680293983479.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "Critical",
                "taskTitle": "Develop mobile-responsive checkout process."
              },
              {
                "createdAt": 1680294000656.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Working on it",
                "taskTitle": "Develop mobile-responsive checkout process."
              },
              {
                "createdAt": 1680294044340.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-07",
                  "Apr-11"
                ],
                "taskTitle": "Develop mobile-responsive checkout process."
              },
              {
                "createdAt": 1680294116915.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-08",
                "taskTitle": "Develop mobile-responsive checkout process."
              }
            ]
          },
          {
            "taskTitle": "Track and analyze website traffic and conversions.",
            "person": [

            ],
            "date": "Mar-10",
            "status": "Done",
            "priority": "High",
            "timeline": [
              "Mar-28",
              "Apr-25"
            ],
            "files": "",
            "text": "",
            "msgs": [

            ],
            "id": "QROo2K",
            "activities": [
              {
                "createdAt": 1680293984703.0,
                "changedBy": null,
                "changed": "priority",
                "from": "",
                "to": "High",
                "taskTitle": "Track and analyze website traffic and conversions."
              },
              {
                "createdAt": 1680293998996.0,
                "changedBy": null,
                "changed": "status",
                "from": "",
                "to": "Done",
                "taskTitle": "Track and analyze website traffic and conversions."
              },
              {
                "createdAt": 1680294046493.0,
                "changedBy": null,
                "changed": "timeline",
                "from": [

                ],
                "to": [
                  "Mar-28",
                  "Apr-25"
                ],
                "taskTitle": "Track and analyze website traffic and conversions."
              },
              {
                "createdAt": 1680294118304.0,
                "changedBy": null,
                "changed": "date",
                "from": "",
                "to": "Mar-10",
                "taskTitle": "Track and analyze website traffic and conversions."
              }
            ]
          }
        ],
        "_id": "DT3z09"
      }
    ],
    "labels": {
      "status": [
        {
          "id": "101",
          "name": "Working on it",
          "color": "#fdab3d",
          "class": "status-working"
        },
        {
          "id": "102",
          "name": "Stuck",
          "color": "#e2445c",
          "class": "status-stuck"
        },
        {
          "id": "103",
          "name": "Done",
          "color": "#00c875",
          "class": "status-done"
        },
        {
          "id": "104",
          "name": "",
          "color": "#c3c4c3",
          "class": "status-empty"
        }
      ],
      "priority": [
        {
          "id": "105",
          "name": "Critical",
          "color": "#333333",
          "class": "priority-critical"
        },
        {
          "id": "106",
          "name": "High",
          "color": "#401694",
          "class": "priority-high"
        },
        {
          "id": "107",
          "name": "Medium",
          "color": "#5559df",
          "class": "priority-medium"
        },
        {
          "id": "108",
          "name": "Low",
          "color": "#579bfc",
          "class": "priority-low"
        },
        {
          "id": "109",
          "name": "",
          "color": "#c3c4c3",
          "class": "priority-empty"
        }
      ]
    },
    "owner": "64233ebc79347a439c027636"
  }

}
