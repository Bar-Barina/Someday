<template>
  <h1>Open Ai Test</h1>
  <input placeholder="Ask Steve anything" type="text" v-model="txt">
  <button @click="sendQ">Send</button>
  <div>
    <h3>{{ message }}</h3>
  </div>
</template>

<script>
import axios from 'axios'
import { httpService } from '../services/http.service'
export default {
    data() {
        return {
            txt: '',
            res: ''
        }
    },
    methods: {
        async sendQ() {
            const url = 'http://localhost:3030/api/openai'
            const res = await axios.post(url, {message: this.txt} )
            this.res = res.data.message
        }
    },
    computed: {
        message() {
            return this.res
        }
    }
}
</script>