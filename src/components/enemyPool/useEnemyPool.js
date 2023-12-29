import { useContext, useMemo } from "react";
import GameContext from "@/contexts/game/context";
import I18Ntext from "@/i18n";

const useEnemyPool = () => {
  const { enemyList, enemyPool, enemyLife, attackPool } =
    useContext(GameContext);

  const currentEnemyIndex = useMemo(() => {
    return enemyPool.length - 1;
  }, [enemyPool]);

  const title = I18Ntext("currentEnemy");

  return {
    title,
    enemyList,
    enemyPool,
    enemyLife,
    attackPool,
    currentEnemyIndex,
  };
};
export default useEnemyPool;
