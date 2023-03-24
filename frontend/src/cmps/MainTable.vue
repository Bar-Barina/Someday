<template>
  <Container v-if="currBoard" class="main-table" orientation="vertical" @drop="onGroupDrop($event)">
    <Draggable class="group-container" v-for="group in currBoard.groups" :key="group">
      <GroupPreview :group="group" :labelsOrder="labelsOrder" @labelDrop="labelDrop"></GroupPreview>
      <RouterView />
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
        "Files",
        "Status",
        "Timeline",
      ],
    };
  },
  methods: {
    onGroupDrop(dropResult) {
      const board = JSON.parse(JSON.stringify(this.currBoard))
      let groups = board.groups;
      groups = utilService.applyDrag(groups, dropResult);
      board.groups = groups
      this.$store.dispatch({type: 'updateBoard' , board})
    },
    labelDrop(dropResult) {
      let scene = [...this.labelsOrder];
      scene = utilService.applyDrag(scene, dropResult);
      this.labelsOrder = scene;
    },
  },
  computed: {
    currBoard() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard))
    }
  },
  components: {
    GroupPreview,
    Container,
    Draggable,
  },
};
</script>