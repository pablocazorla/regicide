import { useCallback, useEffect, useState } from "react";
import { getSavedGame, clearGame, getOptions } from "@/store";

const useStartScreen = (setAppStatus) => {
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
    setAppStatus(1);
  }, [setAppStatus]);

  const onClickNewGame = useCallback(() => {
    setLoadingForNewGame(true);
    clearGame();
    setTimeout(() => {
      setAppStatus(1);
    }, 500);
  }, [setAppStatus]);

  return {
    showLangModal,
    setShowLangModal,
    savedGame,
    onClickContinueGame,
    onClickNewGame,
    loadingForNewGame,
  };
};

export default useStartScreen;
