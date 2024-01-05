<template>
  <div class="container" :style="{ 'border': `solid 2px ${rarityColors.get(fish.rarity)}`, 'background-color': getBackgroundColor(), opacity: getOpacity() }">
    <div class="header">
      <img class="icon" :src="iconUrl" width="48" height="48"/>
      <h3 class="name">{{fish.name}}</h3>
    </div>
    <div class="body" v-if="expanded">
      <div class="region">{{fish.region}} Fisher</div>
      <div class="hole" :style="{ color: isWrongHole() ? '#FF0000' : '' }">Hole: {{fish.hole}}</div>
      <div class="bait" :style="{ color: isWrongBait() ? '#FF0000' : '' }">Bait: {{fish.bait}}</div>
      <div class="time" :style="{ color: isWrongTime() ? '#FF0000' : '' }">Time: {{fish.time}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Fish} from "../models/Fish";
import {Rarity} from "../models/Rarity";
import {ClockPhase} from "../models/ClockPhase";
import {Time} from "../models/Time";

const props = defineProps<{
  fish: Fish,
  dailyFish?: Fish,
  clockPhase?: ClockPhase,
  expanded: boolean,
  pickedHole?: string,
  pickedBait?: string,
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

const iconUrl = `https://render.guildwars2.com/file/${props.fish.icon}.png`;

function isDailyFish() {
  return props.fish.name === props.dailyFish?.name;
}

function isWrongHole() {
  if (!props.pickedHole || props.fish.hole.includes("Open Water")) {
    return false;
  }
  return props.fish.hole !== props.pickedHole;
}

function isWrongBait() {
  if (!props.pickedBait || props.fish.bait === "Any") {
    return false;
  }
  return props.fish.bait !== props.pickedBait;
}

function isWrongTime() {
  if (!props.clockPhase) {
    return false;
  }
  if (props.fish.time === Time.DUSKDAWN) {
    return props.clockPhase !== ClockPhase.DAWN && props.clockPhase !== ClockPhase.DUSK;
  }
  if (props.fish.time === Time.DAY) {
    return props.clockPhase === ClockPhase.NIGHT;
  }
  if (props.fish.time === Time.NIGHT) {
    return props.clockPhase === ClockPhase.DAY;
  }
  return false;
}

function getBackgroundColor() {
  if (isDailyFish()) {
    return '#877008';
  }
  return '#282828';
}

function getOpacity() {
  if (isWrongHole() || isWrongBait() || isWrongTime()) {
    return 0.3;
  }
  return 1;
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