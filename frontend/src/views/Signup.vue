<template>
  <section class="signup">
    <section class="setup">
      <!-- <RouterLink to="/login">Back</RouterLink> -->
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

      <label @drop.prevent="handleFile" @dragover.prevent>
        <img class="photo-input" :src="img" alt="" />
        <input type="file" @change="handleFile" hidden />
      </label>

      <form @submit.prevent="doSignup" class="validation">
        <label class="input-wrapper">
          <h2>Full name</h2>
          <input
            type="text"
            placeholder="e.g. Jane Doe"
            v-model="this.signupCred.fullname"
          />
        </label>
        <label for="" class="input-wrapper">
          <h2>Password</h2>
          <input
            type="text"
            placeholder="Enter at least 8 characters"
            v-model="this.signupCred.password"
          />
        </label>
        <label for="" class="input-wrapper">
          <h2>Account name</h2>
          <input
            type="text"
            placeholder="e.g. Acme Corporation"
            v-model="this.signupCred.accountName"
          />
        </label>
        <button class="continue-btn flex align-center justify-center">
          Continue
          <div className="icon" v-html="getSvg('arrowRight')"></div>
        </button>
      </form>
    </section>
    <img src="../assets/img/signup-hand.png" />
  </section>
</template>

<script>
import { svgService } from "../services/svg.service.js";
import { uploadImg } from "../services/upload.service.js";
export default {
  props: {
    signupCred: Object,
  },
  name: "Signup",
  data() {
    return {
      signUpCred: this.signupCred,
    };
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    doSignup() {
      if (
        !this.signUpCred.fullname ||
        !this.signUpCred.password ||
        !this.signUpCred.accountName ||
        !this.signUpCred.email
      ) {
        this.msg = "Please fill up the form";
        return;
      }
      console.log("signing");
      this.$store.dispatch({ type: "signup", userCred: this.signUpCred });
      this.$router.push("/login");
    },
    async handleFile(ev) {
      console.log("ev", ev);
      const file =
        ev.type === "change" ? ev.target.files[0] : ev.dataTransfer.files[0];
      const { url } = await uploadImg(file);
      console.log('url',url)
      this.signUpCred.imgUrl = url;
      console.log('this.signupCred',this.signupCred)
    },
  },
  computed: {
    img() {
      return this.signUpCred.imgUrl
        ? this.signUpCred.imgUrl
        : "src/assets/img/user-upload-img.png";
    },
  },
};
</script>
