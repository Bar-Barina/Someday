<template>
  <section class="email-signup-container" v-if="!isSignUpOpen">
    <section class="email-signup">
      <RouterLink to="/login">Back</RouterLink>
  <h1>Welcome to someday.com</h1>
  <p>Get started - it's free. No credit card needed.</p>
  <div class="google-btn-div">
    <button class="google-btn">
      <img src="https://cdn.monday.com/images/logo_google_v2.svg" />
      Continue with Google
  </button>
</div>
  <div class="email-line flex">
    <div class="empty-line"></div>
    <span class="or-span">Or</span>
    <div class="empty-line"></div>
  </div>
  <label for="" class="input-wrapper">
        <input type="email" placeholder="name@company.com"
        v-model="signupCred.email" />
      </label>
      <br>
          <button class="continue" @click="isSignUpOpen = !isSignUpOpen">Continue</button>
          <div class="login-route">
              <span>Already have an account?</span>
              <RouterLink to="/login">
                  <span class="login-route-span">Log in</span>
                </RouterLink>
            </div>
        </section>
        <div class="email-board-img">
            <img src="../assets/img/boardEmail.png" class="board-img"/>
            <img src="../assets/img/imgShadow.png" class="board-img-shadow"/>
        </div>
    </section>
    <Signup v-if="isSignUpOpen" :signupCred="signupCred"/>

</template>

<script>
// import { eventBus } from '../services/event-bus.service'
import Signup from './Signup.vue';
export default {
name: '',
data() {
    return {
      signupCred: { accountName: '', password: '', fullname: '', email:'',imgUrl: '' },
      isSignUpOpen: false
    }
  },
methods: {
    // doSignup() {
    //     console.log('from email',this.signupCred.email)
    //     eventBus.emit("doSignup", this.signupCred.email);
    // }
},
computed: {

},
created() {

},
components: {
    Signup,
},
}
</script>

<style>

</style>