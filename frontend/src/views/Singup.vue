<template>
  <section class="singup flex column ">
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
    <section class="validation">
        <h1>Set up your account</h1>
        <label for="" class="input-wrapper">
            <h2>Full name</h2>
            <input type="text" placeholder="e.g. Jane Doe">
        </label>
        <label for="" class="input-wrapper">
            <h2>Password</h2>
            <input type="text" placeholder="Enter at least 8 characters">
        </label>
        <label for="" class="input-wrapper">
            <h2>Account name</h2>
            <input type="text" placeholder="e.g. Acme Corporation">
        </label>
    </section>
        <button class="continue-btn flex align-center justify-center">
            Continue
            <div className="icon" v-html="getSvg('arrowRight')"></div>
        </button>
  </section>
</template>

<script>
import {svgService} from '../services/svg.service.js'
export default {
  name: 'Singup', 
  props: [],
components:{},
created() {},
  data() {
    return {}
  },
  methods: {
    getSvg(iconName) {
    return svgService.getSvg(iconName)
  }
  },
  computed: {},
}

</script>
