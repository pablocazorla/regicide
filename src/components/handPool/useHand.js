import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import GameContext from "@/contexts/game/context";
import AppOptionContext from "@/contexts/appOptions/context";
import { getValues } from "@/game/utils";
import { handOrderSuit } from "@/constants";

const useHand = () => {
  const { orderedHand, toggleOrderedHand } = useContext(AppOptionContext);

  const { Game, update } = useContext(GameContext);

  const [handPool, setHandPool] = useState([]);
  const [payDamagePool, setPayDamagePool] = useState([]);
  const [handDisable, setHandDisable] = useState({});

  const [enemySuit, setEnemySuit] = useState(null);

  useEffect(() => {
    setHandPool(Game.handPool);
  }, [Game, update.handPool]);

  useEffect(() => {
    setPayDamagePool(Game.payDamagePool);
  }, [Game, update.payDamagePool]);

  useEffect(() => {
    setHandDisable(Game.handDisabled);
  }, [Game, update.handDisabled]);

  useEffect(() => {
    setEnemySuit(Game.enemySuit);
  }, [Game, update.enemySuit]);

  const onClickHandCard = useCallback(
    (card) => {
      Game.onClickHandCard(card);
    },
    [Game]
  );

  const handPoolToRender = useMemo(() => {
    if (orderedHand) {
      return [...handPool].sort((a, b) => {
        const [num_a, suit_a] = getValues(a, true);
        const [num_b, suit_b] = getValues(b, true);
        if (suit_a === suit_b) {
          return num_a < num_b ? -1 : 1;
        } else {
          return handOrderSuit[suit_a] < handOrderSuit[suit_b] ? -1 : 1;
        }
      });
    }
    return handPool;
  }, [handPool, orderedHand]);

  return {
    handPoolToRender,
    enemySuit,
    payDamagePool,
    handDisable,
    onClickHandCard,
    orderedHand,
    toggleOrderedHand,
  };
};

export default useHand;
