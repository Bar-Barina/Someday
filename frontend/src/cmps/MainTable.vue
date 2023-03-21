<template>
  <Container orientation="vertical" @drop="onGroupDrop($event)">
      <Draggable v-for="group in groups" :key="group">
        <GroupPreview :group="group"></GroupPreview>
      </Draggable>
    </Container>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import GroupPreview from './GroupPreview.vue';

export default {
  data() {
    return {

    }
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
    Draggable
  }
}
</script>