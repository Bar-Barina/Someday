<template>
  <div class="chat-black-screen" :class="{ visible: overlayVisible }">
    <section
      v-if="task"
      class="conversation-container"
      @mouseover="overlayVisible = true"
      @mouseleave="overlayVisible = false"
    >
      <section class="app-header">
        <div class="conversation-action-wrapper">
          <RouterLink :to="`/board/${currBoard._id}`">
            <button
              class="conversation-exit-btn flex justify-center align-center btn-hover"
              @click="updateTask"
            >
              <span className="icon" v-html="getSvg('x')"></span>
            </button>
          </RouterLink>
        </div>
        <div class="conversation-title">
          <div
            contenteditable="true"
            class="editable-div"
            ref="taskTitle"
            @focusout="updateTaskTitle"
          >
            {{ task.taskTitle }}
          </div>
          <div class="conversation-img-section flex align-center">
            <div class="img-container">
              <img
                :src="
                  user
                    ? user.imgUrl
                    : 'https://cdn1.monday.com/dapulse_default_photo.png'
                "
                class="conversation-img"
              />
            </div>
            <div class="menu flex justify-center align-center btn-hover">
              <span v-html="getSvg('Dots')"></span>
            </div>
          </div>
        </div>
        <div class="up-nav flex align-center">
          <div
            class="view-option-container"
            :class="{ active: active === '' }"
            @click="changeView()"
          >
            <div class="view-option btn-hover flex align-center">
              <span class="icon" v-html="getSvg('noFillHome')"></span>
              Updates
            </div>
          </div>
          <!-- 
          <div class="view-option-container">
            <div class="view-option btn-hover flex align-center">Files</div>
          </div> -->

          <div
            class="view-option-container"
            :class="{ active: active === 'activities' }"
            @click="changeView('activities')"
          >
            <div class="view-option btn-hover flex align-center">
              Activity Log
            </div>
          </div>
        </div>
      </section>
      <section v-if="active === ''" class="bottom-chat">
        <input
          v-if="!isEditor"
          @focus="toggleIsEditor(true)"
          type="text"
          placeholder="Write an update..."
          class="editable-text"
        />
        <div v-else class="quill-editor">
          <QuillEditor
            @focusout="toggleIsEditor()"
            theme="snow"
            toolbar="essential"
            v-model:content="msg.txt"
            contentType="text"
            ref="textArea"
            placeholder="Write an update..."
            @input="onUserInput"
          />
          <small v-if="typing">{{ getTyping }}...</small>
        </div>
      </section>
      <section
        v-if="active === ''"
        class="nav-btn flex space-between align-center"
      >
        <div class="conversation-middle-nav">
          <div
            class="middle-nav-btn btn-hover flex align-center"
            @click.stop="emojiPick"
          >
            <span v-html="getSvg('emoji')"></span>
            <div>Emoji</div>
          </div>
          <EmojiPicker
            v-clickOutside="closeEmojiPick"
            v-if="isEmoji"
            :native="true"
            @select="onSelectEmoji"
            class="emoji-picker"
          />
        </div>
        <button class="update-btn" @click.stop="addMsg">Update</button>
      </section>
      <section v-if="task.msgs.length > 0 && active === ''" class="task-msgs">
        <MsgPreview
          v-for="msg in task.msgs"
          :key="msg"
          :msg="msg"
          @updateTask="updateTask"
        />
      </section>
      <section v-if="task.msgs.length === 0 && active === ''">
        <img
          src="https://cdn.monday.com/images/pulse-page-empty-state.svg"
          class="hands"
        />
        <h2>No updates yet for this item</h2>
        <p>
          Be the first one to update about progress, mention someone or upload
          files to share with your team members
        </p>
      </section>
      <section v-if="active === 'activities'" class="task-activities">
        <Activity :task="this.task" />
      </section>
    </section>
  </div>
</template>

<script>
import {
  socketService,
  SOCKET_EMIT_SEND_MSG,
  SOCKET_EMIT_ADD_MSG,
  SOCKET_EMIT_SET_TOPIC,
  SOCKET_EVENT_TYPING,
} from '../services/socket.service'
import { svgService } from '../services/svg.service.js'
import MsgPreview from './MsgPreview.vue'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { clickOutside } from '../directives.js'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { userService } from '../services/user.service'
import { utilService } from '../services/util.service.js'
import Activity from '../cmps/Activity.vue'

