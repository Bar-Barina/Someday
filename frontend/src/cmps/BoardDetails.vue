<template>
  <Container
    class="group-list group-container smooth-dnd"
    orientation="vertical"
    group-name="group"
    tag="div"
    @drop="onGroupDrop($event)"
  >
    <GroupPreview v-for="group in board.groups" :key="group._id" :group="group"/>
  </Container>
</template>

<script>
import GroupPreview from "./GroupPreview.vue";
import { Container, Draggable } from "vue3-smooth-dnd";

export default {
  data() {
    return {
      board: null,
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
            this.board = board;
            console.log("this.board", this.board);
          });
        // this.$store
        //   .dispatch({ type: 'getById', todoId })
        //   .then(todo => (this.todo = todo))
        // this.$store.dispatch({type:'loadReviews'})
      },
      immediate: true,
    },
  },
  components: {
    GroupPreview,
    Container,
    Draggable
  },
};
</script>
