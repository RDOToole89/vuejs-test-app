<script setup lang="ts">
import { TimeLinePost } from '../../../posts';

// The TimelineItem component is a child component of the Timeline component
// It displays a single post
// defineProps is used to define the props that the component expects
defineProps<{
  post: TimeLinePost;
}>();
</script>

<template>
  <a 
    class="panel-block is-flex is-flex-direction-column is-align-items-flex-start">
    <a>{{ post.title }}</a>
    <div>{{ post.created.toFormat("d MMM") }}</div>
  </a>
</template>
