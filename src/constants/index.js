export const statusTypes = {
  RESETTING: "RESETTING",
  PLAY_CARDS: "PLAY_CARDS",
  SEND_CARDS_TO_ATTACK: "SEND_CARDS_TO_ATTACK",
  CARDS_TO_ATTACK: "CARDS_TO_ATTACK",
};

const SUITS = [
  {
    name: "hearts",
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
    name: "clovers", // diamante
    key: "C",
  },
];

const shuffle = (list) => {
  return [...list].sort(() => {
    return Math.random() > 0.5 ? -1 : 1;
  });
};

export const DECK = (() => {
  let list = [];

  SUITS.forEach((suit) => {
    Array.from({ length: 10 }, (v, k) => 1 + k).forEach((n) => {
      list.push(`${n}_${suit.key}`);
    });
  });

  return list;
})();

export const deckUtils = {
  clone: (deck) => {
    return [...deck];
  },
  shuffle: (deck) => {
    return shuffle([...deck]);
  },
  pick: (deck, num) => {
    const newDeck = [...deck];
    const from = newDeck.length - num;
    const picked = newDeck.splice(from, num);

    return [picked, newDeck];
  },
};

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

export const createENEMIES = () => {
  const jacks = SUITS.map((suit) => {
    return `J_${suit.key}`;
  });
  const queens = SUITS.map((suit) => {
    return `Q_${suit.key}`;
  });
  const kings = SUITS.map((suit) => {
    return `K_${suit.key}`;
  });

  return [...shuffle(kings), ...shuffle(queens), ...shuffle(jacks)];
};

export const langOptions = [
  {
    text: "English",
    value: "EN",
  },
  {
    text: "Español",
    value: "ES",
  },
];

export const defaultLanguage = "EN";
