<template>
  <section class="signup">
    <section class="setup">
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
      <h1>Set up your account</h1>
      <form @submit.prevent="doSignup" class="validation">
      <label class="input-wrapper">
        <h2>Full name</h2>
        <input type="text" placeholder="e.g. Jane Doe"
        v-model="signupCred.fullname" />
      </label>
      <label for="" class="input-wrapper">
        <h2>Password</h2>
        <input type="text" placeholder="Enter at least 8 characters"
        v-model="signupCred.password" />
      </label>
      <label for="" class="input-wrapper">
        <h2>Account name</h2>
        <input type="text" placeholder="e.g. Acme Corporation"
        v-model="signupCred.accountName" />
      </label>
      <label for="" class="input-wrapper">
        <h2>Email</h2>
        <input type="email" placeholder="name@company.com"
        v-model="signupCred.email" />
      </label>
    <!-- </section> -->
    <button class="continue-btn flex align-center justify-center">
      Continue
      <div className="icon" v-html="getSvg('arrowRight')"></div>
    </button>
  </form>
</section>
<img src="../assets/img/signup-hand.png">
</section>
</template>

<script>
import { svgService } from '../services/svg.service.js'
import { eventBus } from '../services/event-bus.service'
export default {
  name: 'Signup',
  created() {
    eventBus.on('doSignup', (email) => {
      console.log('from signup',email)
      this.signupCred.email = email
      console.log('from signup',this.signupCred.email)
    })
  },
  data() {
    return {
      signupCred: { accountName: '', password: '', fullname: '', email:'',imgUrl: '' },
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    async doSignup() {
      if (
        !this.signupCred.fullname ||
        !this.signupCred.password ||
        !this.signupCred.accountName ||
        !this.signupCred.email
      ) {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
      this.$router.push('/')
    },
  },
}
</script>
