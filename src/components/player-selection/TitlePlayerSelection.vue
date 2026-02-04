<template>
  <h1 class="player-selection__title">Memory Game</h1>
  <p class="player-selection__subtitle">Insert your name to begin</p>
</template>

<style scoped>
.player-selection__title {
  font-size: 2rem;
  margin-bottom: 0.25rem;

  -webkit-text-fill-color: transparent;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  -webkit-background-clip: text;
  background-clip: text;
}

.player-selection__subtitle {
  margin-top: 0rem;
  margin-bottom: 1rem;

  color: var(--primary);

  font-weight: 600;
}
</style>
