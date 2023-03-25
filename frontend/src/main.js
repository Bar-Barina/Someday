import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
// import { setDefaultProps } from 'vue-tippy'

// setDefaultProps({
//   placement: 'right',
//   appendTo: 'parent',
//   arrow: true,
// })

import { clickOutside, icon } from './directives.js'

import './assets/styles/styles.scss'
import App from './App.vue'

const app = createApp(App)

app.directive('icon', icon)
app.directive('clickOutside', clickOutside)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(VueTippy, {
  directive: 'tippy', // => v-tippy
  defaultProps: {
    placement: 'right',
    appendTo: 'parent',
    arrow: true,
  },
})

app.mount('#app')
