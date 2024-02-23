<script setup lang="ts">
// Ref and Computed allow for the creation of reactive properties
import { ref, computed } from "vue";
// DateTime is a class from the Luxon library that provides a better API for working with dates and times
import { DateTime } from "luxon";
// TimeLinePost is a type that represents the shape of a post
import { TimeLinePost, today, thisWeek, thisMonth } from "../posts";
import TimelineItem from "./TimelineItem.vue";

// casting an array as a readonly tuple with `as const`
const periods = ["Today", "This Week", "This Month"] as const;
// we can derive the type of the array elements using the `typeof` operator
type Period = (typeof periods)[number];

// ref creates a reactive property
const selectedPeriod = ref<Period>("Today");

// functions can be used to update reactive properties
function selectPeriod(period: Period) {
  console.log(period);
  selectedPeriod.value = period;
}

// computed properties are reactive and will update when their dependencies change
// in this case, the computed property `posts` depends on `selectedPeriod`
// We pass in <TimeLinePost[]> as the type of the computed property
const posts = computed<TimeLinePost[]>(() => {
  return [today, thisWeek, thisMonth]
    .map((post) => ({
      ...post,
      created: DateTime.fromISO(post.created),
    }))
    // filter the posts based on the selected period
    .filter((post) => {
      if (selectedPeriod.value === "Today") {
        // DateTime.now() returns the current date and time
        // DateTime.now().minus({ day: 1 }) returns the date and time 1 day ago
        return post.created >= DateTime.now().minus({ day: 1 });
      }
      if (selectedPeriod.value === "This Week") {
        // DateTime.now().minus({ week: 1 }) returns the date and time 1 week ago
        return post.created >= DateTime.now().minus({ week: 1 });
      }
     
      return post;
    });
});
</script>

<!-- The Timeline component is a navigation component that allows users to filter posts by time period. It uses the TimelineItem component to display the filtered posts -->

<!-- :class="{ 'is-active': period === selectedPeriod }" is a conditional class binding that applies the is-active class when the period matches the selectedPeriod -->

<!-- @click="selectPeriod(period)" is an event listener that calls the selectPeriod function when a period is clicked -->
<!-- v-for="post in posts" iterates over the filtered posts and renders a TimelineItem component for each post -->
<!-- :post="post" passes the post as a prop to the TimelineItem component -->

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
