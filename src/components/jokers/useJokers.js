import { useCallback, useContext, useState, useEffect } from "react";
import GameContext from "@/contexts/game/context";

const useJokers = () => {
  const { Game, update } = useContext(GameContext);

  const [visible, setVisible] = useState(false);
  const [jokers, setJokers] = useState(0);
  const [enabledButtonJokers, setEnabledButtonJokers] = useState(false);

  useEffect(() => {
    setJokers(Game.jokers);
  }, [Game, update.jokers]);

  useEffect(() => {
    setEnabledButtonJokers(Game.enabledButtonJokers);
  }, [Game, update.enabledButtonJokers]);

  const toggleVisible = useCallback(() => {
    setVisible((v) => {
      if (enabledButtonJokers && jokers && !v) {
        return true;
      }
      return false;
    });
  }, [enabledButtonJokers, jokers]);

  const onUseJoker = useCallback(() => {
    if (enabledButtonJokers) {
      setVisible(false);
      Game.onUseJoker();
    }
  }, [enabledButtonJokers, Game]);

  return { enabledButtonJokers, jokers, visible, toggleVisible, onUseJoker };
};

export default useJokers;
