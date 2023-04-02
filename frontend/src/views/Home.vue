<template>
  <AppHeader />
  <section class="main-home">
    <h1>
      A platform built for a
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
        <span class="start-btn-txt">Get Started</span>
        <span class="arrow"
          ><div className="arrow" v-html="getSvg('arrow')"></div
        ></span></button
    ></RouterLink>
    <div class="unlimited">
      <span>No credit card needed</span>
      <span class="star star18"></span>
      <span>Unlimited time on Free plan</span>
    </div>
    <HomeCarousel />
    <!-- <div class="green-try-demo">Try the 
      <br>
      interactive demo 
      <p>See how easy it is to manage your work with someday.com</p>
      <button>Let's go</button>
    </div> -->
    <section></section>
  </section>
  <div class="home-footer">Trusted by 180,000+ customers worldwide</div>
  <!-- <section class="companies">
    <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/genpact.png" class="company-logo"/>
    <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/HoltCat.png" class="company-logo"/>
    <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/canva.png" class="company-logo"/>
    <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/coca_cola.png" class="company-logo" />
    <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/lionsgate.png" class="company-logo"/>
    <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/hulu.png" class="company-logo"/>
    <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/bd.png" class="company-logo"/>
    <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/glossier.png" class="company-logo"/>
    <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/universal.png" class="company-logo"/>
  </section> -->
</template>

<script>
import { onUnmounted } from 'vue'
import AppHeader from '../cmps/AppHeader.vue'
import { svgService } from '../services/svg.service.js'
import HomeCarousel from '../cmps/HomeCarousel.vue'
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
  components: {
    AppHeader,
    HomeCarousel,
  },
}
</script>
