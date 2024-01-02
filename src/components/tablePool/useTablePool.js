import { useState, useEffect, useContext } from "react";
import GameContext from "@/contexts/game/context";

const useTablePool = () => {
  const { Game, update } = useContext(GameContext);

  const [tablePool, setTablePool] = useState([]);

  useEffect(() => {
    setTablePool(Game.tablePool);
  }, [Game, update.tablePool]);

  return { tablePool, onClickTableCard: (v) => {} };
};

export default useTablePool;
