<template>
  <section class="files-picker">
    <label class="file-label">
      <div class="file-wrapper flex justify-center align-center">
        <img
          v-if="task.files.url"
          class="file-image"
          :src="task.files.url"
          @click.stop="showFileInfo = !showFileInfo"
        />
        <div v-if="!task.files.url" class="empty-file-icon">
          <img
            class="empty-file-icon"
            src="https://cdn.monday.com/images/file-types/empty.svg"
            alt="No File"
          />
          <span class="plus">+</span>
        </div>
      </div>
      <input type="file" @change="readFile($event)" hidden />
    </label>
    <span class="remove flex align-center justify-center" v-if="task.files.url" @click.stop="removeFile"><span class="x-icon" v-icon="'fileX'"></span></span>
  </section>
  <FileInfo
    v-if="showFileInfo"
    v-clickOutside="closeModal"
    :task="task"
  />
</template>

<script>
import FileInfo from '../FileInfo.vue'
export default {
  emits: ['updateTask'],
  props: {
    task: Object,
    group: Object,
  },
  data() {
    return {
      files: this.task.files,
      showFileInfo: false,
      file: null,
    }
  },
  methods: {
    readFile(e) {
      const reader = new FileReader()
      const file = e.target.files[0]
      // console.log(file)
      reader.addEventListener('load', () => {
        const dataURL = reader.result
        const fileToSave = {
          url: dataURL,
          name: file.name,
        }
        console.log(fileToSave)
        this.$emit('updateTask', {
          cmpType: 'files',
          data: fileToSave,
        })
        // this.file = fileToSave
      })
      reader.readAsDataURL(file)
    },
    removeFile() {
      this.$emit('updateTask', {
        cmpType: 'files',
        data: [],
      })
    },
    closeModal() {
      this.showFileInfo = !this.showFileInfo
    },
  },
  components: {
    FileInfo,
  },
}
</script>
