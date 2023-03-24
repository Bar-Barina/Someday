<template>
  <section class="conversation-container">
    <div class="conversation-action-wrapper">
      <RouterLink :to="`/board/${currBoard._id}`">
      <button class="conversation-exit-btn flex justify-center align-center btn-hover">
         <span className="icon" v-html="getSvg('x')"></span>
         </button>
      </RouterLink>
    </div>
    <div class="conversation-title">
      <div contenteditable="true" class="editable-div">{{ currTask.taskTitle }}</div>
      <div class="conversation-img-section flex align-center">
        <div class="img-container">
        <img src="../assets/img/profile-icon.png" class="conversation-img" /> 
        </div>
        <div class="menu flex justify-center align-center btn-hover">
        <span v-html="getSvg('Dots')"></span>
        </div>
      </div>
    </div>
    <div class="up-nav flex align-center">
      <div class="view-option-container" :class="{ active: active === '' }">
        <div class="view-option btn-hover flex align-center">
        <span class="icon" v-html="getSvg('noFillHome')"></span>
        Updates
        </div>
        </div> 
      
      <div class="view-option-container">
        <div class="view-option btn-hover flex align-center">
        Files
        </div>
        </div> 
      
      <div class="view-option-container">
        <div class="view-option btn-hover flex align-center">
          Activity Log
        </div>
        </div>       
    </div>
    <section class="bottom-chat">
    <input placeholder="Write an update..." />
    </section>
    <section class="nav-btn flex space-between align-center">
      <div class="conversation-middle-nav">
        <div class="middle-nav-btn btn-hover flex align-center">
          <span v-html="getSvg('emoji')"></span>
          <div>Emoji</div> 
       </div> 
        </div>
      <button class="update-btn">Update</button>
    </section>
    <section>
    <img
      src="https://cdn.monday.com/images/pulse-page-empty-state.svg"
      class="hands"
    />
    <h2>No updates yet for this item</h2>
    <p>
      Be the first one to update about progress, mention someone or upload files
      to share with your team members
    </p>
    </section>
  </section>
</template>

<script>
import { svgService } from '../services/svg.service.js'
export default {
  name: '',
  data() {
    return {
      active:''
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
  },
  // watch: {
  //   '$route.params': {
  //     async handler() {
  //       const { taskId } = this.$route.params
  //       if(!taskId) return
  //       try {
  //         const task = await this.$store.dispatch({type:'getTaskById', taskId})

  //       } catch(err) {
  //         throw new Error(err)
  //       }
  //       // this.$store.dispatch({type:'loadReviews',filterBy:{toyId}})
  //     },
  //     immediate: true,
  //   },
  // }
  computed: {
    currTask() {
      return this.$store.getters.currBoard.groups[0].tasks[0]
    },
    currBoard() {
      return this.$store.getters.currBoard
    }
  },
  created() {},
  components: {},
}
</script>

