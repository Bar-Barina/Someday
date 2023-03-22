<template>
  <section class="progress-grid group-grid">
    <div class="sticky empty first"></div>
    <div class="sticky empty second"></div>
    <div class="sticky empty third"></div>
    <div class="sticky empty fourth"></div>
    <component v-for="(label , idx) in labelsOrder" :key="idx" :is="`${label}Progress`"></component>
  </section>
</template>

<script>
import DateProgress from './dynamicCmps/DateProgress.vue';
import FilesProgress from './dynamicCmps/FilesProgress.vue';
import PersonProgress from './dynamicCmps/PersonProgress.vue';
import PriorityProgress from './dynamicCmps/PriorityProgress.vue';
import StatusProgress from './dynamicCmps/StatusProgress.vue';
import TextProgress from './dynamicCmps/TextProgress.vue';
import TimelineProgress from './dynamicCmps/TimelineProgress.vue';

export default {
    props: {
        labelsOrder: Array
    },
    components: {
        PriorityProgress,
        StatusProgress,
        DateProgress,
        TimelineProgress,
        FilesProgress,
        TextProgress,
        PersonProgress
    }
};
</script>