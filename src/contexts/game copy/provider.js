import { useCallback, useState, useMemo, useEffect } from "react";
import GameContext from "./context";
import {
  statusTypes,
  DECK,
  deckUtils,
  createENEMIES,
  enemyValues,
} from "@/constants";
import { getValues } from "@/utils";
import { getSavedGame, saveGame } from "@/store";

const GameContextProvider = ({ children }) => {
  const [deckPool, setDeckPool] = useState([]);
  const [discardPool, setDiscardPool] = useState([]);
  //
  const [handPool, setHandPool] = useState([]);
  const [tablePool, setTablePool] = useState([]);
  //
  const [enemyList, setEnemyList] = useState([]);
  const [enemyPool, setEnemyPool] = useState([]);
  const [attackPool, setAttackPool] = useState([]);
  //
  const [enemyLife, setEnemyLife] = useState(0);
  //
  const [status, setStatus] = useState(statusTypes.RESETTING);
  const [payingDamage, setPayingDamage] = useState(false);

  const [payDamagePool, setPayDamagePool] = useState([]);
  //
  const [jokers, setJokers] = useState(0);

  useEffect(() => {
    const savedGame = getSavedGame();

    let timer = null;

    if (savedGame) {
      setDeckPool(savedGame.deckPool);
      setDiscardPool(savedGame.discardPool);
      setEnemyPool(savedGame.enemyPool);
      setEnemyList(savedGame.enemyList);
      setEnemyLife(savedGame.enemyLife);
      setHandPool(savedGame.handPool);
      setJokers(savedGame.jokers);
      setStatus(statusTypes.PLAY_CARDS);
    } else {
      const deckShuffled = deckUtils.shuffle(DECK);
      setDeckPool(deckShuffled);
      setJokers(2);

      const newEnemy = createENEMIES();
      setEnemyPool(newEnemy);
      const [enemyLetter] = getValues(newEnemy[newEnemy.length - 1]);
      setEnemyLife(enemyValues[enemyLetter].life);
      setEnemyList([...newEnemy]);

      timer = setTimeout(() => {
        const [newHand, newDeck] = deckUtils.pick(deckShuffled, 8);
        setHandPool(newHand);
        setDeckPool(newDeck);

        setStatus(statusTypes.PLAY_CARDS);
      }, 400);
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const saveGameToStore = useCallback(() => {
    saveGame({
      saveGame,
      handPool,
      enemyLife,
      enemyPool,
      enemyList,
      deckPool,
      discardPool,
      jokers,
    });
  }, [
    handPool,
    enemyLife,
    enemyPool,
    enemyList,
    deckPool,
    discardPool,
    jokers,
  ]);

  const moveCardsBetweenPools = useCallback((v_array, origin, destiny) => {
    const setOrigin = (m) => {
      const n = [...m].filter((card) => {
        return v_array.indexOf(card) < 0;
      });
      return n;
    };
    const setDestiny = (m) => {
      const n = [...m].concat(v_array);
      return n;
    };

    switch (origin) {
      case "deckPool":
        setDeckPool(setOrigin);
        break;
      case "discardPool":
        setDiscardPool(setOrigin);
        break;
      case "handPool":
        setHandPool(setOrigin);
        break;
      case "tablePool":
        setTablePool(setOrigin);
        break;
      case "enemyPool":
        setEnemyPool(setOrigin);
        break;
      case "attackPool":
        setAttackPool(setOrigin);
        break;
      default:
      //
    }
    switch (destiny) {
      case "deckPool":
        setDeckPool(setDestiny);
        break;
      case "discardPool":
        setDiscardPool(setDestiny);
        break;
      case "handPool":
        setHandPool(setDestiny);
        break;
      case "tablePool":
        setTablePool(setDestiny);
        break;
      case "enemyPool":
        setEnemyPool(setDestiny);
        break;
      case "attackPool":
        setAttackPool(setDestiny);
        break;
      default:
      //
    }
  }, []);

  //
  const onUseJoker = useCallback(() => {}, []);

  const listActions = useMemo(() => {
    if (tablePool.length) {
      const currentEnemy = enemyPool[enemyPool.length - 1];
      const [, enemySuit] = getValues(currentEnemy);

      const { powers, attackBase } = tablePool.reduce(
        (obj, card) => {
          const [cardAttack, cardSuit] = getValues(card, true);

          if (cardSuit !== enemySuit) {
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

      const totalAttack = powers.C ? 2 * attackBase : attackBase;
      return {
        powers,
        attackBase,
        totalAttack,
      };
    }
    return null;
  }, [tablePool, enemyPool]);

  const [attackToEnemyData, setAttackToEnemyData] = useState(null);

  const onAttack = useCallback(() => {
    setStatus(statusTypes.SEND_CARDS_TO_ATTACK);
    moveCardsBetweenPools(tablePool, "tablePool", "attackPool");
    //////////////////////////

    const currentEnemy = enemyPool[enemyPool.length - 1];
    const [enemyLetter, enemySuit] = getValues(currentEnemy);

    const enemyAttack = enemyValues[enemyLetter].attack;

    const nextEnemy = enemyPool[enemyPool.length - 2] || null;
    const [nextEnemyLetter, nextEnemySuit] = getValues(nextEnemy);

    const { powers, attackBase } = tablePool.reduce(
      (obj, card) => {
        const [cardAttack, cardSuit] = getValues(card, true);

        if (cardSuit !== enemySuit) {
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
    const totalAttack = powers.C ? 2 * attackBase : attackBase;

    const newEnemyLife = enemyLife - totalAttack;

    const defenseDamage = powers?.S ? attackBase : 0;

    const enemyAttackTotal = enemyAttack - defenseDamage;

    ///////////////////

    const steps = [];
    if (powers.H && discardPool.length) {
      steps.push("H");
    }
    if (powers.D) {
      steps.push("D");
    }
    if (powers.C) {
      steps.push("C");
    }
    steps.push("APPLY_ATTACK");
    steps.push("AFTER_ATTACK");
    if (powers.S && newEnemyLife > 0) {
      steps.push("S");
    }
    //
    if (newEnemyLife > 0 && enemyAttackTotal > 0) {
      steps.push("PAY_DAMAGE");
    }
    //
    steps.push("END_ATTACK");
    steps.push("SAVE_GAME");

    setAttackToEnemyData({
      currentEnemy,
      enemyLetter,
      enemySuit,
      enemyAttack,
      enemyAttackTotal,
      //
      nextEnemy,
      nextEnemyLetter,
      nextEnemySuit,
      //
      attackBase,
      totalAttack,
      defenseDamage,
      newEnemyLife,
      //
      steps,
    });

    //////////////////////////

    let timer = setTimeout(() => {
      setStatus(statusTypes.CARDS_TO_ATTACK);
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [moveCardsBetweenPools, tablePool, enemyPool, discardPool, enemyLife]);

  return (
    <GameContext.Provider
      value={{
        deckPool,
        setDeckPool,
        discardPool,
        setDiscardPool,
        handPool,
        setHandPool,
        tablePool,
        setTablePool,
        enemyList,
        setEnemyList,
        enemyPool,
        setEnemyPool,
        attackPool,
        setAttackPool,
        enemyLife,
        setEnemyLife,
        status,
        setStatus,
        //
        moveCardsBetweenPools,
        attackToEnemyData,
        onAttack,
        //
        note: null,
        //
        jokers,
        onUseJoker,
        payingDamage,
        setPayingDamage,
        payDamagePool,
        setPayDamagePool,
        //
        listActions,
        //
        saveGameToStore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