export default {
  name: 'TaskDetails',
  data() {
    return {
      active: '',
      task: null,
      isEmoji: false,
      msg: {
        txt: '',
        from: null,
        liked: [],
      },
      textArea: '',
      overlayVisible: false,
      isEditor: false,
      typing: '',
      msgs: [],
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    updateTaskTitle() {
      this.task.taskTitle = this.$refs.taskTitle.innerText
      this.group.tasks.splice(this.taskIdx, 1, this.task)
      this.updateTask()
    },
    addMsg() {
      console.log('adding')
      const user = userService.getLoggedInUser()
      const from = user || {
        accountName: 'Guest',
        imgUrl: 'https://cdn1.monday.com/dapulse_default_photo.png',
      }

      this.msg.from = from
      this.msg.txt = this.$refs.textArea.getHTML()
      this.msg.createdAt = Date.now()
      // this.msg.txt = content.getHTML();
      // if(this.msg.txt!== "") this.msg.txt.
      socketService.emit(SOCKET_EMIT_SEND_MSG, this.msg)
      const msgToAdd = { ...this.msg }
      this.task.msgs.unshift(msgToAdd)
      this.group.tasks.splice(this.taskIdx, 1, this.task)
      this.updateTask()
      // this.$refs.textArea.innerText = "";
      this.msg.txt = ''
      this.msg.from = ''
      this.msg.createdAt = ''
    },
    updateTask() {
      const toUpdate = { group: this.group, task: this.task }
      console.log('toUpdate', toUpdate)
      this.$store.dispatch({ type: 'saveTask', toUpdate })
      this.msg.txt = ''
    },
    emojiPick() {
      this.isEmoji = !this.isEmoji
    },
    onSelectEmoji(emoji) {
      this.msg.txt += emoji.i
      // this.$refs.textArea.innerText += emoji.i
      // this.$refs.textArea.getText() += emoji.i
    },
    closeEmojiPick() {
      this.isEmoji = false
    },
    updateContent() {
      // this.textArea = this.$refs.textArea.innerHTML
    },
    toggleIsEditor(value = false) {
      console.log('this.msg.txt', this.msg.txt)
      if (this.msg.txt.length > 1 || value) {
        console.log('true')
        this.isEditor = true
      } else {
        this.isEditor = value
      }
    },
    closeChat() {
      this.$router.push(`/board/${this.currBoard._id}`)
    },
    onUserInput() {
      let user = userService.getLoggedInUser()
      if (!user) socketService.emit('user-typing', '')
      else socketService.emit('user-typing', user._id)
      this.onUserStopInputDeb()
    },
    onUserStopInput() {
      console.log('stop typing:')
      socketService.emit('user-typing', '')
    },
    renderTyping(msg) {
      this.typing = msg
    },
    changeTopic() {
      socketService.emit(SOCKET_EMIT_SET_TOPIC, this.topic)
    },
    recieveMsg(msg) {
      console.log('recieve msg', msg)
      this.task.msgs.unshift(msg)
    },
    changeView(view = '') {
      this.active = view
    },
  },
  watch: {
    '$route.params': {
      async handler() {
        const { taskId } = this.$route.params
        if (!taskId) return
        this.group = JSON.parse(JSON.stringify(this.currGroup))
        this.task = JSON.parse(
          JSON.stringify(this.group.tasks.find((t) => t.id === taskId))
        )
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
      return this.group.tasks.findIndex((t) => t.id === this.task.id)
    },
    openTextArea() {
      return this.msg.txt !== ''
      // return this.$refs.textArea.innerText !== ''
    },
    getTyping() {
      return this.typing
    },
    user() {
      return userService.getLoggedInUser()
    },
  },
  created() {
    socketService.emit(SOCKET_EMIT_SET_TOPIC, this.task.id)
    socketService.on(SOCKET_EMIT_SEND_MSG, this.addMsg)
    socketService.on(SOCKET_EMIT_ADD_MSG, this.recieveMsg)
    socketService.on(SOCKET_EVENT_TYPING, this.renderTyping)
    // socketService.on(SOCKET_EVENT_ADD_MSGS, msgs => msgs.forEach(this.addMsg))
    this.onUserStopInputDeb = utilService.debounce(this.onUserStopInput, 800)
  },
  destroyed() {
    console.log('destroyed')
    socketService.off(SOCKET_EMIT_SEND_MSG, this.addMsg)
  },
  components: {
    MsgPreview,
    EmojiPicker,
    QuillEditor,
    Activity,
  },
}
</script>
