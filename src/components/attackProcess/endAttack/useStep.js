import { useContext, useEffect, useMemo } from "react";
import GameContext from "@/contexts/game/context";
import { enemyValues, statusTypes } from "@/constants";

const useStep = (setNextStep) => {
  const {
    attackToEnemyData,
    status,
    setStatus,
    moveCardsBetweenPools,
    enemyLife,
    setEnemyLife,
    attackPool,
    setPayingDamage,
    setPayDamagePool,
  } = useContext(GameContext);

  useEffect(() => {
    setPayingDamage(false);
    setPayDamagePool([]);
    let win = false;
    if (status === statusTypes.CARDS_TO_ATTACK && enemyLife <= 0) {
      const { currentEnemy, nextEnemyLetter } = attackToEnemyData;
      win = nextEnemyLetter === null;

      if (!win) {
        const nextEnemyLife = enemyValues[nextEnemyLetter].life;
        setEnemyLife(nextEnemyLife);
      }
      if (enemyLife === 0) {
        moveCardsBetweenPools([currentEnemy], "enemyPool", "deckPool");
      } else {
        moveCardsBetweenPools([currentEnemy], "enemyPool", "discardPool");
      }
    }

    moveCardsBetweenPools(attackPool, "attackPool", "discardPool");
    setStatus(statusTypes.PLAY_CARDS);
    if (win) {
      console.log("YOU WIN");
    } else {
      setNextStep();
    }
  }, [
    attackToEnemyData,
    status,
    setStatus,
    moveCardsBetweenPools,
    enemyLife,
    setEnemyLife,
    attackPool,
    setPayingDamage,
    setPayDamagePool,
    setNextStep,
  ]);
};
export default useStep;
