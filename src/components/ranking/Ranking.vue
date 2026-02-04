<template>
  <section class="ranking">
    <RankingCard
      v-for="(player, index) in userStore.rankingOrdered"
      :key="player.id"
      :position="index + 1"
      :player="player.name"
      :score="player.steps"
    />
  </section>
</template>

<script setup lang="ts">
import { usePlayersStore } from "../../store/player";
import RankingCard from "./RankingCard.vue";

const userStore = usePlayersStore();
</script>
