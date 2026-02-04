<template>
  <header class="app-header">
    <RouterLink :to="{ name: routeNames.home }"> Home</RouterLink>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { routeNames } from "./routes";
</script>

<style scoped>
.app-header {
  position: absolute;
  top: 0;
  inset-inline: 0;

  padding-inline: 2rem;
  padding-block: 1rem;
  min-height: 3.25rem;
  text-align: end;
}

@media (max-width: 768px) {
  .app-header {
    padding: 1rem;
  }
}
</style>
