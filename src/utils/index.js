import { enemyValues } from "@/constants";

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

export const flatListNum = (list) => {
  return list.map((v) => {
    const a = v.split("_")[0];
    const n = "JQK".indexOf(a) >= 0 ? enemyValues[a].attack : parseInt(a, 10);
    return n;
  });
};
