import { useContext, useEffect } from "react";
import GameContext from "@/contexts/game/context";
import { statusTypes } from "@/constants";

const SaveGame = () => {
  const { setStatus, saveGameToStore } = useContext(GameContext);

  useEffect(() => {
    saveGameToStore();
    setStatus(statusTypes.PLAY_CARDS);
  }, [saveGameToStore, setStatus]);

  return null;
};
export default SaveGame;
