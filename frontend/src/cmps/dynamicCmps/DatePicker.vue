<template>
  <div class="demo-date-picker">
    <label class="block">
      <el-date-picker
        v-model="value"
        type="date"
        value-format="MMM-DD"
        placeholder="Pick a date"
        :default-value="new Date(Date.now())"
        @change="changeDate"
      />
    </label>
    <div v-if="value" class="date-preview flex justify-center align-center">
      {{ value.split("-")[0] + " " + value.split("-")[1] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "date",
  emits: ["updateTask"],
  props: {
    task: Object,
    group: Object
  },
  components: {},
  created() {
    if(this.task.date) this.value = this.task.date
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    changeDate() {
      console.log(
        "this.value",
        this.value.split("-")[0] + " " + this.value.split("-")[1]
      );
      this.$emit("updateTask", { cmpType: "date", data: this.value });
    },
  },
};
</script>
