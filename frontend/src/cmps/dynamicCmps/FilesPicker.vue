<template>
  <section class="files-picker">
    <label class="file-label">
      <input type="file" @change="readFile(this.files[0])" />
    </label>
  </section>
</template>

<script>
export default {
  props: {
    task: Object,
    group: Object,
  },
  methods: {
    readFile(file) {
      let reader = new FileReader();

      reader.onload = function (event) {
        let contents = event.target.result;
        console.log(contents); // Do something with the file contents
      };
      reader.readAsText(file);
    },
  },
};
</script>
