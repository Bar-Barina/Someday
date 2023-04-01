<template>
  <section class="status-progress cell flex align-center justify-center">
    <span class="collapse-progress-label" v-if="isCollapse">{{ label }}</span>
    <div class="progress-wrapper flex align-center justify-center">
      <div
        class="cell-progress"
        v-for="(stat, idx) in getPercent"
        :key="idx"
        :style="{ 'background-color': colors[idx], width: stat + '%' }"
        v-tippy="{
          content: `${stat}%`,
          theme: 'classic',
          placement: 'top',
          arrow: true,
        }"
      ></div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    group: Object,
    label: String,
    cmp: String,
    isCollapse: String,
  },
  created() {
    if (this.label === "Status") {
      this.type = "status";
      this.options = this.currBoard.labels[this.type].map(l=>l.name)
      this.colors =  this.currBoard.labels[this.type].map(l=>l.color)
      console.log('this.options',this.options)
      console.log('this.colors',this.colors)
    } else {
      this.type = "priority";
      this.options = this.currBoard.labels[this.type].map(l=>l.name)
      this.colors =  this.currBoard.labels[this.type].map(l=>l.color)
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
      const total = values.reduce((acc, v) => {
        acc += v;
        return acc;
      }, 0);
      const stats = values.map((stat) => ((stat / total) * 100).toFixed(1));
      return stats;
    },
    currBoard() {
      return this.$store.getters.currBoard
    }
  },
};
</script>
