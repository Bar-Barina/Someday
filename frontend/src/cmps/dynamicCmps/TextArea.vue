<template>
  <section class="task-text">
    <div class="txt-content flex align-center justify-center">
      <div
        ref="cmpText"
        class="text"
        contenteditable="true"
        @focusout="updateTask"
      >
        {{ task.text }}
      </div>
      <div class="reset-text">
        <span class="x-icon" v-icon="'closeTxt'"></span>
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
    return {};
  },
  methods: {
    updateTask() {
      this.task.text = this.$refs.cmpText.innerText;
      this.$emit("updateTask", {
        cmptype: "text",
        data: this.$refs.cmpText.innerText,
      });
    },
    resetText() {
      this.$refs.cmpText.innerText = "";
      this.updateTask();
    },
  },
};
</script>
