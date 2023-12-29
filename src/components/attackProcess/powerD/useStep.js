import { useContext, useMemo } from "react";
import GameContext from "@/contexts/game/context";

const useStep = (setNextStep) => {
  const { attackToEnemyData, handPool, deckPool, setHandPool, setDeckPool } =
    useContext(GameContext);

  const note = useMemo(() => {
    const { attackBase } = attackToEnemyData;

    return {
      icon: "D",
      text: "power.D",
      values: [attackBase],
      textButton: "btn.Draw",
      action: () => {
        // Draw from deck
        const countToDraw = Math.min(attackBase, 8 - handPool.length);

        const newDeckPool = [...deckPool].slice(
          0,
          deckPool.length - countToDraw
        );
        const cardsToDraw =
          countToDraw >= deckPool.length
            ? []
            : [...deckPool].slice(
                deckPool.length - countToDraw,
                deckPool.length
              );

        setHandPool([...handPool].concat(cardsToDraw));
        setDeckPool(newDeckPool);

        setTimeout(setNextStep, 1000);
      },
    };
  }, [
    attackToEnemyData,
    handPool,
    deckPool,
    setHandPool,
    setDeckPool,
    setNextStep,
  ]);

  return note;
};
export default useStep;
