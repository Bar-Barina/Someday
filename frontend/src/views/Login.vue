<template>
  <LoginHeader />
  <div v-if="loggedInUser" class="logged-in">
    <h3>
      Get things done,
      {{ loggedInUser.fullname }} !
      <br />
    </h3>
    <button @click="doLogout" class="logout">Logout</button>
    <!-- <RouterLink to="/board">
      <button @click="doLogout">Get your first board right NOW!</button>
    </RouterLink> -->
  </div>
  <div v-else></div>
  <section v-else>
    <div class="login-signup">
      <h1>Log in to your account</h1>
      <div class="email-page">
        <div class="email-input">
          <label class="enter-work-email" for="user_email"
            >Enter your work email address</label
          >
          <form @submit.prevent="doLogin">
            <input
              type="email"
              v-model="email"
              class="email-input"
              placeholder="Example@company.com"
            />
            <input
              type="password"
              v-model="password"
              class="email-input"
              placeholder="Password"
            />
            <button>
              Next
              <span v-icon="'arrowRightLogin'" class="arrow-right-login"></span>
            </button>
          </form>
        </div>
      </div>
      <div class="sign-with">
        <span class="separator-line"></span>
        <h2>Or Sign in with</h2>
        <span class="separator-line"></span>
      </div>
      <button class="google">
        <img src="https://cdn.monday.com/images/logo_google_v2.svg" />Google
      </button>
      <div class="suggest-signup">
        <div>
          Don't have an account yet?
          <RouterLink :to="`/emailsignup`"><button>Sign up</button></RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Range } from 'quill'
import LoginHeader from '../cmps/LoginHeader.vue'
export default {
  data() {
    return {
      msg: '',
      isLogin: false,
      userName: '',
      password: '',
      fullName: '',
      email: '',
    }
  },
  created() {
    this.loadUsers()
  },
  methods: {
    doLogin() {
      let credentials = {
        email: this.email,
        password: this.password,
      }
      this.$store.dispatch({ type: 'login', userCred: credentials })
      if (this.loggedInUser) this.$router.push({ path: '/board' })
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    loadUsers() {
      this.$store.dispatch({ type: 'loadUsers' })
    },
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
  },
  components: {
    LoginHeader,
    Range,
  },
}
</script>
