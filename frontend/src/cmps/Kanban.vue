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
        <KanbanCol :status="status" :tasks="statusesMap[status]" :color="colors[idx]"
        @addStatusesMap="addToMap" @removeStatusesMap="removeFromMap" @updateMapOrder="setOrder"/>
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
      statuses: ['Working on it' , 'Stuck' , 'Done' , 'Blank'],
      colors: ['#fdab3d' ,'#e2445c' ,  '#00c875' , '#c3c4c3'],
      statusesMap: {}
    };
  },
  created() {
      const board = JSON.parse(JSON.stringify(this.currBoard))
      const statusesMap = this.statuses.reduce((acc , status) => {
        if(!acc[status]) acc[status] = []
        board.groups.forEach(group => {
          group.tasks.forEach(task => {
            if(task.status === status) acc[status].push(task)
          })
        })
        return acc
      }, [])
      this.statusesMap = statusesMap
  },
  methods: {
    onColumnDrop(dropResult) {
      this.statuses = utilService.applyDrag(this.statuses, dropResult)
      this.colors = utilService.applyDrag(this.colors, dropResult)
    },
    addToMap({task , status}) {
      this.statusesMap[status].push(task)
      console.log('this.statusesMap', this.statusesMap)
    },
    removeFromMap({taskIdx , status}) {
      this.statusesMap[status].splice(taskIdx , 1)
    },
    setOrder({status , dropResult}) {
      this.statusesMap[status] = utilService.applyDrag(this.statusesMap[status], dropResult)
    }
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