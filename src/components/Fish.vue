<template>
  <img :src="iconUrl"/>
</template>

<script setup lang="ts">
import { Fish } from "../models/Fish";

const props = defineProps<{
  fish: Fish,
}>()

const iconUrl = `https://render.guildwars2.com/file/${props.fish.icon}`

console.log(props.fish);
</script>

<style scoped>

</style>