<template>
  <section v-if="task" class="conversation-container">
    <div class="conversation-action-wrapper">
      <RouterLink :to="`/board/${currBoard._id}`">
      <button class="conversation-exit-btn flex justify-center align-center btn-hover">
         <span className="icon" v-html="getSvg('x')"></span>
         </button>
      </RouterLink>
    </div>
    <div class="conversation-title">
      <div contenteditable="true" class="editable-div" ref="taskTitle" @focusout="updateTaskTitle">{{ task.taskTitle }}</div>
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
    <input v-model="msg.txt" placeholder="Write an update..." />
    </section>
    <section class="nav-btn flex space-between align-center">
      <div class="conversation-middle-nav">
        <div class="middle-nav-btn btn-hover flex align-center">
          <span v-html="getSvg('emoji')"></span>
          <div>Emoji</div> 
       </div> 
        </div>
      <button class="update-btn" @click="addMsg">Update</button>
    </section>
    <section v-if="task.msgs.length>0" class="task-msgs">
        <MsgPreview v-for="msg in task.msgs" :key="msg" :msg="msg"/>
    </section>
    <section v-else>
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
import MsgPreview from './MsgPreview.vue'
export default {
  name: '',
  data() {
    return {
      active:'',
      task:null,
      msg:{
        txt:'',
        from:'guest'
      }
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    updateTaskTitle() {
      this.task.taskTitle = this.$refs.taskTitle.innerText
      this.group.tasks.splice(this.taskIdx,1,this.task)
      this.updateTask()
    },
    addMsg() {
      const msgToAdd ={...this.msg}
      console.log('msgToAdd',msgToAdd)
      this.task.msgs.unshift(msgToAdd)
      this.group.tasks.splice(this.taskIdx,1,this.task)
      this.updateTask()
    },
    updateTask() {
      const toUpdate = {group:this.group, task:this.task}
      this.$store.dispatch({type:'saveTask', toUpdate})
      this.msg.txt = ''
    }
  },
  watch: {
    '$route.params': {
      async handler() {
        const { taskId } = this.$route.params
        if(!taskId) return
          this.group = JSON.parse(JSON.stringify(this.currGroup))
          this.task = JSON.parse(JSON.stringify(this.group.tasks.find(t=>t.id === taskId)))
      },
      immediate: true,
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    currGroup() {
      return this.$store.getters.currGroup
    },
    taskIdx() {
      return this.group.tasks.findIndex(t=>t.id===this.task.id)
    }
  },
  created() {},
  components: {
    MsgPreview,
  },
}
</script>

