import { useCallback, useEffect, useState, useContext } from "react";
import { getSavedGame, clearGame, getOptions } from "@/store";
import AppOptionContext from "@/contexts/appOptions/context";

const useStartScreen = () => {
  const { setAppStatus, setVisibleAbout, isFullScreen } =
    useContext(AppOptionContext);

  const [savedGame, setSavedGame] = useState(null);

  const [showLangModal, setShowLangModal] = useState(false);

  const [loadingForNewGame, setLoadingForNewGame] = useState(false);

  useEffect(() => {
    setSavedGame(getSavedGame());
    //
    const options = getOptions();
    if (options && options.lang) {
      setShowLangModal(false);
    } else {
      setShowLangModal(true);
    }
  }, []);

  const onClickContinueGame = useCallback(() => {
    setAppStatus((v) => v + 1);
  }, [setAppStatus]);

  const onClickNewGame = useCallback(() => {
    setLoadingForNewGame(true);
    clearGame();
    setTimeout(() => {
      setAppStatus((v) => v + 1);
    }, 500);
  }, [setAppStatus]);

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, []);

  return {
    showLangModal,
    setShowLangModal,
    savedGame,
    onClickContinueGame,
    onClickNewGame,
    loadingForNewGame,
    //
    setVisibleAbout,
    isFullScreen,
    toggleFullScreen,
  };
};

export default useStartScreen;
