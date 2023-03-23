import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {clickOutside , icon} from './directives.js'
// import Popper from "vue3-popper";

import './assets/styles/styles.scss'
import App from './App.vue'

const app = createApp(App)

// app.component("Popper", Popper);
app.directive('icon' , icon)
app.directive('clickOutside' , clickOutside)
app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')
