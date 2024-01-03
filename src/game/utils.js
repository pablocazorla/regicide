import { SUITS, enemyValues } from "./constants";

export const shuffle = (list) => {
  return [...list].sort(() => {
    return Math.random() > 0.5 ? -1 : 1;
  });
};

export const pick = (deck, num) => {
  const newDeck = [...deck];
  const from = newDeck.length - num;
  const picked = newDeck.splice(from, num);

  return [picked, newDeck];
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

export const afterPause = (duration, callback) => {
  setTimeout(callback, duration);
};

export const flatListNum = (list) => {
  return list.map((v) => {
    const a = v.split("_")[0];
    const n = "JQK".indexOf(a) >= 0 ? enemyValues[a].attack : parseInt(a, 10);
    return n;
  });
};

export const disabledAllCardsInHand = (handPool) => {
  return handPool.reduce((obj, v) => {
    obj[v] = true;
    return obj;
  }, {});
};

export const getValues = (v, numbers) => {
  if (!v) {
    return [null, null];
  }
  const [a, b] = v.split("_");

  if (!numbers) {
    return [a, b];
  }
  const n = "JQK".indexOf(a) >= 0 ? enemyValues[a].attack : parseInt(a, 10);
  return [n, b];
};
