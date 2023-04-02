<template>
  <div class="recorder">
    <span v-if="!isRecording" v-icon="'mic'" class="mic" @click="toggleMic">Record</span>
    <div v-if="isRecording" class="stopRec" @click="toggleMic"></div>
    <div class="transcript" v-text="transcript"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";

const transcript = ref("");
const isRecording = ref(false);
const Recognition =
  window.SpeechRecognitionAlternative || window.webkitSpeechRecognition;
const sr = new Recognition();

const emits = defineEmits(["stopRec", "sendTxt"]);

onMounted(() => {
  sr.continuous = true;
  sr.interimResults = true;

  sr.onstart = () => {
    isRecording.value = true;
  };

  sr.onend = () => {
    isRecording.value = false;
  };

  sr.onresult = (ev) => {
    const t = Array.from(ev.results)
      .map((res) => res[0])
      .map((res) => res.transcript)
      .join("");

    emits("sendTxt", t);
    // transcript.value = t
  };
});

const toggleMic = () => {
  if (isRecording.value) {
    sr.stop();
    emits("stopRec");
  } else sr.start();
};
</script>