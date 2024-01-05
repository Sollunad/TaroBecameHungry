<template>
  <div class="container">
    <FishCard
        class="fish"
        v-for="singleFish in rareFish"
        :fish="singleFish"
        :expanded="false"
        @click="$emit('picked', singleFish)"
    />
  </div>
</template>

<script setup lang="ts">
import allFish from '../data/fish.json';
import FishCard from "./FishCard.vue";
import {Rarity} from "../models/Rarity";
import {Fish} from "../models/Fish";

const rareFish = allFish.filter(f => f.rarity === Rarity.RARE).sort((f1, f2) => f1.name < f2.name ? -1 : f2.name < f1.name ? 1 : 0) as Fish[];
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 1200px;
}

.fish {
  cursor: pointer;
}
</style>