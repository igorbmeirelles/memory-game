<template>
  <input
    class="player-selection__input mb-2"
    type="text"
    name="player"
    placeholder="Name"
    v-model="model"
  />
</template>

<script setup lang="ts">
interface IProps {
  placeholder: String;
  name: string;
}

const model = defineModel();
const props = defineProps<IProps>();
</script>

<style>
.player-selection__input {
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
}

.player-selection__input:focus::placeholder {
  padding: 0.5rem;
  transition: padding 250ms ease-in;
}
</style>
