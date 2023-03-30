<template>
  <section class="openai-container">
    <h5>Open Ai Test</h5>
    <div class="chat-container">
      <div class="msg">
        <span class="title">AI:</span><span>What is your board subject?</span>
      </div>
      <input class="open-ai-input" type="text" v-model="txt" />
      <button @click="sendQ">Send</button>
      <span v-if="isLoading">Loading....</span>
    </div>
    <button @click="closeAI">Close</button>
  </section>
</template>

<script>
import axios from "axios";
import { httpService } from "../services/http.service";
import { boardService } from '../services/board.service';
export default {
  data() {
    return {
      txt: "",
      res: "",
      isLoading: false,
    };
  },
  methods: {
    async sendQ() {
      this.res = this.txt;
      this.txt = ''
      this.isLoading = true;
      const url = "http://localhost:3030/api/openai";
      let res = await axios.post(url, { message: this.res });
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
};
</script>
