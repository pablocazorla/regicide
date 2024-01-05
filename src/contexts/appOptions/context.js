import { createContext } from "react";
import { defaultLanguage } from "@/constants";

const AppOptionContext = createContext({
  lang: defaultLanguage,
  appStatus: 0,
  setAppStatus: () => {},
  visibleAbout: false,
  setVisibleAbout: () => {},
  isFullScreen: false,
  jokersToWin: 0,
  setJokersToWin: () => {},
  showHowToPlay: false,
  setShowHowToPlay: () => {},
});

export default AppOptionContext;
