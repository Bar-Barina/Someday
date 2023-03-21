<template>
  <AppHeader />
  <section class="main-home">
    <h1>
      A Platform built for a
      <br />
      new way of working
    </h1>
    <h3 class="sub-line">Manage everything with Someday.com!</h3>
    <div class="underline"></div>

    <div
      v-for="(star, index) in 17"
      :key="star"
      class="star"
      :class="`star${index + 1}`"
    ></div>
    <RouterLink :to="`/board/${firstBoard}`"
      ><button class="start-btn">
        Get Started
        <span class="arrow"
          ><div className="arrow" v-html="getSvg('arrow')"></div
        ></span></button
    ></RouterLink>
    <img
      src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured%20images/Home%20Page%20-%202022%20Rebrand/first_fold/image.png"
      alt=""
    />
  </section>
</template>

<script>
import AppHeader from '../cmps/AppHeader.vue'
import { svgService } from '../services/svg.service.js'
export default {
  name: 'Home',
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
  },
  computed: {
    firstBoard() {
      return this.$store.getters.boards[0]._id
    }
  },
  components: {
    AppHeader,
  },
}
</script>
