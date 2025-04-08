import { getOptions, setOptions } from "@/store";
import { defaultLanguage } from "@/constants";
import AppOptionContext from "./context";
import { useState, useEffect, useCallback } from "react";

const AppOptionContextProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState(0);
  const [visibleAbout, setVisibleAbout] = useState(false);

  const [visibleRank, setVisibleRank] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [jokersToWin, setJokersToWin] = useState(0);

  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const [lang, setLang] = useState(defaultLanguage);
  const [orderedHand, setOrderedHand] = useState(false);

  useEffect(() => {
    const options = getOptions();
    if (options) {
      if (options.lang) {
        setLang(options.lang);
      }
      if (options.orderedHand) {
        setOrderedHand(true);
      }
    }
    //
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

  const toggleOrderedHand = useCallback(() => {
    setOrderedHand((oldOrderedHand) => {
      setOptions({
        orderedHand: !oldOrderedHand,
      });
      return !oldOrderedHand;
    });
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
        orderedHand,
        toggleOrderedHand,
        visibleRank,
        setVisibleRank,
      }}
    >
      {children}
    </AppOptionContext.Provider>
  );
};

export default AppOptionContextProvider;
