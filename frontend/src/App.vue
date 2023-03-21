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
    const user = userService.getLoggedinUser()
    if (user)  store.commit({type: 'setLoggedinUser', user})
  },
  components: {
    UserMsg
  },
}
</script>