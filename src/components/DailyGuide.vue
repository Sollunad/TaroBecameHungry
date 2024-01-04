<template>
  <div class="container">
    <div class="mapFishContainer" :style="{ 'max-height': mapFish.length === 21 ? '600px' : '400px' }">
      <FishCard class="mapFishItem" v-for="mFish in mapFish" :fish="mFish" :dailyFish="dailyFish" :expanded="true" @click="$emit('picked', mFish)"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import allFish from '../data/fish.json';
import FishCard from "./FishCard.vue";
import {Fish} from "../models/Fish";

const props = defineProps<{
  dailyFish: Fish,
}>()

const mapFish = allFish.filter(f => f.region === props.dailyFish.region);
</script>

<style scoped>
.mapFishContainer {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  max-height: 500px;
  align-items: flex-start;
  gap: 5px 0;
}

.mapFishItem {

}
</style>