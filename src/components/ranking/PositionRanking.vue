<template>
  <p class="ranking__card-position">{{ value }}</p>
</template>

<script setup lang="ts">
interface IProps {
  value: number;
}

defineProps<IProps>();
</script>

<style scoped>
.ranking__card-position {
  font-weight: 500;
  font-size: 0.75rem;
}
</style>
