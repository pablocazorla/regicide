import { useCallback, useContext, useState } from "react";
import GameContext from "@/contexts/game/context";

const useJokers = () => {
  const { jokers, onUseJoker } = useContext(GameContext);

  const [visible, setVisible] = useState(false);

  const useJoker = useCallback(() => {
    setVisible(false);
    setTimeout(onUseJoker, 400);
  }, [onUseJoker]);

  return { jokers, visible, setVisible, useJoker };
};

export default useJokers;
