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
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'date',
  emit: ['updateTask'],
  props: {
    task: Object,
  },
  components: {},
  created() {},
  data() {
    return {
      value: '',
    }
  },
  methods: {
    changeDate() {
      this.$emit('updateTask', { cmpType: 'date', data: this.value })
    },
  },
  computed: {},
}
</script>
