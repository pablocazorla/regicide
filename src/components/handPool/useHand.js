import { useCallback, useContext, useEffect, useState } from "react";
import GameContext from "@/contexts/game/context";

const useHand = () => {
  const { Game, update } = useContext(GameContext);

  const [handPool, setHandPool] = useState([]);
  const [payDamagePool, setPayDamagePool] = useState([]);
  const [handDisable, setHandDisable] = useState({});

  useEffect(() => {
    setHandPool(Game.handPool);
  }, [Game, update.handPool]);

  useEffect(() => {
    setPayDamagePool(Game.payDamagePool);
  }, [Game, update.payDamagePool]);

  useEffect(() => {
    setHandDisable(Game.handDisabled);
  }, [Game, update.handDisabled]);

  const onClickHandCard = useCallback(
    (card) => {
      Game.onClickHandCard(card);
    },
    [Game]
  );

  return {
    handPool,
    payDamagePool,
    handDisable,
    onClickHandCard,
  };
};

export default useHand;
