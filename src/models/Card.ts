type TCardContent = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j";

export interface ICard {
  id: number;
  content: TCardContent;
  cardValue: string;
  isVisible: boolean;

  showCard: () => void;
  hideCard: () => void;
}

export class Card implements ICard {
  id: number;
  content: TCardContent;
  cardValue: string;
  isVisible: boolean;

  constructor(
    id: number,
    content: TCardContent,
    cardValue: string,
    isVisible: boolean = false,
  ) {
    this.id = id;
    this.content = content;
    this.cardValue = cardValue;
    this.isVisible = isVisible;
  }

  showCard() {
    this.isVisible = true;
  }

  hideCard() {
    this.isVisible = false;
  }
}

export function seedCards() {
  let index = 0;

  const letters = Array.from({ length: 10 }, (_, i) =>
    String.fromCharCode(65 + i),
  ) as TCardContent[];

  return letters.flatMap((letter) =>
    [0, 1].map(() => new Card(++index, letter, letter)),
  );
}
