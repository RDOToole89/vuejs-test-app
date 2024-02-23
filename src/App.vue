<!-- Each Vue Component has a <script></script> -->
<!-- The <script> tag is where you define the component's behavior -->
<!-- The <template> tag is where you define the component's markup -->
<!-- The <style> tag is where you define the component's styles -->
<script setup lang="ts">
import Timeline from "./components/Timeline.vue";
</script>

<template>
  <div class="section">
    <div class="container">
      <Timeline />
    </div>
  </div>
</template>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css";
</style>
