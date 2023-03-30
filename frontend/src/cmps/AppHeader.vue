<template>
  <header class="home-page-header">
    <div class="home-logo">
      <img
        src="https://res.cloudinary.com/boaz-sunday-proj/image/upload/v1670843553/l37uhxjpyxwwaxw6ifnp.png"
        alt="logo"
      />
      <span class="logo-name"
        >Someday
        <span class="logo-at">.com</span>
      </span>
    </div>
    <section class="header-login-started flex align-center">
      <router-link to="/Login">
        <button class="login">Log in</button>
      </router-link>
      <RouterLink :to="`/board/${firstBoard}`"
        ><button class="start-btn">
          Get Started
          <span class="arrow"
            ><div className="arrow" v-html="getSvg('arrow')"></div
          ></span></button
      ></RouterLink>
    </section>
  </header>
</template>

<script>
import { onUnmounted } from 'vue'
import { svgService } from '../services/svg.service.js'
export default {
  name: 'Home',
  setup() {
    onUnmounted(() => {
      console.log('Component unmounted')
    })
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
  },
  computed: {
    firstBoard() {
      return this.$store.getters.boards[0]._id
    },
  },
}
</script>
