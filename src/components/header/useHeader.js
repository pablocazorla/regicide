import { useCallback, useState, useContext, useEffect } from "react";
import AppOptionContext from "@/contexts/appOptions/context";
import GameContext from "@/contexts/game/context";

const useHeader = () => {
  const { setAppStatus, setVisibleAbout, isFullScreen, setShowHowToPlay } =
    useContext(AppOptionContext);

  const { Game, update } = useContext(GameContext);

  const [showMenu, setShowMenu] = useState(false);
  const [modeSilence, setModeSilence] = useState(false);

  useEffect(() => {
    setModeSilence(Game.modeSilence);
  }, [Game, update.modeSilence]);

  const toggleModeSilence = useCallback(() => {
    setShowMenu(false);
    Game.toggleModeSilence();
  }, [Game]);

  const toggleMenu = useCallback(() => {
    setShowMenu((v) => !v);
  }, []);

  const showHowToPlay = useCallback(() => {
    setShowMenu(false);
    setShowHowToPlay(true);
  }, [setShowHowToPlay]);

  const showAbout = useCallback(() => {
    setShowMenu(false);
    setVisibleAbout(true);
  }, [setVisibleAbout]);

  const exitGame = useCallback(() => {
    setAppStatus(1);
  }, [setAppStatus]);

  return {
    modeSilence,
    toggleModeSilence,
    showMenu,
    toggleMenu,
    showHowToPlay,
    showAbout,
    exitGame,
  };
};

export default useHeader;
