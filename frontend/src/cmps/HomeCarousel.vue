<script>
export default {
  data() {
    return {
    //   labels: this.$store.getters.dashLabels,
      urls: [
        "https://images.unsplash.com/photo-1597670250484-0e9aff7f8804?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyJTIwdG95c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1640461470346-c8b56497850a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW9ub3BvbHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8QXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8QmFieSUyMHBsYXl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1619010318351-8ea4891aa335?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmFyYmllfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1494059980473-813e73ee784b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8UHV6emxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://plus.unsplash.com/premium_photo-1663075949138-8b873b727662?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxheWluZyUyMG91dGRvb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1614897464244-86c6b2fdda79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YnV6enxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      ],
    };
  },
};
</script>


<template>
  <section class="carousel-section full">
    <el-carousel class="carousel" :interval="2000" type="card" height="200px">
      <el-carousel-item v-for="(url, idx) in this.urls" :key="idx">
        <img :src="url" />
      </el-carousel-item>
    </el-carousel>
  </section>
</template>
