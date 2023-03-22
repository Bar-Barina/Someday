<template>
  <section class="edit-menu">
    <div class="edit-cell">
    <div className="icon" v-html="getSvg('editTrash')"></div>
    <span>Delete</span>
    </div>
  </section>
</template>

<script>
import { svgService } from '../services/svg.service';

export default {
  data() {
    return {};
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
  },
};
</script>