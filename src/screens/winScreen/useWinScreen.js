import { useContext, useCallback, useEffect, useState } from "react";
import { clearGame } from "@/store";
import AppOptionContext from "@/contexts/appOptions/context";

const useWinScreen = () => {
  const { setAppStatus, jokersToWin, setVisibleRank } =
    useContext(AppOptionContext);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    clearGame();
    const setSize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    setSize();

    window.addEventListener("resize", setSize);

    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  const onClickNewGame = useCallback(() => {
    setAppStatus(2);
  }, [setAppStatus]);

  const backToMainScreen = useCallback(() => {
    setAppStatus(1);
  }, [setAppStatus]);

  return {
    width,
    height,
    onClickNewGame,
    backToMainScreen,
    jokersToWin,
    setVisibleRank,
  };
};

export default useWinScreen;
