import { useContext, useEffect, useMemo, useState } from "react";
import GameContext from "@/contexts/game/context";
import { getValues } from "@/utils";

const useStep = (setNextStep) => {
  const {
    attackToEnemyData,
    setPayingDamage,
    payDamagePool,
    handPool,
    moveCardsBetweenPools,
  } = useContext(GameContext);

  const [paymentTotal, setPaymentTotal] = useState(0);

  const handDefense = useMemo(() => {
    return handPool.reduce((total, v) => {
      total += getValues(v, true)[0];
      return total;
    }, 0);
  }, [handPool]);

  const note = useMemo(() => {
    const { enemyAttackTotal } = attackToEnemyData;

    if (enemyAttackTotal >= handDefense) {
      // LOST
      return {
        icon: "warning",
        text: "payDamage.1",
        action: () => {
          // LOST ACTION
          console.log("YOU LOST");
        },
      };
    }

    if (enemyAttackTotal < handDefense) {
      // You DEFEND
      return {
        icon: "defense",
        text: "payDamage.2",
        textButton: "btn.payDamage",
        values: [enemyAttackTotal],
        disabled: paymentTotal < enemyAttackTotal,
        action: () => {
          // SELECTION OF CARDS
          moveCardsBetweenPools(payDamagePool, "handPool", "discardPool");
          setTimeout(setNextStep, 1000);
        },
      };
    }
    return null;
  }, [
    handDefense,
    attackToEnemyData,
    paymentTotal,
    payDamagePool,
    moveCardsBetweenPools,
    setNextStep,
  ]);

  useEffect(() => {
    const { enemyAttackTotal } = attackToEnemyData;

    if (enemyAttackTotal < handDefense) {
      // You DEFEND
      setPayingDamage(true);
      const newPaymentTotal = payDamagePool.reduce((total, v) => {
        const [num] = getValues(v, true);
        return total + num;
      }, 0);
      setPaymentTotal(newPaymentTotal);
    }
  }, [handDefense, attackToEnemyData, payDamagePool, setPayingDamage]);

  return note;
};
export default useStep;
