<template>
  <p class="ranking__card-name">{{ value }}</p>
</template>

<script setup lang="ts">
interface IProps {
  value: string;
}

defineProps<IProps>();
</script>

<style scoped>
.ranking__card-name {
  font-weight: 600;
}
</style>
