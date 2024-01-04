import { useContext, useMemo, useState, useEffect } from "react";
import GameContext from "@/contexts/game/context";
import I18Ntext from "@/i18n";

const useEnemyPool = () => {
  const { Game, update } = useContext(GameContext);

  const [enemyPool, setEnemyPool] = useState([]);
  const [enemyList, setEnemyList] = useState([]);
  const [enemyLife, setEnemyLife] = useState(20);
  const [attackPool, setAttackPool] = useState([]);

  useEffect(() => {
    setEnemyPool(Game.enemyPool);
  }, [Game, update.enemyPool]);

  useEffect(() => {
    setEnemyList(Game.enemyList);
  }, [Game, update.enemyList]);

  useEffect(() => {
    setEnemyLife(Game.enemyLife);
  }, [Game, update.enemyLife]);

  useEffect(() => {
    setAttackPool(Game.attackPool);
  }, [Game, update.attackPool]);

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
