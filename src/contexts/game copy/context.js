import { createContext } from "react";
import { statusTypes } from "@/constants";

const GameContext = createContext({
  deckPool: [],
  setDeckPool: () => {},
  discardPool: [],
  setDiscardPool: () => {},
  handPool: [],
  setHandPool: () => {},
  tablePool: [],
  setTablePool: () => {},
  enemyList: [],
  setEnemyList: () => {},
  enemyPool: [],
  setEnemyPool: () => {},
  attackPool: [],
  setAttackPool: () => {},
  enemyLife: 0,
  setEnemyLife: () => {},
  status: statusTypes.RESETTING,
  setStatus: () => {},
  //
  moveCardsBetweenPools: () => {},
  attackToEnemyData: null,
  onAttack: () => {},
  note: null,
  jokers: 0,
  onUseJoker: () => {},
  payingDamage: false,
  setPayingDamage: () => {},
  payDamagePool: [],
  setPayDamagePool: () => {},
  listActions: null,
  saveGameToStore: () => {},
});

export default GameContext;
