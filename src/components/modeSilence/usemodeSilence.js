import { useContext, useCallback, useState, useEffect } from "react";
import GameContext from "@/contexts/game/context";

const useModeSilence = () => {
  const [visible, setVisible] = useState(false);
  const [modeSilence, setModeSilence] = useState(false);

  const { Game, update } = useContext(GameContext);

  const toggleVisible = useCallback(() => {
    setVisible((v) => !v);
  }, []);

  useEffect(() => {
    setModeSilence(Game.modeSilence);
  }, [Game, update.modeSilence]);

  const toggleModeSilence = useCallback(() => {
    Game.toggleModeSilence();
    setVisible(false);
  }, [Game]);

  return { visible, toggleVisible, modeSilence, toggleModeSilence };
};

export default useModeSilence;
