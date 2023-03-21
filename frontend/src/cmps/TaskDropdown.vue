<template>
  <section class="task-dropdown">
    <div v-for="(option, idx) in options" class="option" :key="idx"
   @click="changeOption(option)">{{ option }}
    </div>
  </section>
</template>

<script>
export default {
  props: {
    options: Array,
  },
  name: '',
  data() {
    return {
    }
  },
  methods: {
    changeOption(option) {
      this.$emit('updateOption', option)
    },
  },
  computed: {},
}
</script>
