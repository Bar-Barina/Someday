<template>
  <h1>Open Ai Test</h1>
  <input placeholder="Ask Steve anything" type="text" v-model="txt" />
  <button @click="sendQ">Send</button>
  <div class="chat-container">
    <div class="msg"><span class="title">AI:</span><span>What is your board subject?</span></div>
    <div class="msg"><span class="title">Me:</span><span ref="userMsg"></span></div>
    <div class="msg"><span v-if="message" class="title">AI:</span><pre>{{ message}}</pre></div>
  </div>
</template>

<script>
import axios from "axios";
import { httpService } from "../services/http.service";
export default {
  data() {
    return {
      txt: "",
      res: "",
    };
  },
  methods: {
    async sendQ() {
      const url = "http://localhost:3030/api/openai";
      this.userMsg();
      const res = await axios.post(url, { message: this.txt });
      this.res = res.data.message;
      this.txt = "";
    },
    userMsg() {
      this.$refs.userMsg.innerText = this.txt;
    },
  },
  computed: {
    message() {
      return this.res;
    },
  },
};
</script>

<style>

.chat-container {
    width: 400px;
    display: grid;
}

.title {
    padding-inline-end: 10px;
    font-weight: bold;
}

.msg {
    margin: 10px 0;
}
</style>