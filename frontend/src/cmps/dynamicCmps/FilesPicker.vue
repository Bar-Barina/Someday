<template>
  <section class="files-picker">
    <label class="file-label">
      <div class="file-wrapper flex justify-center align-center">
      <img v-if="task.files.url" class="file-image" :src="task.files.url" />
      <div v-if="!task.files.url" class="empty-file-icon" >
      <img  class="empty-file-icon" src="https://cdn.monday.com/images/file-types/empty.svg" alt="No File">
      <span class="plus" >+</span>
      </div>
      </div>
      <input type="file" @change="readFile($event)" hidden />
    </label>
    <span class="remove" v-if="task.files.url"  @click.stop="removeFile">x</span>
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
      files: this.task.files,
      imageUrl: "",
    };
  },
  methods: {
    readFile(e) {
      const reader = new FileReader();
      const file = e.target.files[0];

      reader.addEventListener("load", () => {
        const dataURL = reader.result;
        this.imageUrl = dataURL;
        this.$emit("updateTask", {
          cmpType: "files",
          data: { file, url: dataURL },
        });
      });
      reader.readAsDataURL(file);
    },
    removeFile() {
      this.$emit("updateTask", {
        cmpType: "files",
        data: [],
      });
    },
  },
};
</script>
