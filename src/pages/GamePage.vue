<template>
  <main class="memory-board">
    <MemoryCounter
      :value="gameStore.rounds"
      :player="playerStore.currentPlayerName"
    />

    <section class="memory-board__container">
      <MemoryCard
        v-for="card in gameStore.gameCards"
        :card="card"
        @click="gameStore.executePlay(card)"
        :key="card.id"
      >
      </MemoryCard>
    </section>

    <WinnerMessage v-if="gameStore.endGame">
      <ButtonApp class="winner-message__button" @click="gameStore.startGame">
        Play again
      </ButtonApp>
      <ButtonApp
        class="winner-message__button"
        variation="secondary"
        @click="$router.push({ name: routeNames.home })"
      >
        Change player
      </ButtonApp>
    </WinnerMessage>
  </main>
</template>

<script setup lang="ts">
import { watch } from "vue";
import MemoryCard from "../components/memory-board/MemoryCard.vue";
import MemoryCounter from "../components/memory-board/MemoryCounter.vue";
import WinnerMessage from "../components/memory-board/WinnerMessage.vue";
import ButtonApp from "../components/ui/ButtonApp.vue";
import { routeNames } from "../routes";
import { useGameStore } from "../store/game";
import { usePlayersStore } from "../store/player";

const gameStore = useGameStore();
const playerStore = usePlayersStore();

watch(
  () => gameStore.endGame,
  (hasEnded) => {
    if (!hasEnded) return;

    playerStore.addPlayerToRanking({
      name: playerStore.currentPlayerName,
      steps: gameStore.rounds,
    });
  },
);
</script>

<style scoped>
.memory-board__container {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 1rem;
}
</style>
