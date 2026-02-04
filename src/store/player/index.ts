import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export interface IPlayerScore {
  id: string;
  name: string;
  steps: number;
}

export const usePlayersStore = defineStore("players", {
  state: () => ({
    ranking: [
      { id: uuidv4(), name: "Trevor", steps: 20 },
      { id: uuidv4(), name: "Ana", steps: 60 },
      { id: uuidv4(), name: "John", steps: 40 },
    ] as IPlayerScore[],
    currentPlayerName: "",
  }),

  getters: {
    rankingOrdered: (state) =>
      state.ranking.slice().sort((a, b) => a.steps - b.steps),
  },

  actions: {
    setCurrentPlayer(aPlayerName: string) {
      this.currentPlayerName = aPlayerName;
    },
    addPlayerToRanking(aPlayerScore: Omit<IPlayerScore, "id">) {
      this.ranking.push({ id: uuidv4(), ...aPlayerScore });
    },
  },
});
