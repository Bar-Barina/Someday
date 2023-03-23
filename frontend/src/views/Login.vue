<template>
  <LoginHeader />
  <section class="login-signup">
    <h1>Log in to your account</h1>
    <div class="email-page">
      <div class="email-input">
        <label class="enter-work-email" for="user_email"
          >Enter your work email address</label
        >
        <input
          id="user_email"
          class="email-input"
          placeholder="Example@company.com"
        />
        <button>Next</button>
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
      <div>Don't have an account yet? <RouterLink :to="`/singup`"><button>Sign up</button></RouterLink></div>
    </div>
  </section>
</template>

<script>
import LoginHeader from '../cmps/LoginHeader.vue'
export default {
  name: '',
  computed: {},
  components: {
    LoginHeader,
  },
}
</script>
