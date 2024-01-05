import { getOptions, setOptions } from "@/store";
import { defaultLanguage } from "@/constants";
import AppOptionContext from "./context";
import { useMemo, useState, useEffect } from "react";

const AppOptionContextProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState(0);
  const [visibleAbout, setVisibleAbout] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [jokersToWin, setJokersToWin] = useState(0);

  const [showHowToPlay, setShowHowToPlay] = useState(false);

  useEffect(() => {
    setAppStatus(1);
    //
    const detectFullscreen = () => {
      if (document.fullscreenElement) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    };

    detectFullscreen();

    window.addEventListener("fullscreenchange", detectFullscreen);

    return () => {
      window.removeEventListener("fullscreenchange", detectFullscreen);
    };
  }, []);

  const lang = useMemo(() => {
    const options = getOptions();
    if (options && options.lang) {
      return options.lang;
    }
    return defaultLanguage;
  }, []);

  return (
    <AppOptionContext.Provider
      value={{
        lang,
        appStatus,
        setAppStatus,
        visibleAbout,
        setVisibleAbout,
        isFullScreen,
        jokersToWin,
        setJokersToWin,
        showHowToPlay,
        setShowHowToPlay,
      }}
    >
      {children}
    </AppOptionContext.Provider>
  );
};

export default AppOptionContextProvider;
