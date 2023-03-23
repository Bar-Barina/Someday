import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import Chat from './views/Chat.vue'
import ReviewIndex from './views/ReviewIndex.vue'
import BoardIndex from './views/BoardIndex.vue'
import Kanban from './cmps/Kanban.vue'
import MainTable from './cmps/MainTable.vue'
// import LoginSignup from './views/LoginSignup.vue'
import Login from './views/Login.vue'
import UserDetails from './views/UserDetails.vue'
import TaskDetails from './cmps/TaskDetails.vue'
import Dashboard from './cmps/Dashboard.vue'
import Singup from './views/Singup.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/board',
    redirect: '/board',
    name: 'board',
    component: BoardIndex,
    children: [
      {
        path: ':boardId',
        component: MainTable,
        children: [
          {
            path: 'taskDetails/:taskId',
            name: 'taskDetails',
            component: TaskDetails
          },
        ]
      },
      {
        path: ':boardId/kanban',
        component: Kanban
      },
      {
        path: ':boardId/dashboard',
        component: Dashboard
      },
    ]
  },
  // {
  //   path: '/review',
  //   name: 'ReviewIndex',
  //   component: ReviewIndex
  // },
  // {
  //   path: '/chat',
  //   name: 'Chat',
  //   component: Chat
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/singup',
    name: 'Singup',
    component: Singup
  },
  // {
  //   path: '/user/:id',
  //   name: 'UserDetails',
  //   component: UserDetails
  // }
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

