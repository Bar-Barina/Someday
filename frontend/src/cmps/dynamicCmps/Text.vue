<template>
  <section class="task-text">
    <div ref="cmpText" class="text" contenteditable="true" @focusout="updateTask">
        {{ task.text }}
    </div>
  </section>
</template>

<script>
export default {
  name: 'Text', 
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
    }
  },
  computed: {},
}
</script>
