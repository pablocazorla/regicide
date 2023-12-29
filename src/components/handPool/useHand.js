import { useCallback, useContext, useMemo } from "react";
import GameContext from "@/contexts/game/context";
import { flatListNum } from "@/utils";
import { statusTypes, enemyValues } from "@/constants";
import { getValues } from "@/utils";

const useHand = () => {
  const {
    status,
    handPool,
    tablePool,
    attackToEnemyData,
    moveCardsBetweenPools,
    payingDamage,
    payDamagePool,
    setPayDamagePool,
  } = useContext(GameContext);

  const onClickHandCard = useCallback(
    (v) => {
      if (payingDamage) {
        setPayDamagePool((n) => {
          let m = [];
          if (n.indexOf(v) >= 0) {
            m = [...n].filter((a) => {
              return a !== v;
            });
          } else {
            m = [...n];
            m.push(v);
          }
          return m;
        });
      } else {
        moveCardsBetweenPools([v], "handPool", "tablePool");
      }
    },
    [moveCardsBetweenPools, payingDamage, setPayDamagePool]
  );

  const handDisable = useMemo(() => {
    const disabledAllCardsInHand = () => {
      return handPool.reduce((obj, v) => {
        obj[v] = true;
        return obj;
      }, {});
    };
    if (status === statusTypes.PLAY_CARDS) {
      if (tablePool.length && handPool.length) {
        // EVALUATE HAND AND TABLE
        const tableFlat = flatListNum(tablePool);

        // If is played an A
        if (tableFlat.indexOf(1) >= 0) {
          if (tableFlat.length === 1) {
            // The first card is an A
            return {};
          } else {
            // It's already played an A and another card
            return disabledAllCardsInHand();
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
            // If the combined cards value reach teh limit.
            return disabledAllCardsInHand();
          } else {
            // Enabled only "A" cards and combined cards
            return handPool.reduce((obj, v) => {
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
        return handPool.reduce((obj, v) => {
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
    if (status === statusTypes.CARDS_TO_ATTACK && payingDamage) {
      const { enemyAttackTotal } = attackToEnemyData;

      const paymentTotal = payDamagePool.reduce((total, v) => {
        const [num] = getValues(v, true);
        return total + num;
      }, 0);

      if (paymentTotal >= enemyAttackTotal) {
        return handPool.reduce((obj, v) => {
          if (payDamagePool.indexOf(v) < 0) {
            obj[v] = true;
          }

          return obj;
        }, {});
      }
      return {};
    }
    return disabledAllCardsInHand();
  }, [
    status,
    attackToEnemyData,
    handPool,
    tablePool,
    payingDamage,
    payDamagePool,
  ]);

  const note = useMemo(() => {
    if (status === statusTypes.PLAY_CARDS && !tablePool.length) {
      return {
        icon: "idea",
        text: "playCardsFromHand",
      };
    }
    return null;
  }, [status, tablePool]);

  return {
    note,
    handPool,
    payDamagePool,
    handDisable,
    onClickHandCard,
  };
};

export default useHand;
