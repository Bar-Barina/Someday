<template>
  <section class="status-progress cell">
    <div
      v-for="(option, idx) in options"
      :key="idx"
      :style="{ 'background-color': colors[idx] , width: this.map[option]}"
    >
    <div v-if="map[option]"></div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    group: Object,
    label: String,
  },
  created() {
    if (this.label === "StatusProgress") {
      this.options = ["working on it", "Done", "Stuck", ""];
      this.colors = ["#fdab3d", "#00c875", "#e2445c", "#c3c4c3"];
    } else {
      this.options = ["High", "Medium", "Low", "Critical"];
      this.colors = [
        "rgb(64, 22, 148)",
        "rgb(85, 89, 223)",
        "rgb(87, 155, 252)",
        "rgb(51, 51, 51)",
      ];
    }
  },
  data() {
    return {
      options: null,
      map: {}
    };
  },
  computed: {
    getPercent() {
      this.options.map((option) => {
        if (!this.map[option]) this.map[option] = 0;
        this.map[option]++;
      });
      const total = Object.keys(this.map).length
      this.map = Object.keys(this.map).map(count => {
        return count / total * 100
      })
    },
  },
};
</script>