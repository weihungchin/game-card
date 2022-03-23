import type { Card } from "./Card";
import { Deck } from "./Deck";
import type { Player } from "./Player";

export class Game {
  remainingCards: Card[];
  players: Player[];
  highestScorePlayer: Player | null;
  lowestScorePlayer: Player | null;

  constructor() {
    this.remainingCards = [];
    this.players = [];
    this.highestScorePlayer = null;
    this.lowestScorePlayer = null;
  }
  start(players: Player[]) {
    this.players = [...players];
    const deck = new Deck();
    deck.createDeck();
    deck.shuffleDeck();
    this.resetRemainingCards(deck);
  }

  dealCard(cardIndex: number, playerName: string): Card {
    const selectedCard = this.remainingCards[cardIndex - 1];
    this.remainingCards = this.remainingCards.filter((_, index) => index !== cardIndex - 1);
    this.players = this.players.map((p) => {
      if (p.playerName === playerName) {
        return {
          ...p,
          currentHand: selectedCard,
          playerCards: [...p.playerCards, selectedCard],
        };
      }
      return p;
    });
    return selectedCard;
  }

  calculateRoundWinner(): Player {
    const sortByRankThenSuit = (a: any, b: any): number => {
      return b.currentHand.rankValue - a.currentHand.rankValue || b.currentHand.suitValue - a.currentHand.suitValue;
    };

    const result = [...this.players].sort(sortByRankThenSuit);
    return result[0];
  }

  updatePlayerScore(winnerName: string) {
    this.players = this.players.map((p) => {
      const scores = p.playerName === winnerName ? p.scores + 1 : p.scores;
      return {
        ...p,
        scores,
      };
    });
  }

  calculateGameWinnerAndLoser() {
    const scoreRankDesc = [...this.players].sort((a, b) => b.scores - a.scores);
    this.highestScorePlayer = scoreRankDesc[0];
    this.lowestScorePlayer = scoreRankDesc[scoreRankDesc.length - 1];
  }

  private resetRemainingCards(deck: Deck) {
    this.remainingCards = [...deck.cards];
  }

  isGameEnded(): boolean {
    const noMoreCard = this.remainingCards.length === 0;
    const notEnoughCards = this.remainingCards.length / this.players.length < 1;
    return noMoreCard || notEnoughCards;
  }

  rankPlayerScore() {
    const scoreRankAsc = [...this.players].sort((a, b) => a.scores - b.scores);
    this.highestScorePlayer = scoreRankAsc[scoreRankAsc.length - 1];
    this.lowestScorePlayer = scoreRankAsc[0];
  }
}
