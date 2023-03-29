// import { storageService } from './async-storage.service'
import { socketService} from './socket.service'
import { httpService } from './http.service'
import { store } from '../store/store'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
import { showSuccessMsg } from './event-bus.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedInUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
}

window.userService = userService

function getUsers() {
  // return storageService.query('user')
  return httpService.get(`user`)
}

function onUserUpdate(user) {
  showSuccessMsg(
    `This user ${user.fullname} just got updated from socket, new score: ${user.score}`
  )
  store.dispatch({ type: 'setWatchedUser', user })
}

async function getById(userId) {
  // const user = await storageService.get('user', userId)
  const user = await httpService.get(`user/${userId}`)

  socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
  socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
  socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

  return user
}
function remove(userId) {
  // return storageService.remove('user', userId)
  return httpService.delete(`user/${userId}`)
}

async function update({ _id }) {
  // const user = await storageService.get('user', _id)
  let user = getById(_id)
  // await storageService.put('user', user)
  user = await httpService.put(`user/${user._id}`, user)
  // Handle case in which admin updates other user's details
  if (getLoggedInUser()._id === user._id) saveLocalUser(user)
  return user
}

async function login(userCred) {
   console.log('from service',userCred)
  // const users = await storageService.query('user')
  // const user = users.find(user => user.email === userCred.email)
  const user = await httpService.post('auth/login', userCred)
  if (user) {
    socketService.login(user._id)
    return saveLocalUser(user)
  }
}
async function signup(userCred) {
  console.log('service')
  if (!userCred.imgUrl)
    userCred.imgUrl ='https://cdn1.monday.com/dapulse_default_photo.png'
  // const user = await storageService.post('user', userCred)
  const user = await httpService.post('auth/signup', userCred)
  socketService.login(user._id)
  return saveLocalUser(user)
}
async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  // socketService.logout()
  return await httpService.post('auth/logout')
}

// async function changeScore(by) {
//   const user = getLoggedInUser()
//   if (!user) throw new Error('Not loggedin')
//   user.score = user.score + by || by
//   await update(user)
//   return user.score
// }

function saveLocalUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
    email: user.email,
    accountName : user.accountName
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedInUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()
