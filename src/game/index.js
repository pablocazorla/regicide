import { getSavedGame, saveGame } from "@/store";
import {
  baseDeck,
  statusTypes,
  playCardsFromHandNote,
  enemyValues,
} from "./constants";
import {
  shuffle,
  pick,
  createENEMIES,
  afterPause,
  flatListNum,
  disabledAllCardsInHand,
  getValues,
} from "./utils";

class GameClass {
  constructor(onUpdate, setAppStatus, setJokersToWin) {
    this.onUpdate = onUpdate;
    this.setAppStatus = setAppStatus;
    this.setJokersToWin = setJokersToWin;
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
    this.payDamagePool = [];
    this.isPayingDamage = false;
    this.paymentTotal = 0;
    this.payDamageButtonDisabled = true;
    //
    this.enemyLife = 20;
    //
    this.jokers = 0;
    this.enabledButtonJokers = true;
    //
    this.status = statusTypes.RESETTING;
    //
    this.handDisabled = {};

    this.tableAttack = null;
    this.currentSuit = null;
    //

    this.note = {
      icon: "",
      text: null,
      values: [],
      disable: false,
      textButton: null,
      action: null,
    };

    //
    this.attackSteps = [];
    this.attackStepIndex = 0;
    //

    this.defenseDamage = 0;
    this.enemyAttackTotal = 0;
    this.nextEnemyLife = 0;
  }
  reset() {
    const savedGame = null; //getSavedGame();
    if (savedGame) {
      const {
        handPool,
        enemyLife,
        enemyPool,
        enemyList,
        deckPool,
        discardPool,
        jokers,
      } = savedGame;
      //
      this.handPool = handPool;
      this.enemyLife = enemyLife;
      this.enemyPool = enemyPool;
      this.enemyList = enemyList;
      this.deckPool = deckPool;
      this.discardPool = discardPool;
      this.jokers = jokers;

      this.status = statusTypes.PLAY_CARDS;
      this.note = playCardsFromHandNote;

      const currentEnemy = this.enemyPool[this.enemyPool.length - 1];
      this.enemySuit = getValues(currentEnemy)[1];

      this.onUpdate([
        "handPool",
        "enemyLife",
        "enemyPool",
        "enemyList",
        "deckPool",
        "discardPool",
        "jokers",
        "note",
        "enemySuit",
      ]);

      //
    } else {
      this.deckPool = shuffle(baseDeck);
      this.enemyList = createENEMIES();
      this.enemyPool = [...this.enemyList];
      this.jokers = 2;

      const currentEnemy = this.enemyPool[this.enemyPool.length - 1];
      this.enemySuit = getValues(currentEnemy)[1];

      this.onUpdate([
        "deckPool",
        "enemyPool",
        "enemyList",
        "jokers",
        "enemySuit",
      ]);

      afterPause(600, () => {
        const [newHand, newDeck] = pick(this.deckPool, 3);
        this.deckPool = newDeck;
        this.handPool = newHand;
        this.status = statusTypes.PLAY_CARDS;

        this.note = playCardsFromHandNote;

        this.onUpdate([
          "discardPool",
          "deckPool",
          "handPool",
          "getHandDisabled",
          "note",
        ]);
      });
    }
  }
  moveCardsBetweenPools(cardList, originPoolName, destinyPoolName) {
    this[originPoolName] = this[originPoolName].filter((card) => {
      return cardList.indexOf(card) < 0;
    });
    this[destinyPoolName] = this[destinyPoolName].concat(cardList);
  }
  onClickHandCard(card) {
    if (this.status === statusTypes.PLAY_CARDS) {
      this.moveCardsBetweenPools([card], "handPool", "tablePool");
      this.setHandDisabled();
      this.setTableAttack();
      this.note = { text: null };
      this.onUpdate([
        "handPool",
        "tablePool",
        "handDisabled",
        "tableAttack",
        "note",
      ]);
    }
    if (this.status === statusTypes.CARDS_TO_ATTACK && this.isPayingDamage) {
      if (this.payDamagePool.indexOf(card) >= 0) {
        this.payDamagePool = [...this.payDamagePool].filter((c) => {
          return c !== card;
        });
      } else {
        this.payDamagePool.push(card);
      }

      this.paymentTotal = this.payDamagePool.reduce((total, v) => {
        const [num] = getValues(v, true);
        return total + num;
      }, 0);

      this.setHandDisabled();

      this.payDamageButtonDisabled = this.paymentTotal < this.enemyAttackTotal;

      this.onUpdate([
        "payDamagePool",
        "payDamageButtonDisabled",
        "handDisabled",
      ]);
    }
  }
  onClickTableCard(card) {
    if (this.status === statusTypes.PLAY_CARDS) {
      this.moveCardsBetweenPools([card], "tablePool", "handPool");
      this.setHandDisabled();
      this.setTableAttack();
      if (!this.tablePool.length) {
        this.note = playCardsFromHandNote;
      }
      this.onUpdate([
        "tablePool",
        "handPool",
        "handDisabled",
        "tableAttack",
        "note",
      ]);
    }
  }
  setHandDisabled() {
    this.handDisabled = (() => {
      if (this.status === statusTypes.PLAY_CARDS) {
        if (this.tablePool.length && this.handPool.length) {
          // EVALUATE HAND AND TABLE
          const tableFlat = flatListNum(this.tablePool);

          // If is played an A
          if (tableFlat.indexOf(1) >= 0) {
            if (tableFlat.length === 1) {
              // The first card is an A
              return {};
            } else {
              // It's already played an A and another card
              return disabledAllCardsInHand(this.handPool);
            }
          }

          // It's not played yet an A: Could I?
          const A_enabled = tableFlat.length === 1;

          // First card value
          const firstCardValue = tableFlat[0];

          if (firstCardValue <= 5) {
            // If the first card is a 5 or less
            const valueTotal = tableFlat.reduce((init, n) => {
              return init + n;
            }, 0);

            if (valueTotal >= 10) {
              // If the combined cards value reach the limit.
              return disabledAllCardsInHand(this.handPool);
            } else {
              // Enabled only "A" cards and combined cards
              return this.handPool.reduce((obj, v) => {
                const n = v.split("_")[0];
                if ((n === "1" && A_enabled) || n === `${firstCardValue}`) {
                  return obj;
                }
                obj[v] = true;
                return obj;
              }, {});
            }
          }
          // The first card is a bigger than 5
          // Enabled only "A".
          return this.handPool.reduce((obj, v) => {
            const n = v.split("_")[0];
            if (n === "1" && A_enabled) {
              return obj;
            }
            obj[v] = true;
            return obj;
          }, {});
        }

        return {};
      }
      if (this.status === statusTypes.CARDS_TO_ATTACK && this.isPayingDamage) {
        if (this.paymentTotal >= this.enemyAttackTotal) {
          return this.handPool.reduce((obj, v) => {
            if (this.payDamagePool.indexOf(v) < 0) {
              obj[v] = true;
            }
            return obj;
          }, {});
        }
        return {};
      }
      return disabledAllCardsInHand(this.handPool);
    })();
  }
  setTableAttack() {
    if (this.tablePool.length) {
      const { powers, attackBase } = this.tablePool.reduce(
        (obj, card) => {
          const [cardAttack, cardSuit] = getValues(card, true);

          if (cardSuit !== this.enemySuit) {
            obj.powers[cardSuit] = true;
          }
          obj.attackBase += cardAttack;

          return obj;
        },
        {
          powers: {},
          attackBase: 0,
        }
      );

      const totalAttack = powers?.C ? 2 * attackBase : attackBase;
      this.tableAttack = {
        powers,
        attackBase,
        totalAttack,
      };
    } else {
      this.tableAttack = null;
    }
  }
  onClickAttackButton() {
    this.status = statusTypes.CARDS_TO_ATTACK;
    this.moveCardsBetweenPools(this.tablePool, "tablePool", "attackPool");
    this.setHandDisabled();

    const { powers, attackBase, totalAttack } = this.tableAttack;

    this.defenseDamage += powers?.S ? attackBase : 0;
    //
    const [enemyLetter] = getValues(this.enemyPool[this.enemyPool.length - 1]);
    const enemyAttackPartial = enemyValues[enemyLetter].attack;
    this.enemyAttackTotal = Math.max(
      0,
      enemyAttackPartial - this.defenseDamage
    );
    this.nextEnemyLife = this.enemyLife - totalAttack;

    console.log("this.enemyAttackTotal", this.enemyAttackTotal);

    this.attackSteps = [];
    this.attackStepIndex = 0;

    if (powers.H && this.discardPool.length) {
      this.attackSteps.push("H");
    }
    if (powers.D) {
      this.attackSteps.push("D");
    }
    if (powers.C) {
      this.attackSteps.push("C");
    }
    this.attackSteps.push("APPLY_ATTACK");
    this.attackSteps.push("AFTER_ATTACK");
    if (powers.S && this.nextEnemyLife > 0) {
      this.attackSteps.push("S");
    }
    //
    if (this.nextEnemyLife > 0 && this.enemyAttackTotal > 0) {
      this.attackSteps.push("PAY_DAMAGE");
    }
    //
    this.attackSteps.push("END_ATTACK");
    this.attackSteps.push("SAVE_GAME");

    //
    this.onUpdate(["tablePool", "attackPool", "handDisabled", "defenseDamage"]);

    afterPause(600, () => {
      this.evaluateStepAttack();
    });
  }
  evaluateStepAttack() {
    const currentStep = this.attackSteps[this.attackStepIndex] || "";

    const { attackBase, totalAttack } = this.tableAttack;

    switch (currentStep) {
      case "H":
        // Heal from discard

        const discardPoolShuffled = shuffle(this.discardPool);

        const cardsToRecover = discardPoolShuffled.slice(0, attackBase);

        const newDiscardPool =
          attackBase >= discardPoolShuffled.length
            ? []
            : discardPoolShuffled.slice(attackBase, discardPoolShuffled.length);

        this.note = {
          icon: "H",
          text:
            cardsToRecover.length === 1 ? "power.H.singular" : "power.H.plural",
          values: [cardsToRecover.length],
          textButton: "btn.Heal",
          action: () => {
            this.discardPool = newDiscardPool;
            this.deckPool = cardsToRecover.concat([...this.deckPool]);
            this.attackStepIndex += 1;

            this.onUpdate(["discardPool", "deckPool"]);
            //
            afterPause(600, () => {
              this.evaluateStepAttack();
            });
          },
        };
        this.onUpdate(["note"]);
        //
        break;
      case "D":
        this.note = {
          icon: "D",
          text: "power.D",
          values: [attackBase],
          textButton: "btn.Draw",
          action: () => {
            // Draw from deck
            const countToDraw = Math.min(attackBase, 8 - this.handPool.length);

            const newDeckPool = [...this.deckPool].slice(
              0,
              this.deckPool.length - countToDraw
            );
            const cardsToDraw =
              countToDraw >= this.deckPool.length
                ? [...this.deckPool]
                : [...this.deckPool].slice(
                    this.deckPool.length - countToDraw,
                    this.deckPool.length
                  );

            this.handPool = [...this.handPool].concat(cardsToDraw);
            this.deckPool = newDeckPool;
            this.setHandDisabled();
            this.attackStepIndex += 1;

            this.onUpdate(["handPool", "deckPool", "handDisabled"]);

            afterPause(600, () => {
              this.evaluateStepAttack();
            });
          },
        };
        this.onUpdate(["note"]);
        break;
      case "C":
        this.note = {
          icon: "C",
          text: "power.C",
          values: [totalAttack],
          action: () => {
            this.attackStepIndex += 1;
            afterPause(600, () => {
              this.evaluateStepAttack();
            });
          },
        };
        this.onUpdate(["note"]);
        break;
      case "APPLY_ATTACK":
        //

        this.note = {
          icon: "attack",
          text: "applyAttack",
        };

        this.onUpdate(["note"]);

        afterPause(500, () => {
          this.enemyLife = this.nextEnemyLife;
          this.onUpdate(["enemyLife"]);
        });

        afterPause(1000, () => {
          this.attackStepIndex += 1;
          this.evaluateStepAttack();
        });
        break;
      case "AFTER_ATTACK":
        //
        this.note = {
          icon: "attack",
          text: (() => {
            if (this.enemyLife > 0) {
              return "afterAttack.1";
            }
            if (this.enemyLife === 0) {
              return "afterAttack.2";
            }
            if (this.enemyLife < 0) {
              return "afterAttack.3";
            }
          })(),
          action: () => {
            afterPause(600, () => {
              this.attackStepIndex += 1;
              this.evaluateStepAttack();
            });
          },
        };
        this.onUpdate(["note"]);
        break;
      case "S":
        //
        this.note = {
          icon: "S",
          text: "power.S",
          values: [this.defenseDamage],
          action: () => {
            afterPause(300, () => {
              this.attackStepIndex += 1;
              this.evaluateStepAttack();
            });
          },
        };
        this.onUpdate(["note"]);
        break;
      case "PAY_DAMAGE":
        //

        const handDefense = this.handPool.reduce((total, v) => {
          total += getValues(v, true)[0];
          return total;
        }, 0);

        const canPlay =
          this.enemyAttackTotal < handDefense ||
          (this.enemyAttackTotal === handDefense && this.jokers > 0);

        if (canPlay) {
          this.isPayingDamage = true;
          this.payDamagePool = [];
          this.paymentTotal = 0;
          this.payDamageButtonDisabled = true;
          this.setHandDisabled();

          this.note = {
            icon: "defense",
            text: "payDamage.2",
            textButton: "btn.payDamage",
            values: [this.enemyAttackTotal],
            forPayDamageButton: true,
            action: () => {
              this.onPayDamage();
            },
          };
          this.onUpdate(["note", "payDamageButtonDisabled", "handDisabled"]);
        } else {
          if (this.jokers > 0) {
            this.enabledButtonJokers = false;
            //
            this.note = {
              icon: "joker",
              text: "payDamage.1.5",
              textButton: "useJoker",
              action: () => {
                this.onUseJoker();
                this.enabledButtonJokers = true;
                this.onUpdate(["enabledButtonJokers"]);
                afterPause(1300, () => {
                  this.evaluateStepAttack();
                });
              },
            };
            this.onUpdate(["note", "enabledButtonJokers"]);
          } else {
            this.note = {
              icon: "warning",
              text: "payDamage.1",
              action: () => {
                // LOST ACTION
                this.setAppStatus(3);
              },
            };
            this.onUpdate(["note"]);
          }
        }

        break;
      case "END_ATTACK":
        this.moveCardsBetweenPools(
          this.attackPool,
          "attackPool",
          "discardPool"
        );
        this.note = { text: null };
        this.onUpdate(["note", "attackPool", "discardPool"]);

        afterPause(400, () => {
          const currentEnemy = this.enemyPool[this.enemyPool.length - 1];
          /* const [enemyNum] = getValues(currentEnemy, true);
          this.enemyLife = enemyNum; */

          if (this.enemyLife <= 0) {
            if (this.enemyLife === 0) {
              this.moveCardsBetweenPools(
                [currentEnemy],
                "enemyPool",
                "deckPool"
              );
            }
            if (this.enemyLife < 0) {
              this.moveCardsBetweenPools(
                [currentEnemy],
                "enemyPool",
                "discardPool"
              );
            }
            if (this.enemyPool.length) {
              const nextEnemy = this.enemyPool[this.enemyPool.length - 1];
              const [nextEnemyNum, nextEnemySuit] = getValues(nextEnemy);
              this.enemyLife = enemyValues[nextEnemyNum].life;
              this.enemySuit = nextEnemySuit;
              this.defenseDamage = 0;
            }

            this.onUpdate([
              "enemyLife",
              "enemySuit",
              "enemyPool",
              "deckPool",
              "discardPool",
              "defenseDamage",
            ]);
          }
        });

        afterPause(600, () => {
          if (!this.enemyPool.length) {
            // WIN
            afterPause(400, () => {
              this.setJokersToWin(this.jokers);
              this.setAppStatus(4);
            });
          } else {
            this.attackStepIndex += 1;
            this.evaluateStepAttack();
          }
        });

        //
        break;
      case "SAVE_GAME":
        //
        this.saveGameToStore();
        this.status = statusTypes.PLAY_CARDS;
        this.setHandDisabled();
        this.note = playCardsFromHandNote;
        this.onUpdate(["note", "handDisabled"]);
        break;
      default:
      //
    }
  }
  onPayDamage() {
    if (this.paymentTotal >= this.enemyAttackTotal) {
      // AFTER SELECTION OF CARDS
      this.moveCardsBetweenPools(this.payDamagePool, "handPool", "discardPool");
      this.isPayingDamage = false;
      this.payDamagePool = [];
      this.setHandDisabled();
      this.onUpdate([
        "handPool",
        "payDamagePool",
        "discardPool",
        "handDisabled",
      ]);
      afterPause(800, () => {
        this.attackStepIndex += 1;
        this.evaluateStepAttack();
      });
    }
  }
  saveGameToStore() {
    const {
      handPool,
      enemyLife,
      enemyPool,
      enemyList,
      deckPool,
      discardPool,
      jokers,
    } = this;

    saveGame({
      handPool,
      enemyLife,
      enemyPool,
      enemyList,
      deckPool,
      discardPool,
      jokers,
    });
  }
  onUseJoker() {
    if (this.jokers > 0) {
      this.jokers -= 1;
      this.moveCardsBetweenPools(this.handPool, "handPool", "discardPool");

      if (this.tablePool.length) {
        this.moveCardsBetweenPools(this.tablePool, "tablePool", "discardPool");
      }
      this.onUpdate(["tablePool", "handPool", "discardPool", "jokers"]);

      afterPause(600, () => {
        // Draw from deck
        const countToDraw = 8;

        const newDeckPool = [...this.deckPool].slice(
          0,
          this.deckPool.length - countToDraw
        );
        const cardsToDraw =
          countToDraw >= this.deckPool.length
            ? [...this.deckPool]
            : [...this.deckPool].slice(
                this.deckPool.length - countToDraw,
                this.deckPool.length
              );

        this.handPool = [...this.handPool].concat(cardsToDraw);
        this.deckPool = newDeckPool;

        if (this.status === statusTypes.PLAY_CARDS) {
          this.note = playCardsFromHandNote;
          this.onUpdate(["note"]);
        }

        this.setHandDisabled();

        this.onUpdate(["handDisabled", "handPool", "deckPool"]);

        this.saveGameToStore();
      });
    }
  }
}

export default GameClass;
