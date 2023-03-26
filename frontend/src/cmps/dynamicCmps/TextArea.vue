<template>
  <section class="task-text">
    <div class="txt-content flex align-center justify-center">
      <!-- <div
        ref="cmpText"
        
        contenteditable="true"
        @focusout="updateTask"
      >
        {{ task.text }}
      </div> -->
      <input type="text" v-model="txt" class="text" @focusin="togglePlaceholder" @focusout="togglePlaceholder"/>
      <div v-if="txt" class="reset-text" @click="resetText">
        <span class="x-icon" v-icon="'closeTxt'"></span>
      </div>
      <div v-if="!txt && isPlaceholder" class="text-placeholder">
        <span class="plus">+</span>
        <span v-icon="'T'" class="t-icon"></span><span></span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Text",
  emits: ["updateTask"],
  props: {
    task: Object,
    group: Object,
  },
  data() {
    return {
      txt:'',
      isPlaceholder:true
    };
  },
  methods: {
    updateTask() {
      this.task.text = this.txt;
      this.$emit("updateTask", {
        cmptype: "text",
        data: this.txt,
      });
    },
    resetText() {
      // this.$refs.cmpText.innerText = "";
      this.txt = ''
      this.updateTask();
    },
    togglePlaceholder() {
      this.isPlaceholder = !this.isPlaceholder
    }
  },
  created() {
    if(!this.task.text) return
    else this.txt = this.task.text
  }
};
</script>
