import { useContext, useMemo } from "react";
import GameContext from "@/contexts/game/context";

const useStep = (setNextStep) => {
  const { enemyLife } = useContext(GameContext);

  const note = useMemo(() => {
    return {
      icon: "attack",
      text: (() => {
        if (enemyLife > 0) {
          return "afterAttack.1";
        }
        if (enemyLife === 0) {
          return "afterAttack.2";
        }
        if (enemyLife < 0) {
          return "afterAttack.3";
        }
      })(),
      action: () => {
        setNextStep();
      },
    };
  }, [enemyLife, setNextStep]);

  return note;
};
export default useStep;
