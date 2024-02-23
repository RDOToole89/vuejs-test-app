<script setup lang="ts">
import { ref, computed } from "vue";
import { DateTime } from "luxon";
import { TimeLinePost, today, thisWeek, thisMonth } from "../posts";
import TimelineItem from "./TimelineItem.vue";

// casting an array as a readonly tuple with `as const`
const periods = ["Today", "This Week", "This Month"] as const;
// we can derive the type of the array elements using the `typeof` operator
type Period = (typeof periods)[number];

const selectedPeriod = ref<Period>("Today");

function selectPeriod(period: Period) {
  console.log(period);
  selectedPeriod.value = period;
}

// computed properties are reactive and will update when their dependencies change

const posts = computed<TimeLinePost[]>(() => {
  return [today, thisWeek, thisMonth]
    .map((post) => ({
      ...post,
      created: DateTime.fromISO(post.created),
    }))
    .filter((post) => {
      if (selectedPeriod.value === "Today") {
        return post.created >= DateTime.now().minus({ day: 1 });
      }
      if (selectedPeriod.value === "This Week") {
        return post.created >= DateTime.now().minus({ week: 1 });
      }
     
      return post;
    });
});
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        :class="{ 'is-active': period === selectedPeriod }"
        @click="selectPeriod(period)"
      >
        {{ period }}
      </a>
    </span>

    <TimelineItem 
      v-for="post in posts" 
      :key="post.id" 
      :post="post" 
    />

  </nav>
</template>
