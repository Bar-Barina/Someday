<template>
    <section class="file-info">
    <div class="file-info-header flex space-between">
        <div class="file-name-img flex">
        <img src="https://cdn.monday.com/images/file-types/image_v2.svg"/>
      <span class="file-name">{{ this.task.files.name }}</span>
    </div>
      <span v-icon="'x'" class="pointer exit-info"></span>
    </div>
    <div class="img-comments-div">
    <div class="file-info-div">
        <img :src="this.task.files.url" class="file-info-img" />
    </div>
    <div class="side-info flex column align-center">
        <span v-icon="'fileInfo'"></span> 
       <span>Info</span> 
    </div>
</div>
</section>
</template>

<script>
export default {
  name: 'FileInfo',
  props: {
    task : Object
  },
  data() {
    return {}
  },
  methods: {
  },
  computed: {
    taskFile() {
    // const tasks = this.currBoard.groups.filter(group => {
    //     group.tasks.
    // })
    // const taskWithFiles = tasks.find((task) => task.files && task.files.url);
    // if (taskWithFiles) {
    //   return taskWithFiles.files;
    // } else {
    //   return null;
    // }
  },
  },
  created() {},
  components: {},
}
</script>
