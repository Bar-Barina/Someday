<template>
  <section class="task-text flex justify-center align-center">
    <div ref="cmpText" class="text editable-div flex align-center" contenteditable="true" @focusout="updateTask">
        {{ task.text }}
    </div>
    <div class="reset-text" @click="resetText">
        x
    </div>
  </section>
</template>

<script>
export default {
  name: 'Text', 
  emits:['updateTask'],
  props: {
    task:Object
  },
components:{},
created() {},
  data() {
    return {}
  },
  methods: {
    updateTask() {
        this.task.text = this.$refs.cmpText.innerText
        this.$emit('updateTask',{cmptype: 'text' ,data:this.$refs.cmpText.innerText})
    },
    resetText() {
        this.$refs.cmpText.innerText = ''
        this.updateTask()
    }
  },
  computed: {},
}
</script>
