import { Card } from "./Card";

export class Player {
  playerName: string;
  playerCards: Card[];
  currentHand: Card;
  scores: number;

  constructor(name: string) {
    this.playerName = name;
    this.playerCards = [];
    this.currentHand = new Card("", "", 0, 0);
    this.scores = 0;
  }
}
