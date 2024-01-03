import { useState, useEffect, useContext, useCallback } from "react";
import GameContext from "@/contexts/game/context";

const useTablePool = () => {
  const { Game, update } = useContext(GameContext);

  const [tablePool, setTablePool] = useState([]);

  useEffect(() => {
    setTablePool(Game.tablePool);
  }, [Game, update.tablePool]);

  const onClickTableCard = useCallback(
    (card) => {
      Game.onClickTableCard(card);
    },
    [Game]
  );

  return { tablePool, onClickTableCard };
};

export default useTablePool;
