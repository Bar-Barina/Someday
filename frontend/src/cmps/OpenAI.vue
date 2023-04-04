<template>
  <section class="openai-container">
    <div class="chat-container">
      <div class="msg">
        <span class="title">AI:</span><span>{{ msg }}</span>
      </div>
      <div v-if="isLoading" class="loader-container">
        <div class="container">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="send-section flex align-center">
        <input
          class="open-ai-input"
          type="text"
          placeholder="Your subject"
          v-model="rec"
        />
        <span v-if="txt" class="send" v-icon="'sendOpenAI'" @click="sendQ"></span>
        <VoiceRecorder class="mic" v-if="!txt" @sendTxt="setTxt" @stopRec="sendQTest" />
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { boardService } from "../services/board.service";
import VoiceRecorder from "./VoiceRecorder.vue";

export default {
  data() {
    return {
      txt: "",
      res: "",
      rec: "",
      msg: "What is your board subject?",
      isLoading: false,
    };
  },
  methods: {
    async sendQ() {
      if (this.txt) {
        this.res = this.txt;
        this.txt = "";
      } else if (this.rec) {
        this.res = this.rec;
        this.rec = "";
      }
      this.isLoading = true;
      const url = "http://localhost:3030/api/openai";
      let res = await axios.post(url, { message: this.res });
      if (res.data.message.length < 100) {
        this.msg = res.data.message;
        this.isLoading = false;
        return;
      }
      res = JSON.parse(res.data.message);
      const boardToCreate = this.createBoard(res);
      const board = await this.$store.dispatch({
        type: "addBoard",
        board: boardToCreate,
      });
      this.$emit("AIboard", board);
      this.closeAI();
    },
    createBoard(res) {
      res.labelsOrder = boardService.getLabelsOrder()
      const taskAI = boardService.getEmptyTask();
      delete taskAI.taskTitle;
      res.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          Object.assign(task, taskAI);
        });
      });
      res.labels = boardService.getDefaultLabels();
      return res;
    },
    closeAI() {
      this.$emit("closeAI");
    },
    sendQTest() {
      this.sendQ();
    },
    setTxt(txt) {
      this.rec = txt;
    },
  },
  computed: {
    message() {
      return this.res;
    },
    value() {
      if (this.txt) return this.txt 
      else if (this.rec) return this.rec
    }
  },
  components: {
    VoiceRecorder,
  },
};
</script>
