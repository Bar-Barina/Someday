<template>
  <Container orientation="vertical" @drop="onGroupDrop($event)">
    <Draggable class="group-container" v-for="group in groups" :key="group">
      <GroupPreview :group="group" :labelsOrder="labelsOrder" @labelDrop="labelDrop"></GroupPreview>
    </Draggable>
  </Container>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import GroupPreview from "./GroupPreview.vue";
import { utilService } from '../services/util.service';

export default {
  emits: ['labelDrop'],
  data() {
    return {
      board: null,
      groups: null,
      labelsOrder: [
        "Date",
        "Text",
        "Priority",
        "Person",
        "File",
        "Status",
        "Timeline",
      ],
    };
  },
  watch: {
    "$route.params": {
      handler() {
        const { boardId } = this.$route.params;
        if (!boardId) return;
        this.$store
          .dispatch({ type: "getBoardById", boardId })
          .then((board) => {
            this.board = JSON.parse(JSON.stringify(board));
            this.groups = JSON.parse(JSON.stringify(board.groups));
          });
      },
      immediate: true,
    },
  },
  methods: {
    onGroupDrop(dropResult) {
      let scene = [...this.groups];
      scene = utilService.applyDrag(scene, dropResult);
      this.groups = scene;
    },
    labelDrop(dropResult) {
      let scene = [...this.labelsOrder];
      scene = utilService.applyDrag(scene, dropResult);
      this.labelsOrder = scene;
    },
  },
  components: {
    GroupPreview,
    Container,
    Draggable,
  },
};
</script>