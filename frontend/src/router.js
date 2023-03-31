import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import BoardIndex from './views/BoardIndex.vue'
import Kanban from './cmps/Kanban.vue'
import MainTable from './cmps/MainTable.vue'
// import LoginSignup from './views/LoginSignup.vue'
import Login from './views/Login.vue'
import TaskDetails from './cmps/TaskDetails.vue'
import Dashboard from './cmps/Dashboard.vue'
import Signup from './views/Signup.vue'
import EmailSignup from './views/EmailSignup.vue'
import OpenAI from './cmps/OpenAI.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/board',
    name: 'board',
    component: BoardIndex,
    children: [
      {
        name: 'table',
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
        name: 'kanban',
        path: ':boardId/kanban',
        component: Kanban,
        // children: [
        //   {
        //     path: 'taskDetails/:taskId',
        //     name: 'taskDetails',
        //     component: TaskDetails
        //   },
        // ]
      },
      {
        name: 'dashboard',
        path: ':boardId/dashboard',
        component: Dashboard
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/emailsignup',
    name: 'EmailSignup',
    component: EmailSignup
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/openai',
    name: 'Openai',
    component: OpenAI 
  },
  // {
  //   path: '/LoginSignup',
  //   name: 'LoginSignup',
  //   component: LoginSignup
  // },
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

