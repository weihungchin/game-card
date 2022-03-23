import { Card } from "./Card";

export class Deck {
  cards: Card[];
  constructor() {
    this.cards = [];
  }
  createDeck() {
    const suits = ["clubs", "diamonds", "hearts", "spades"];
    const ranks = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "jack",
      "queen",
      "king",
      "ace",
    ];
    for (let s = 0; s < suits.length; s++) {
      for (let r = 0; r < ranks.length; r++) {
        this.cards.push(new Card(suits[s], ranks[r], s + 1, r + 1));
      }
    }
  }
  shuffleDeck() {
    let location1, location2, tmp;
    for (let i = 0; i < 1000; i++) {
      location1 = Math.floor(Math.random() * this.cards.length);
      location2 = Math.floor(Math.random() * this.cards.length);
      tmp = this.cards[location1];
      this.cards[location1] = this.cards[location2];
      this.cards[location2] = tmp;
    }
  }
}
