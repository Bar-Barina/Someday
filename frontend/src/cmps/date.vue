<template>
  <div class="demo-date-picker">
    <label class="block">
      <el-date-picker
        v-model="value"
        type="date"
        placeholder="Pick a date"
        :default-value="new Date(2010, 9, 1)"
        @change="changeDate"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "date",
  props: {
    task: Object,
  },
  components: {},
  created() {},
  data() {
    return {
      value: '' ,
    };
  },
  methods: {
    changeDate() {
      console.log('formattedDate', this.value)
      // this.$emit("updateTask", { cmpType: "date", data: this.value });
    },
  },
  computed: {},
};
</script>

