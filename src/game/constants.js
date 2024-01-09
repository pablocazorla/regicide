export const statusTypes = {
  RESETTING: "RESETTING",
  PLAY_CARDS: "PLAY_CARDS",
  SEND_CARDS_TO_ATTACK: "SEND_CARDS_TO_ATTACK",
  CARDS_TO_ATTACK: "CARDS_TO_ATTACK",
};

export const SUITS = [
  {
    name: "hearts", // corazones
    key: "H",
  },
  {
    name: "spades", // picas
    key: "S",
  },
  {
    name: "diamonds", // diamante
    key: "D",
  },
  {
    name: "clovers", // tréboles
    key: "C",
  },
];

export const baseDeck = (() => {
  let list = [];

  SUITS.forEach((suit) => {
    Array.from({ length: 10 }, (v, k) => 1 + k).forEach((n) => {
      list.push(`${n}_${suit.key}`);
    });
  });

  return list;
})();

export const enemyValues = {
  J: {
    attack: 10,
    life: 20,
  },
  Q: {
    attack: 15,
    life: 30,
  },
  K: {
    attack: 20,
    life: 40,
  },
};

export const playCardsFromHandNote = {
  icon: "idea",
  text: "playCardsFromHand",
  showModeSilence: true,
};
