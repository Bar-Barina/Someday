<template>
  <section class="kanban-col" style="{'background-color': 'red'}">
    <div class="col-header flex space-between">
      <div>{{ status }}</div>
    </div>
    <section class="col-content flex column">
      <section class="cards-container">
        <Container
          class="smooth-dnd-container"
          orientation="vertical"
          group-name="tasks"
          tag="div"
          :shouldAcceptDrop="(e, payload) => e.groupName === 'tasks'"
          :get-child-payload="getColPayload()"
          @drop="onTaskDrop(null, $event)"
        >
          <Draggable v-for="(task, idx) in tasks" :key="idx">
            <KanbanCard :task="task" />
          </Draggable>
        </Container>
      </section>
    </section>
  </section>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import KanbanCard from './KanbanCard.vue'
export default {
  props: {
    status: String,
  },
  data() {
    return {
      board: this.$store.getters.currBoard,
    }
  },
  methods: {
    getColPayload(id) {
      return (index) => {
        return this.board.groups.filter((g) => g._id === groupId)[0].tasks[
          index
        ]
      }
    },
    onTaskDrop() {},
  },
  computed: {
    tasks() {
      const board = JSON.parse(JSON.stringify(this.board))
      const filteredGroups = board.groups.map((group) => {
        return group.tasks.filter((task) => task.status === this.status)
      })
      const tasks = filteredGroups.reduce((acc, group) => {
        acc = [...acc, ...group]
        return acc
      }, [])
      return tasks
    },
  },
  components: {
    KanbanCard,
    Container,
    Draggable,
  },
}
</script>
