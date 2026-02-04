<template>
  <p class="ranking__card-score">
    {{ value }}
  </p>
</template>

<script setup lang="ts">
interface IProps {
  value: number;
}

defineProps<IProps>();
</script>
<style>
.ranking__card-score {
  font-weight: 700;
  color: var(--primary);

  margin-inline-start: auto;
}
</style>
