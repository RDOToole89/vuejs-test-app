<script setup lang="ts">
import { usePosts } from "../stores/posts";
import TimelineItem from "./TimelineItem.vue";
import { periods } from "../constants";

const postsStore = usePosts();

</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        :class="{ 'is-active': period === postsStore.selectedPeriod }"
        @click="postsStore.setSelectedPeriod(period)"
      >
        {{ period }}
      </a>
    </span>

    <TimelineItem v-for="post in postsStore.filteredPosts" :key="post.id" :post="post" />
  </nav>
</template>
