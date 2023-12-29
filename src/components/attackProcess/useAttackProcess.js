import { useCallback, useContext, useEffect, useState } from "react";
import GameContext from "@/contexts/game/context";
import { statusTypes } from "@/constants";

const useAttackProcess = () => {
  const { status, attackToEnemyData } = useContext(GameContext);

  const [stepIndex, setStepIndex] = useState(-1);

  const setNextStep = useCallback(() => {
    setStepIndex((n) => {
      return n + 1;
    });
  }, []);

  useEffect(() => {
    if (status === statusTypes.CARDS_TO_ATTACK) {
      setStepIndex(0);
    } else {
      setStepIndex(-1);
    }
  }, [status]);

  return {
    step:
      attackToEnemyData && attackToEnemyData.steps[stepIndex]
        ? attackToEnemyData.steps[stepIndex]
        : null,
    setNextStep,
  };
};

export default useAttackProcess;
