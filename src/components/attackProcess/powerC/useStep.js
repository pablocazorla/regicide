import { useContext, useMemo } from "react";
import GameContext from "@/contexts/game/context";

const useStep = (setNextStep) => {
  const { attackToEnemyData } = useContext(GameContext);

  const note = useMemo(() => {
    const { totalAttack } = attackToEnemyData;

    return {
      icon: "C",
      text: "power.C",
      values: [totalAttack],
      action: () => {
        //
        setTimeout(setNextStep, 300);
      },
    };
  }, [attackToEnemyData, setNextStep]);

  return note;
};
export default useStep;
