<template>
  <section
    v-if="task"
    class="conversation-container"
    @mouseover="overlayVisible = true"
    @mouseleave="overlayVisible = false"
  >
    <div class="chat-black-screen" :class="{ visible: overlayVisible }"></div>
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
              src="../assets/img/profile-icon.png"
              class="conversation-img"
            />
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
          <div class="view-option btn-hover flex align-center">Files</div>
        </div>

        <div class="view-option-container">
          <div class="view-option btn-hover flex align-center">
            Activity Log
          </div>
        </div>
      </div>
    </section>
    <section class="bottom-chat">
      <!-- <div
        @input="updateContent"
        ref="textArea"
        class="editable-text"
        :class="{ open: openTextArea }"
        placeholder="Write an update..."
        contenteditable="true"
      ></div> -->
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
          ref="textArea"
          contentType="text"
          required
          placeholder="Write an update..."
        />
      </div>
    </section>
    <section class="nav-btn flex space-between align-center">
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
    <section v-if="task.msgs.length > 0" class="task-msgs">
      <MsgPreview
        v-for="msg in task.msgs"
        :key="msg"
        :msg="msg"
        @updateTask="updateTask"
      />
    </section>
    <section v-else>
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
  </section>
</template>

<script>
import { svgService } from "../services/svg.service.js";
import MsgPreview from "./MsgPreview.vue";
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";
import { clickOutside } from "../directives.js";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  name: "TaskDetails",
  data() {
    return {
      active: "",
      task: null,
      isEmoji: false,
      msg: {
        txt: "",
        from: "guest",
        liked: [],
      },
      textArea: "",
      overlayVisible: false,
      isEditor: false,
    };
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    updateTaskTitle() {
      this.task.taskTitle = this.$refs.taskTitle.innerText;
      this.group.tasks.splice(this.taskIdx, 1, this.task);
      this.updateTask();
    },
    addMsg() {
      this.msg.txt = this.$refs.textArea.innerHTML;
      // if(this.msg.txt!== "") this.msg.txt.
      const msgToAdd = { ...this.msg };
      this.task.msgs.unshift(msgToAdd);
      this.group.tasks.splice(this.taskIdx, 1, this.task);
      this.updateTask();
      this.$refs.textArea.innerText = "";
      this.msg.txt = "";
    },
    updateTask() {
      const toUpdate = { group: this.group, task: this.task };
      this.$store.dispatch({ type: "saveTask", toUpdate });
      this.msg.txt = "";
    },
    emojiPick() {
      this.isEmoji = !this.isEmoji;
    },
    onSelectEmoji(emoji) {
      // this.msg.txt += emoji.i
      this.$refs.textArea.innerText += emoji;
    },
    closeEmojiPick() {
      this.isEmoji = false;
    },
    updateContent() {
      // this.textArea = this.$refs.textArea.innerHTML
    },
    toggleIsEditor(value = false) {
      if (this.msg.txt.length > 1) {
        this.isEditor = true;
      } else {
        this.isEditor = value;
      }
    },
  },
  watch: {
    "$route.params": {
      async handler() {
        const { taskId } = this.$route.params;
        if (!taskId) return;
        this.group = JSON.parse(JSON.stringify(this.currGroup));
        this.task = JSON.parse(
          JSON.stringify(this.group.tasks.find((t) => t.id === taskId))
        );
      },
      immediate: true,
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
    currGroup() {
      return this.$store.getters.currGroup;
    },
    taskIdx() {
      return this.group.tasks.findIndex((t) => t.id === this.task.id);
    },
    openTextArea() {
      // return this.msg.txt !== ''
      // return this.$refs.textArea.innerText !== ''
    },
  },
  created() {},
  components: {
    MsgPreview,
    EmojiPicker,
    QuillEditor,
  },
};
</script>
