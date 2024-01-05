import { useState, useEffect, useContext, useCallback } from "react";
import GameContext from "@/contexts/game/context";

const useTablePool = () => {
  const { Game, update } = useContext(GameContext);

  const [tablePool, setTablePool] = useState([]);

  const [enemySuit, setEnemySuit] = useState(null);

  useEffect(() => {
    setTablePool(Game.tablePool);
  }, [Game, update.tablePool]);

  useEffect(() => {
    setEnemySuit(Game.enemySuit);
  }, [Game, update.enemySuit]);

  const onClickTableCard = useCallback(
    (card) => {
      Game.onClickTableCard(card);
    },
    [Game]
  );

  return { enemySuit, tablePool, onClickTableCard };
};

export default useTablePool;
