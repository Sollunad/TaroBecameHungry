<template>
  <div>
    <h1 class="headline">Taro became hungry</h1>
    <RarePicker v-if="!dailyFish" @picked="pickedDailyFish"/>
    <DailyGuide v-else :dailyFish="dailyFish" @picked="pickedDailyFish"/>
  </div>
</template>

<script setup lang="ts">
import RarePicker from "./RarePicker.vue";
import {Fish} from "../models/Fish";
import {Ref, ref} from "vue";
import DailyGuide from "./DailyGuide.vue";

const dailyFish: Ref<Fish | null> = ref(null);

function pickedDailyFish(fish: Fish) {
  dailyFish.value = fish;
}
</script>

<style scoped>
.headline {
  margin-bottom: 16px;
}
</style>
