import { getSavedGame, saveGame } from "@/store";
import { baseDeck } from "./constants";
import { shuffle, pick, createENEMIES, afterPause } from "./utils";

class GameClass {
  constructor(onUpdate) {
    this.onUpdate = onUpdate;
    //
    this.deckPool = [];
    this.discardPool = [];
    this.handPool = [];
    this.tablePool = [];
    //
    this.attackPool = [];
    this.enemyPool = [];
    this.enemyList = [];
    //
    this.enemyLife = 20;
    //
    this.jokers = 2;
  }
  reset() {
    const savedGame = getSavedGame();
    if (savedGame) {
      //
    } else {
      this.deckPool = shuffle(baseDeck);
      this.enemyPool = createENEMIES();
      this.enemyList = [...this.enemyPool];

      this.onUpdate(["deckPool", "enemyPool", "enemyList"]);

      afterPause(600, () => {
        const [newHand, newDeck] = pick(this.deckPool, 8);
        this.deckPool = newDeck;
        this.handPool = newHand;
        this.onUpdate(["deckPool", "handPool"]);
      });
    }
  }
}

export default GameClass;
