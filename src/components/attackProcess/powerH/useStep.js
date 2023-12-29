import { useContext, useMemo } from "react";
import GameContext from "@/contexts/game/context";
import { deckUtils } from "@/constants";

const useStep = (setNextStep) => {
  const {
    attackToEnemyData,
    discardPool,
    setDiscardPool,
    deckPool,
    setDeckPool,
  } = useContext(GameContext);

  const note = useMemo(() => {
    const { attackBase } = attackToEnemyData;

    // Heal from discard
    const discardPoolShuffled = deckUtils.shuffle(discardPool);

    const cardsToRecover = discardPoolShuffled.slice(0, attackBase);
    const newDiscardPool =
      attackBase >= discardPoolShuffled.length
        ? []
        : discardPoolShuffled.slice(attackBase, discardPoolShuffled.length);

    return {
      icon: "H",
      text: cardsToRecover.length === 1 ? "power.H.singular" : "power.H.plural",
      values: [cardsToRecover.length],
      textButton: "btn.Heal",
      action: () => {
        setDiscardPool(newDiscardPool);
        setDeckPool(cardsToRecover.concat([...deckPool]));
        //
        setNextStep();
      },
    };
  }, [
    attackToEnemyData,
    discardPool,
    setDiscardPool,
    deckPool,
    setDeckPool,
    setNextStep,
  ]);

  return note;
};
export default useStep;
