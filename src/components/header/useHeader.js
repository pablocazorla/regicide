import { useCallback, useState, useContext } from "react";
import AppOptionContext from "@/contexts/appOptions/context";

const useHeader = () => {
  const {
    lang,
    setAppStatus,
    setVisibleAbout,
    isFullScreen,
    setShowHowToPlay,
  } = useContext(AppOptionContext);

  const [showMenu, setShowMenu] = useState(false);

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

  return { showMenu, toggleMenu, showHowToPlay, showAbout, exitGame };
};

export default useHeader;
