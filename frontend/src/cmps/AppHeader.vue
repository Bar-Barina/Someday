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
    <router-link to="/login">
      <button class="login">Login / Signup</button>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  components: {},
}
</script>
