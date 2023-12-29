import { useCallback, useContext } from "react";
import GameContext from "@/contexts/game/context";

const useTablePool = () => {
  const { tablePool, moveCardsBetweenPools } = useContext(GameContext);

  const onClickTableCard = useCallback(
    (v) => {
      moveCardsBetweenPools([v], "tablePool", "handPool");
    },
    [moveCardsBetweenPools]
  );

  return { tablePool, onClickTableCard };
};

export default useTablePool;
