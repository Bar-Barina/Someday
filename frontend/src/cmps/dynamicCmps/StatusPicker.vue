<template>
  <div
    class="status full-cell"
    v-clickOutside="closeModal"
    @click="toggleModal"
    :style="{ 'background-color': color }"
  >
    <canvas ref="labelStatus"></canvas>
    {{ task.status }}
    <TaskDropdown
      v-if="showDropdown"
      :options="labels"
      :type="'status'"
      @updateOption="updateStatus"
      @updateOptions="updateOptions"
      optionClass="status-option"
    />
    <span class="peeling-span scale-up-tr"></span>
  </div>
</template>

<script>
import TaskDropdown from "../TaskDropdown.vue";

export default {
  emits: ["updateTask", "updateOptions", "addLabel", "confetti"],
  props: {
    task: Object,
  },
  name: "",
  created() {},
  data() {
    return {
      showDropdown: false,
      selectedStatus: this.task.status,
      settings: {
        target: this.$refs.labelStatus,
        max: 50,
        size: 1,
        animate: true,
        props: ["circle", "square"],
        colors: [
          [165, 104, 246],
          [230, 61, 135],
          [0, 199, 228],
          [253, 214, 126],
        ],
        origin: {
          x: 0.5,
          y: 0.5,
          element: this.$refs.labelStatus,
        },
      },
    };
  },
  methods: {
    async updateStatus(status) {
      this.selectedStatus = status;
      this.toggleModal();
      if (status === "Done") {
    
          this.$emit("updateTask", { cmpType: "status", data: status });
              this.$confetti.start({
          canvasElement: this.$refs.labelStatus,
              })
        return
      }
      this.$emit("updateTask", { cmpType: "status", data: status });
    },
    toggleModal() {
      this.showDropdown = !this.showDropdown;
    },
    closeModal() {
      this.showDropdown = false;
    },
    updateOptions(updatedOptions) {
      this.$emit("updateOptions", updatedOptions);
    },
    startConfetti() {
      this.$confetti.start({
        canvasElement: this.$refs.labelStatus,
      });
      setTimeout(() => {
        this.$confetti.stop();
      }, 3000);
    },
  },
  computed: {
    labels() {
      return this.$store.getters.currBoard.labels;
    },
    status() {
      return this.selectedStatus;
    },
    color() {
      const labels = this.labels;
      let currColor = "";
      if (!labels) return;
      labels.status.forEach((label) => {
        if (label.name === this.task.status) currColor = label.color;
      });
      return currColor;
    },
  },
  components: {
    TaskDropdown,
  },
};
</script>
