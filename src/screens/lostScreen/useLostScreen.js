import { useContext, useCallback, useEffect } from "react";
import { clearGame } from "@/store";
import AppOptionContext from "@/contexts/appOptions/context";

const useLostScreen = () => {
  const { setAppStatus } = useContext(AppOptionContext);

  useEffect(() => {
    clearGame();
  }, []);

  const onClickNewGame = useCallback(() => {
    setAppStatus(2);
  }, [setAppStatus]);

  const backToMainScreen = useCallback(() => {
    setAppStatus(1);
  }, [setAppStatus]);

  return { onClickNewGame, backToMainScreen };
};

export default useLostScreen;
