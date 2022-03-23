<template>
  <div v-if="!gameState.startGame">
    <input placeholder="Key in number of players (2-6)" v-model="numberOfPlayers" @keyup.enter="onEnter" type="number" />
    <button @click="onEnter">Start</button>
  </div>
  <div v-if="gameState.startGame">
    <p>Remaining cards: {{ remainingCards }}</p>

    <br />
    <div v-if="gameState.roundEnded">
      <h2>Round Winner: {{ roundWinner?.playerName }}</h2>
      <button @click="startNewRound">Next Round</button>
    </div>
    <div v-if="!gameState.roundEnded">
      <h3>
        It's your turn: <b>{{ currentPlayer?.playerName }}</b>
      </h3>
      <h2 v-if="currentCard">You drew: {{ currentCard?.rank }} of {{ currentCard?.suit }}</h2>
      <input placeholder="Draw a card" type="number" @keyup.enter="onDrawCard" v-model="selectedCardNumber" />
      <button @click="onDrawCard">Draw</button>
    </div>

    <br />
    <button @click="restartGame()">Restart Game</button>
  </div>
</template>

<script setup lang="ts">
import type { Card } from "@/models/Card";
import { Game } from "@/models/Game";
import { Player } from "@/models/Player";
import { Ref, ref } from "vue";

const defaultNumberOfPlayers = 2;
const numberOfPlayers = ref(defaultNumberOfPlayers);
const remainingCards = ref(52);
const gameState = ref({
  startGame: false,
  roundEnded: false,
});
let game = new Game();
const currentPlayer: Ref<Player | null> = ref(null);
let currentTurn = 0;
const roundWinner: Ref<Player | null> = ref(null);
let selectedCardNumber: Ref<number | null> = ref(null);
const currentCard: Ref<Card | null> = ref(null);

function startNewRound() {
  gameState.value.roundEnded = false;
  if (game.isGameEnded()) {
    game.calculateGameWinnerAndLoser();
    alert(`Highest Score: ${game.highestScorePlayer?.playerName}, Lowest Score: ${game.lowestScorePlayer?.playerName}`);
    restartGame();
  } else {
    startNextRound();
  }
}

function startNextRound() {
  currentCard.value = null;
  currentTurn = 0;
  selectedCardNumber.value = null;
  roundWinner.value = null;
  currentPlayer.value = game.players[currentTurn];
  console.log(currentTurn);
  console.log(game.players);
}

function onEnter() {
  if (numberOfPlayers.value < 2 || numberOfPlayers.value > 6) {
    alert("Number of players must be 2 - 6");
  } else {
    startGame(createPlayers());
    currentPlayer.value = game.players[currentTurn];
  }
}

function createPlayers() {
  return Array(numberOfPlayers.value)
    .fill(0)
    .map((_, index) => new Player(`Player ${index}`));
}

function startGame(allPlayer: Player[]) {
  game.start(allPlayer);
  remainingCards.value = game.remainingCards.length;
  gameState.value.startGame = true;
}

function onDrawCard() {
  if (!selectedCardNumber.value) {
    alert("Please draw a card from the remaining cards ");
    return;
  }
  if (currentPlayer.value) {
    dealCard(currentPlayer.value.playerName);
    remainingCards.value = game.remainingCards.length;
    startNextTurn();
  }
}

function startNextTurn() {
  console.log("endRound ", currentTurn);
  if (currentTurn >= game.players.length - 1) {
    return endRound();
  }

  currentTurn += 1;
  currentPlayer.value = game.players[currentTurn];
  currentCard.value = null;
}

function endRound() {
  roundWinner.value = game.calculateRoundWinner();
  game.updatePlayerScore(roundWinner.value.playerName);
  gameState.value.roundEnded = true;
  currentPlayer.value = null;
  currentTurn = 0;
  selectedCardNumber.value = null;
  currentCard.value = null;
}

function dealCard(playerName: string) {
  if (selectedCardNumber.value && selectedCardNumber.value < game.remainingCards.length) {
    currentCard.value = game.dealCard(selectedCardNumber.value, playerName);
    alert(`You drew ${currentCard.value.rank} of ${currentCard.value.suit}`);
  }
}
function restartGame() {
  gameState.value.startGame = false;
  gameState.value.roundEnded = false;
  currentPlayer.value = null;
  currentTurn = 0;
  roundWinner.value = null;
  selectedCardNumber.value = null;
  currentCard.value = null;
  game = new Game();
}
</script>

<style scoped></style>
