import { useContext, useEffect, useState } from "react";
import GameContext from "@/contexts/game/context";

const useStep = (setNextStep) => {
  const { attackToEnemyData, setEnemyLife } = useContext(GameContext);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer = null;
    if (!ready) {
      setReady(true);
      const { newEnemyLife } = attackToEnemyData;

      setEnemyLife(newEnemyLife);

      timer = setTimeout(setNextStep, 1000);
    }
    return () => {
      if (ready) {
        clearTimeout(timer);
      }
    };
  }, [ready, attackToEnemyData, setNextStep, setEnemyLife]);

  return {
    icon: "attack",
    text: "applyAttack",
  };
};
export default useStep;
