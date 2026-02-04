<template>
  <button
    :class="{
      [variation]: variation,
    }"
    :disabled="disabled"
    @click="$emit('click')"
    :type="type"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface IProps {
  variation?: "primary" | "secondary";
  disabled?: boolean;
  type?: "submit" | "button";
}

withDefaults(defineProps<IProps>(), {
  variation: "primary",
  disabled: false,
  type: "button",
});
</script>

<style>
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;

  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: #646cff;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

button:disabled {
  cursor: not-allowed;

  opacity: 0.7;

  transition: opacity 500ms ease;
}

.primary {
  background-color: var(--primary);
  color: var(--on-primary);
}

.secondary {
  background-color: var(--secondary);
  color: var(--on-secondary);
}
</style>
