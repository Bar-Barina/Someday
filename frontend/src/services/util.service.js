export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  applyDrag,
  getRandomColor,
  getRandomStatus,
  getRandomPriority,
}

function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function applyDrag(arr, dragResult) {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) return arr
  const result = [...arr]
  let itemToAdd = payload
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }
  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }
  return result
}

function getRandomColor() {
  const colors = [
    '#037f4c',
    '#00c875',
    '#9cd326',
    '#cab641',
    '#ffcb00',
    '#784bd1',
    '#a25ddc',
    '#0086c0',
    '#66ccff',
    '#bb3354',
    '#e2445c',
    '#ff158a',
    '#ff5ac4',
    '#ff642e',
    '#fdab3d',
    '#7f5347',
    '#c4c4c4',
    '#808080',
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#9e9e9e',
    '#607d8b',
    '#2d3b49',
    '#6d4c41',
    '#c679e3',
    '#f06292',
    '#f4511e',
    '#d81b60',
    '#00bfa5',
    '#64b5f6',
    '#1e88e5',
    '#0d47a1',
    '#00acc1',
    '#7b1fa2',
    '#4527a0',
    '#6a1b9a',
    '#5d4037',
    '#424242',
    '#546e7a',
    '#ef6c00',
    '#d84315',
    '#2e7d32',
    '#006064',
    '#3e2723',
    '#827717',
    '#f57f17',
    '#e65100',
    '#bf360c'
  ]
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  return randomColor
}

function getRandomStatus() {
  const statuses = [
    'New',
    'In Progress',
    'On Hold',
    'Cancelled',
    'Completed',
    'Pending',
    'Approved',
    'Rejected',
    'Under Review',
    'Draft',
    'Scheduled',
    'Waiting',
    'Delayed',
    'Error',
    'Resolved',
    'In Review',
    'In Testing',
    'In Design',
    'In Development',
    'In Production',
    'On Track',
    'Overdue',
    'Deferred',
    'Reopened',
    'Resolved with Changes',
    'Blocked',
    'Closed',
    'Duplicate',
    'Verified',
    'Rejected with Feedback',
    'Rejected with No Feedback'

  ]
  const randomIndex = Math.floor(Math.random() * statuses.length)
  return statuses[randomIndex]
}

function getRandomPriority() {
  const priorities = [
    'High',
    'Medium',
    'Low',
    'Urgent',
    'Critical',
    'Immediate',
    'Important',
    'Minor',
    'Major',
    'Top',
    'Bottom',
    'Emergency',
    'Serious',
    'Critical',
    'Normal',
    'Lowest',
    'Highest',
    'Extreme',
    'Essential',
    'Non-essential',
    'Very High',
    'Very Low',
    'Critical High',
    'Critical Low',
    'Important High',
    'Important Low',
    'Non-Urgent',
    'Rush',
    'Mission-Critical',
    'Critical Urgency',
    'High Priority',
    'Low Priority',
    'Essential High',
    'Essential Low',
    'Routine',
    'Out of Scope',
    'On Hold High',
    'On Hold Low',
    'Minor Urgency',
    'Major Urgency',
    'Super High'
  ]
  const randomIndex = Math.floor(Math.random() * priorities.length)
  return priorities[randomIndex]
}
