<template>
  <section class="collapsed-group group-grid">
    <div class="more more-group sticky flex align-center justify-center">
      <span v-icon="'Dots'"></span>
    </div>
    <div
      class="task-border sticky"
      :style="{ 'background-color': group.color }"
    ></div>
    <div
      @click="collapse"
      class="arrow sticky flex justify-center"
      :style="{ fill: group.color }"
    >
      <div></div>
      <span
        v-tippy="{
          content: 'Expand group',
          theme: 'classic',
          placement: 'top',
          arrow: true,
        }"
        v-icon="'arrowRightG'"
      ></span>
    </div>
    <div class="title-wrapper sticky flex">
      <button
        class="color-icon"
        :style="{ 'background-color': group.color }"
        v-if="false"
      ></button>
      <div
        class="title-input editable-div"
        contenteditable="true"
        :style="{ color: group.color }"
      >
        {{ group.title }}
      </div>
      <div class="tasks-count">{{ tasksCount }} tasks</div>
    </div>

    <component
      v-for="(n, idx) in 7"
      :key="idx"
      :is="'EmptyProgress'"
      :group="group"
      :label="label"
      :cmp="'collapse'"
    ></component>
  </section>
</template>

<script>
import EmptyProgress from "./dynamicCmps/EmptyProgress.vue";
export default {
  props: {
    group: Object,
  },
  components: {
    EmptyProgress,
  },
};
</script>