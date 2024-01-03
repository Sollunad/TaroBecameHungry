<template>
  <div class="greetings">
    <h1>Taro became hungry {{msg}}</h1>
    <Fish :fish="testFish" />
  </div>
</template>

<script setup lang="ts">
import fish from '../data/fish.json';
import Fish from "./Fish.vue";

defineProps<{
  msg: string
}>()

const testFish = fish[0];
</script>

<style scoped>

</style>
