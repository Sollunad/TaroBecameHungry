<template>
  <div class="container" :style="{ 'border': `solid 2px ${rarityColors.get(fish.rarity)}`, 'background-color': getBackgroundColor() }">
    <div class="header">
      <img class="icon" :src="iconUrl" width="48" height="48"/>
      <h3 class="name">{{fish.name}}</h3>
    </div>
    <div class="body" v-if="expanded">
      <div class="region">{{fish.region}} Fisher</div>
      <div class="hole">Hole: {{fish.hole}}</div>
      <div class="bait">Bait: {{fish.bait}}</div>
      <div class="time">Time: {{fish.time}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Fish} from "../models/Fish";
import {Rarity} from "../models/Rarity";
import {Time} from "../models/Time";

const props = defineProps<{
  fish: Fish,
  dailyFish?: Fish,
  expanded: boolean,
}>()

const rarityColors = new Map<Rarity, string>([
    [Rarity.BASIC, "#AAAAAA"],
    [Rarity.FINE, "#62A4DA"],
    [Rarity.MASTERWORK, "#1A9306"],
    [Rarity.RARE, "#FCD00B"],
    [Rarity.EXOTIC, "#FFA405"],
    [Rarity.ASCENDED, "#FB3E8D"],
    [Rarity.LEGENDARY, "#4C139D"],
])

const iconUrl = `https://render.guildwars2.com/file/${props.fish.icon}`;



function isDailyFish() {
  return props.fish.name === props.dailyFish?.name;
}

function isWrongHole() {
  if (!props.dailyFish) {
    return false;
  }
  if (props.fish.hole.includes("Open Water") || props.dailyFish.hole.includes("Open Water")) {
    return false;
  }
  return props.fish.hole !== props.dailyFish.hole;
}

function isWrongBait() {
  if (!props.dailyFish) {
    return false;
  }
  if (props.fish.bait === "Any" || props.dailyFish.bait === "Any") {
    return false;
  }
  return props.fish.bait !== props.dailyFish.bait;
}

function isWrongTime() {
  if (!props.dailyFish) {
    return false;
  }
  if (props.fish.time === Time.ANY || props.dailyFish.time === Time.ANY || props.fish.time === Time.DUSKDAWN || props.dailyFish.time === Time.DUSKDAWN) {
    return false;
  }
  return props.fish.time !== props.dailyFish.time;
}

function getBackgroundColor() {
  if (isDailyFish()) {
    return '#877008';
  }
  if (isWrongHole() || isWrongBait() || isWrongTime()) {
    return '#b50b0b';
  }
  return '#282828';
}
</script>

<style scoped>
.container {
  width: 260px;
  border-radius: 15px;
  padding: 8px;
}

.header {
  display: flex;
  justify-content: center;
}

.name {
  margin-left: 16px;
  margin-top: 8px;
  text-align: center;
}

.body {
  text-align: center;
}
</style>