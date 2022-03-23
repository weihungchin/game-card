export class Card {
  suit: string;
  rank: string;
  suitValue: number;
  rankValue: number;
  index: number;

  constructor(
    suit: string,
    rank: string,
    suitValue: number,
    rankValue: number
  ) {
    this.suit = suit;
    this.rank = rank;
    this.rankValue = rankValue;
    this.suitValue = suitValue;
    this.index = 0;
  }
}
