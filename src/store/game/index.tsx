import { defineStore } from "pinia";
import { seedCards, type ICard } from "../../models/Card";

interface IGameState {
  shuffledCards: ICard[];
  chosenCards: ICard[];
  gameRounds: number;
}

export const useGameStore = defineStore("game", {
  state: (): IGameState => ({
    shuffledCards: [],
    chosenCards: [],
    gameRounds: 0,
  }),

  getters: {
    gameCards: (store) => store.shuffledCards,
    rounds: (store) => store.gameRounds,
    endGame: (store) =>
      store.shuffledCards.every((card) => card.isVisible) &&
      store.shuffledCards.length,
  },

  actions: {
    startGame() {
      const cards: ICard[] = seedCards();

      const shuffleCards = () => cards.sort(() => Math.random() - 0.5);

      this.shuffledCards = shuffleCards();
      this.chosenCards = [];
      this.gameRounds = 0;
    },

    executePlay(card: ICard): void {
      this.chosenCards.push(card);

      card.showCard();

      const hasChosenAtLeast2Cards = this.chosenCards.length > 1;

      if (!hasChosenAtLeast2Cards) {
        return;
      }

      const checkMatches = (): boolean => {
        const equalityValueCheck = this.chosenCards[0]?.cardValue;
        const matches = this.chosenCards.every(
          (card) => card.cardValue == equalityValueCheck,
        );

        return matches;
      };

      const cardsMatches = checkMatches();

      if (!cardsMatches) {
        const resetCardsAfterATimeout = (aTimeout: number = 1000) => {
          const copiedCards = [...this.chosenCards];

          setTimeout(() => {
            if (!cardsMatches) {
              copiedCards.forEach((card) => card.hideCard());
            }
          }, aTimeout);
        };

        resetCardsAfterATimeout();
      }

      this.chosenCards = [];
      this.gameRounds += 1;
    },
  },
});
