<script>
export default {
  data() {
    return {
      urls: [
        "https://i.gyazo.com/9a0191e7de44640183cca99460a19a40.png",
        "https://i.gyazo.com/3b44b1c73ffe2856bf8189c26142383d.png",
        "https://i.gyazo.com/09e4be95503295313d04ad9ff39299fe.png",
        "https://i.gyazo.com/d7b9ec064a7cfd2330c959bb830d53c7.png",
      ],
    };
  },
};
</script>


<template>
  <section class="carousel-section full">
    <el-carousel class="carousel" :interval="2000" type="card" height="380px">
      <el-carousel-item v-for="(url, idx) in this.urls" :key="idx">
        <img :src="url" />
      </el-carousel-item>
    </el-carousel>
  </section>
</template>
