<template>
  <Container
    class="group-list group-container smooth-dnd"
    orientation="vertical"
    group-name="group"
    tag="div"
    @drop="onGroupDrop($event)"
  >
    <GroupPreview v-for="group in groups" :key="group.id" :group="group" />
  </Container>
</template>

<script>
import GroupPreview from "./GroupPreview.vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import { utilService } from '../services/util.service'

export default {
  data() {
    return {
    };
  },
  methods: {
    onGroupDrop(dropResult) {
      let scene = [...this.groups];
      scene = utilService.applyDrag(scene, dropResult);
      this.groups = scene;
    },
  },
  components: {
    GroupPreview,
    Container,
    Draggable,
  },
};
</script>