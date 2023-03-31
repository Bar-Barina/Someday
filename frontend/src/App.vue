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
import { boardService } from './services/board.service'


export default {

  created() {
    const boards = this.$store.dispatch({ type: "loadBoards" });
    this.$store.dispatch({type:'loadUsers'})
    // if(!boards) {
    //   const demoBoard = boardService.getDemoBoard()
    //   this.$store.commit({type: 'setBoards' , boards: [demoBoard]})
    //   this.$store.commit({type: 'setCurrBoard', demoBoard})
    // }
    const user = userService.getLoggedInUser()
    if (user)  store.commit({type: 'setLoggedInUser', user})
  },
  components: {
    UserMsg
  },
}
</script>