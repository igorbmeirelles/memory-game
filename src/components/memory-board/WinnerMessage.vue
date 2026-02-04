<template>
  <section class="winner-message">
    <div>
      <ConfettiExplosion :particleCount="200" :force="0.3" class="mx-auto" />
      <p class="winner-message__title">You won the game</p>

      <section class="winner-message__actions">
        <slot />
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import ConfettiExplosion from "vue-confetti-explosion";
</script>

<style scoped>
.winner-message {
  position: absolute;
  inset: 0;

  display: grid;
  place-items: center;

  backdrop-filter: blur(4px);

  transition: backdrop-filter 2s ease-in-out;
}

.winner-message__title {
  font-size: 1.5rem;
  font-weight: 700;
}

.winner-message__actions {
  display: flex;
  gap: 1rem;
}
</style>
