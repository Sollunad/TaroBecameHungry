<template>
  It is currently {{ currentClockPhase }} in {{ regionName }}. {{ nextClockPhase }} begins in {{ formattedTimeUntilNextClockPhase }}.
</template>

<script setup lang="ts">
import {computed} from "vue";
import {getCurrentClockPhase, getFormattedTimeUntilNextClockPhase, getNextClockPhase} from "../util/clockPhase";

const props = defineProps<{
  isCantha: boolean,
  currentTime: Date,
}>()

const regionName = props.isCantha ? 'Cantha' : 'Tyria';

const currentClockPhase = computed(() => {
  return getCurrentClockPhase(props.isCantha, props.currentTime);
});

const nextClockPhase = computed(() => {
  return getNextClockPhase(props.isCantha, props.currentTime);
})

const formattedTimeUntilNextClockPhase = computed(() => {
  return getFormattedTimeUntilNextClockPhase(props.isCantha, props.currentTime)
})
</script>

<style scoped>

</style>