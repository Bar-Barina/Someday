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
import DateProgress from './dynamicCmps/EmptyProgress.vue';
import FilesProgress from './dynamicCmps/FilesProgress.vue';
import PersonProgress from './dynamicCmps/PersonProgress.vue';
import PriorityProgress from './dynamicCmps/StatusProgress.vue';
import StatusProgress from './dynamicCmps/StatusProgress.vue';
import TextProgress from './dynamicCmps/EmptyProgress.vue';
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