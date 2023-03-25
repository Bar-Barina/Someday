<template>
  <section class="kanban">
    <section class="kanban-content flex">
      <Container
        class="smooth-dnd-container horizontal"
        orientation="horizontal"
        group-name="group-kanban"
        tag="div"
        @drop="onColumnDrop($event)"
      >
      <Draggable v-for="(status , idx) in statuses" :key="idx">
        <KanbanCol :status="status"/>
      </Draggable>
      </Container>
    </section>
    <section class="kanban-filter flex column"></section>
  </section>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import { utilService } from '../services/util.service';
import KanbanCol from './KanbanCol.vue';
export default {
  data() {
    return {
      statuses: ['Working on it' , 'Stuck' , 'Done' , 'Blank']
    };
  },
  methods: {
    onColumnDrop(dropResult) {
      this.statuses = utilService.applyDrag(this.statuses, dropResult)
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
  },
  components: {
    Container,
    Draggable,
    KanbanCol
  },
};
</script>