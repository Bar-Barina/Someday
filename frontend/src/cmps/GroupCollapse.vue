<template>
  <section class="collapsed-group group-grid">
    <div class="more sticky">
        <span v-icon="'Dots'"></span>
    </div>
    <div class="task-border sticky" :style="{ 'background-color': group.color }"></div>
    <div @click="collapse" class="arrow sticky flex justify-center" :style="{ fill : group.color }">
        <span v-icon="'arrowRightG'"></span>
    </div>
    <div class="title-wrapper sticky flex">
        <button class="color-icon" :style="{'background-color': group.color}" v-if="false"></button>
        <div class="title-input editable-div" contenteditable="true" :style="{color: group.color}">
            {{ group.title }}
        </div>
        <div class="tasks-count">{{ tasksCount}} tasks</div>
    </div>
    <component v-for="(label , idx) in labelsOrder" :key="idx" :is="`${label}Progress`"></component>
    <!-- <ProgressBar :labelsOrder="labelsOrder"/> -->
  </section>
</template>

<script>
import ProgressBar from './ProgressBar.vue'
import DateProgress from './dynamicCmps/DateProgress.vue';
import FilesProgress from './dynamicCmps/FilesProgress.vue';
import PersonProgress from './dynamicCmps/PersonProgress.vue';
import PriorityProgress from './dynamicCmps/PriorityProgress.vue';
import StatusProgress from './dynamicCmps/StatusProgress.vue';
import TextProgress from './dynamicCmps/TextProgress.vue';
import TimelineProgress from './dynamicCmps/TimelineProgress.vue';

export default {
    props: {
        group: Object,
        labelsOrder: Array
    },
    data() {
        return {

        }
    },
    methods: {
        collapse() {
            this.$emit('collapse' , false)
        }
    },
    computed: {
        tasksCount() {
            return this.group.tasks.length
        }
    },
    components: {
        ProgressBar,
        DateProgress,
        FilesProgress,
        PersonProgress,
        PriorityProgress,
        StatusProgress,
        TextProgress,
        TimelineProgress
    }
}
</script>