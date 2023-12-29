import { useCallback, useEffect, useState } from "react";
import useStore from "@/store/useStore";

const useStartScreen = (setAppStatus) => {
  const { getSavedGame, clearGame, getOptions } = useStore();

  const [savedGame, setSavedGame] = useState(null);

  const [showLangModal, setShowLangModal] = useState(false);

  const [loadingForNewGame, setLoadingForNewGame] = useState(false);

  useEffect(() => {
    setSavedGame(getSavedGame());
  }, [getSavedGame]);

  useEffect(() => {
    const options = getOptions();
    if (options && options.lang) {
      setShowLangModal(false);
    } else {
      setShowLangModal(true);
    }
  }, [getOptions]);

  const onClickContinueGame = useCallback(() => {
    setAppStatus(1);
  }, [setAppStatus]);

  const onClickNewGame = useCallback(() => {
    setLoadingForNewGame(true);
    clearGame();
    setTimeout(() => {
      setAppStatus(1);
    }, 500);
  }, [clearGame, setAppStatus]);

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
