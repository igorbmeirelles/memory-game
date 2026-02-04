<template>
  <div class="memory-board__counter--container">
    <p class="memory-board__counter">Rodadas: {{ value }}</p>
    <p class="memory-board__counter-player">Player: {{ player }}</p>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  value: number;
  player: string;
}

const props = defineProps<IProps>();
</script>

<style scoped>
.memory-board__counter--container {
  display: flex;
  align-items: baseline;

  text-align: initial;
}

.memory-board__counter-player {
  margin-inline-start: auto;
}

.memory-board__counter {
  margin-block: 0.5rem;

  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 700;
}
</style>
