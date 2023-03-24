<template>
  <section class="conversation-container">
    <div class="conversation-action-wrapper">
      <button class="conversation-exit-btn flex justify-center align-center hover-btn">X</button>
    </div>
    <div class="conversation-title">
      <h3>Item 1</h3>
      <div class="conversation-img-section">
        <img src="../assets/img/profile-icon.png" class="conversation-img" /> |
        <span v-html="getSvg('Dots')"></span>
      </div>
    </div>
    <div class="conversation-up-nav">
      <span><span v-html="getSvg('noFillHome')"></span>Updates</span> |
      <span>Files</span> | <span>Activity Log</span> |
      <hr>
    </div>
    <input placeholder="Write an update..." />
    <section class="nav-btn flex space-between align-center">
      <div class="conversation-middle-nav">
       <span>Emoji</span> 
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
    }
  },
  created() {},
  components: {},
}
</script>

