<template>
  <div class="container">
    <template v-for="hole in holes">
      <input type="radio" :id="hole" :value="hole" v-model="pickedHole" />
      <label class="label" :for="hole">{{ hole }}</label>
    </template>
    <br>
    <template v-for="bait in baits">
      <input type="radio" :id="bait" :value="bait" v-model="pickedBait" />
      <label class="label" :for="bait">{{ bait }}</label>
    </template>
    <br>
    <ClockComponent
        :currentTime="currentTime"
        :isCantha="isCantha"
    />

    <div class="mapFishContainer" :style="{ 'max-height': mapFish.length === 21 ? '600px' : '400px' }">
      <FishCard
          @click="pickFish(mFish)"
          class="mapFishItem"
          v-for="mFish in mapFish"
          :fish="mFish"
          :dailyFish="dailyFish"
          :expanded="true"
          :clockPhase="clockPhase"
          :pickedHole="pickedHole"
          :pickedBait="pickedBait"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import allFish from '../data/fish.json';
import FishCard from "./FishCard.vue";
import ClockComponent from "./ClockComponent.vue";
import {Fish} from "../models/Fish";
import {computed, ref} from "vue";
import {isFishCantha} from "../util/isCantha";
import {getCurrentClockPhase} from "../util/clockPhase";

const props = defineProps<{
  dailyFish: Fish,
  currentTime: Date,
}>()

const mapFish = allFish.filter(f => f.region === props.dailyFish.region);

const pickedHole = ref(props.dailyFish.hole);
const pickedBait = ref(props.dailyFish.bait);

const holes = [...new Set(mapFish.map(f => f.hole))].filter(h => !h.includes("Open Water"));
console.log(holes);

const baits = [...new Set(mapFish.map(f => f.bait))];
console.log(baits);

const isCantha = computed(() => {
  return isFishCantha(props.dailyFish);
});

const clockPhase = computed(() => {
  return getCurrentClockPhase(isCantha.value, props.currentTime);
})

function pickFish(fish: Fish) {
  if (!fish.hole.includes("Open Water")) {
    pickedHole.value = fish.hole;
  }
  pickedBait.value = fish.bait;
}
</script>

<style scoped>
.mapFishContainer {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  max-height: 500px;
  align-items: flex-start;
  gap: 5px 0;
}

.label {
  margin-left: 4px;
  margin-right: 8px;
}
</style>