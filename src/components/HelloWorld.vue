<template>
  <div>
    <h1 class="headline">Taro became hungry</h1>
    <RarePicker
        v-if="!dailyFish"
        @picked="pickedDailyFish"/>
    <div v-else>
      <button class="button" @click="resetDailyFish">Reset</button>
      <DailyGuide
          :dailyFish="dailyFish"
          :currentTime="currentTime"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import RarePicker from "./RarePicker.vue";
import {Fish} from "../models/Fish";
import {computed, Ref, ref} from "vue";
import DailyGuide from "./DailyGuide.vue";

const dailyFish: Ref<Fish | null> = ref(null);

const currentTime = ref(new Date());

setInterval(() => {
  currentTime.value = new Date();
}, 1000);

function pickedDailyFish(fish: Fish) {
  dailyFish.value = fish;
}

function resetDailyFish() {
  dailyFish.value = null;
}
</script>

<style scoped>
.headline {
  margin-bottom: 16px;
}

.button {
  margin-bottom: 16px;
  margin-right: 8px;
  background-color: #2c3e50;
  color: #f8f8f8;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}
</style>
