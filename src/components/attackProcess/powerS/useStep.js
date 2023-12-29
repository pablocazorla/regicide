import { useContext, useEffect, useMemo } from "react";
import GameContext from "@/contexts/game/context";

const useStep = (setNextStep) => {
  const { attackToEnemyData } = useContext(GameContext);

  const note = useMemo(() => {
    const { attackBase } = attackToEnemyData;

    return {
      icon: "S",
      text: "power.S",
      values: [attackBase],
      action: () => {
        //
        setTimeout(setNextStep, 300);
      },
    };
  }, [attackToEnemyData, setNextStep]);

  return note;
};
export default useStep;
