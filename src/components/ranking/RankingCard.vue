<template>
  <div class="ranking__card">
    <PositionRanking :value="position" />
    <PlayerRanking :value="player" />
    <ScoreRanking :value="score" />
  </div>
</template>

<script setup lang="ts">
import PlayerRanking from "./PlayerRanking.vue";
import PositionRanking from "./PositionRanking.vue";
import ScoreRanking from "./ScoreRanking.vue";

interface IProps {
  position: number;
  player: string;
  score: number;
}

defineProps<IProps>();
</script>

<style scoped>
.ranking__card {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  background-color: var(--background-mute);

  border-radius: 0 0.5rem 0.5rem 0;

  padding-block: 0.5rem;
  padding-inline: 1rem;

  border-left: 4px solid var(--primary);

  transition:
    transform 0.2s ease,
    filter 0.2s ease;
}

@media (min-width: 768px) {
  .ranking__card:hover {
    transform: translateX(1.25rem);
    filter: brightness(0.9);
  }
}

.ranking__card + .ranking__card {
  margin-top: 1rem;
}
</style>
