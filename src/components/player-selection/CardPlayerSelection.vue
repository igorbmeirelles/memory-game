<template>
  <section class="player-selection mb-4">
    <TitlePlayerSelection />

    <form @submit.prevent="startGame" class="player-selection__form">
      <InputApp
        placeholder="Name"
        name="player"
        v-model="userStore.currentPlayerName"
      />

      <ButtonApp type="submit" :disabled="!userStore.currentPlayerName">
        Begin
      </ButtonApp>
    </form>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

import TitlePlayerSelection from "../player-selection/TitlePlayerSelection.vue";
import InputApp from "../ui/InputApp.vue";
import ButtonApp from "../ui/ButtonApp.vue";
import { usePlayersStore } from "../../store/player";
import { useRouter } from "vue-router";
import { routeNames } from "../../routes";
import { useGameStore } from "../../store/game";

const router = useRouter();

const userStore = usePlayersStore();
const gameStore = useGameStore();

const currentPlayerValue = computed({
  get: () => userStore.currentPlayerName,
  set: (value) => {
    userStore.setCurrentPlayer(value);
  },
});

function startGame() {
  if (!currentPlayerValue.value) return;

  gameStore.startGame();

  router.push({ name: routeNames.game });
}
</script>

<style>
.player-selection {
  min-width: 21.25rem;
  max-width: 21.5rem;
  background-color: var(--background-mute);

  padding: 1rem;

  border-radius: 0.5rem;
}

@media (max-width: 360px) {
  .player-selection {
    max-width: 15rem;
    background-color: var(--background-mute);

    padding: 0.5rem;
  }
}

.player-selection__form {
  display: flex;
  flex-direction: column;
}
</style>
