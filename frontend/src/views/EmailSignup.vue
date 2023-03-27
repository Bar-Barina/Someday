<template>
<section class="email-signup-container">
    <section class="email-signup">
  <h1>Welcome to someday.com</h1>
  <p>Get started - it's free. No credit card needed.</p>
  <button class="google-btn">Continue with Google</button>
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
      <RouterLink to="/signup">
        <button class="continue">Continue</button>
    </RouterLink>
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

</template>

<script>
// import { eventBus } from '../services/event-bus.service'
export default {
name: '',
data() {
    return {
      signupCred: { accountName: '', password: '', fullname: '', email:'',imgUrl: '' },
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

},
}
</script>

<style>

</style>