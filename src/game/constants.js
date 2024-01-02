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
    name: "clovers", // diamante
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
