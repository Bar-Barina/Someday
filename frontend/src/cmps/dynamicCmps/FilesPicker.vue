<template>
  <section class="files-picker">
    <label class="file-label">
      <input ref="file" type="file" @change="readFile($event)" hidden/>
    </label>
  </section>
</template>

<script>
export default {
  props: {
    task: Object,
    group: Object,
  },
  data() {
    return {
      files: this.task.files
    }
  },
  methods: {
    readFile(e) {
      const file = e.target.files[0]
      console.log('file', file)
      console.log('this.task.files', this.task.files)
      this.task.files.push(file)
      this.saveFile()
    },
    saveFile() {
      this.$emit('updateTask' , {cmpType: 'files' , data: this.files})
    }
  },
};
</script>
