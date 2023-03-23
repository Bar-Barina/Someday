<template>
  <section>
    <RouterView/>
    <UserMsg/>
  </section>
</template>

<script>


import { userService } from './services/user.service'
import { store } from './store/store'

import UserMsg from './cmps/UserMsg.vue'


export default {

  created() {
    this.$store.dispatch({ type: "loadBoards" });
    const user = userService.getLoggedInUser()
    if (user)  store.commit({type: 'setLoggedInUser', user})
  },
  components: {
    UserMsg
  },
}
</script>