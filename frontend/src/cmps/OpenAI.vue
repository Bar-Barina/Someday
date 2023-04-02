<template>
  <section class="openai-container">
    <div class="chat-container">
      <div class="msg">
        <span class="title">AI:</span><span>{{ msg }}</span>
      </div>
      <div class="msg">
        <span v-if="res" class="title">Me:</span><span>{{ res }}</span>
      </div>
      <div class="msg">
        <span v-if="typing" class="title">AI:</span><span>{{ typing }}</span>
      </div>
      <div class="send-section flex align-center">
      <input class="open-ai-input" type="text" placeholder="Write your subject" v-model="txt" />
      <span class="send" v-icon="'sendOpenAI'" @click="sendQ"></span>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { boardService } from '../services/board.service';

export default {
  data() {
    return {
      txt: "",
      res: "",
      msg: "What is your board subject?",
      isLoading: false,
      typing: ''
    };
  },
  methods: {
    async sendQ() {
      this.res = this.txt;
      this.txt = ''
      this.isLoading = true;
      this.typing = "Typing..."
      const url = "http://localhost:3030/api/openai";
      let res = await axios.post(url, { message: this.res });
      if(res.data.message.length < 100) {
        this.msg = res.data.message
        return
      }
      res = JSON.parse(res.data.message)
      const boardToCreate = this.createBoard(res)
      const board = await this.$store.dispatch({type: 'addBoard' , board: boardToCreate})
      this.$emit('AIboard' , board)
      this.closeAI()
    },
    createBoard(res) {
      const taskAI = boardService.getEmptyTask()
      delete taskAI.taskTitle
      res.groups.forEach(group => {
        group.tasks.forEach(task => {
          Object.assign(task , taskAI)
        })
      })
      res.labels = boardService.getDefaultLabels()
      return res
    },
    closeAI() {
      this.$emit('closeAI')
    }
  },
  computed: {
    message() {
      return this.res;
    },
  },
  components: {
  }
};
</script>
