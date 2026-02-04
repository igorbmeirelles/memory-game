<template>
  <button
    class="memory-card"
    :class="{ flipped: card.isVisible }"
    @click="safeClick(card)"
    :disabled="card.isVisible"
  >
    <div class="memory-card__front memory-card__content">
      <span v-if="card.isVisible">{{ card.content }}</span>
    </div>
    <div class="memory-card__back memory-card__content"></div>
  </button>
</template>

<script setup lang="ts">
import type { ICard } from "../../models/Card";

const props = defineProps<{ card: ICard }>();
const emit = defineEmits(["click"]);

function safeClick(card: ICard) {
  if (props.card.isVisible) return;

  emit("click", card);
}
</script>

<style scoped>
.memory-card {
  position: relative;
  min-width: 6rem;
  aspect-ratio: 1 / 1;

  background-color: transparent;
  color: white;

  padding: 0;

  overflow: hidden;
}

@media (max-width: 768px) {
  .memory-card {
    min-width: 4rem;
  }
}

.memory-card:hover {
  filter: brightness(0.8);
  transition: filter 500ms ease;
}

.memory-card:disabled {
  cursor: not-allowed;
}

.memory-card__content {
  display: grid;
  place-items: center;

  text-transform: uppercase;
  font-weight: 700;

  width: 100%;
  height: 100%;
}

.memory-card__back {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);

  transform: rotateY(0);
  transition: transform 0.3s;
  transition-delay: 0;
}

.flipped .memory-card__back {
  transform: rotateY(90deg);
}

.memory-card__front {
  position: absolute;
  inset: 0;
  background-color: var(--primary);

  transform: rotateY(90deg);
  transition: transform 0.25s;
}

.flipped .memory-card__front {
  transform: rotateY(0);
  transition-delay: 0.25s;
}
</style>
