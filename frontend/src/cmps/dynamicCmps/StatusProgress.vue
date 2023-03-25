<template>
  <section class="status-progress cell flex align-center justify-center">
    <div
      class="cell-progress"
      v-for="(stat, idx) in getPercent"
      :key="idx"
      :style="{ 'background-color': colors[idx], width: stat + '%' }"
       v-tippy="{
        content: `${stat}%` ,
        theme: 'classic',
        placement: 'top',
        arrow: true,
      }"
    ></div>
  </section>
</template>

<script>
export default {
  props: {
    group: Object,
    label: String,
    cmp: String,
  },
  created() {
    if (this.label === "Status") {
      this.type = "status";
      this.options = ["Working on it", "Done", "Stuck", ""];
      this.colors = ["#fdab3d", "#00c875", "#e2445c", "#c3c4c3"];
    } else {
      this.type = "priority";
      this.options = ["High", "Medium", "Low", "Critical", ""];
      this.colors = [
        "rgb(64, 22, 148)",
        "rgb(85, 89, 223)",
        "rgb(87, 155, 252)",
        "rgb(51, 51, 51)",
        "#c3c4c3",
      ];
    }
  },
  data() {
    return {
      options: null,
      colors: null,
      map: {},
      type: null,
    };
  },
  computed: {
    getPercent() {
      this.options.map((option) => {
        if (!this.map[option]) this.map[option] = 0;
      });
      this.group.tasks.forEach((task) => {
        this.options.forEach((option) => {
          if (task[this.type] === option) this.map[option]++;
        });
      });
      const values = Object.values(this.map);
      const total = values.filter((v) => v > 0);
      const stats = values.map((stat) => (stat / total.length) * 100);
      return stats;
    },
  },
};
</script>