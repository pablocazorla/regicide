import { useCallback, useContext, useState, useEffect } from "react";
import GameContext from "@/contexts/game/context";

const useJokers = () => {
  const { Game, update } = useContext(GameContext);

  const [visible, setVisible] = useState(false);
  const [jokers, setJokers] = useState(0);

  const [enabledPlayJokers, setEnabledPlayJokers] = useState(false);

  useEffect(() => {
    setJokers(Game.jokers);
  }, [Game, update.jokers]);

  useEffect(() => {
    setEnabledPlayJokers(Game.enabledPlayJokers);
  }, [Game, update.enabledPlayJokers]);

  const toggleVisible = useCallback(() => {
    if (enabledPlayJokers) {
      setVisible((v) => {
        if (jokers && !v) {
          return true;
        }
        return false;
      });
    }
  }, [jokers, enabledPlayJokers]);

  const onUseJoker = useCallback(() => {
    setVisible(false);
    Game.onUseJoker();
  }, [Game]);

  return { jokers, visible, enabledPlayJokers, toggleVisible, onUseJoker };
};

export default useJokers;
