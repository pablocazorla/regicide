import { getOptions, setOptions } from "@/store";
import { defaultLanguage } from "@/constants";
import AppOptionContext from "./context";
import { useCallback, useMemo, useState } from "react";

const AppOptionContextProvider = ({ children }) => {
  const lang = useMemo(() => {
    const options = getOptions();
    if (options && options.lang) {
      return options.lang;
    }
    return defaultLanguage;
  }, []);

  console.log("lang", lang);

  return (
    <AppOptionContext.Provider
      value={{
        lang,
      }}
    >
      {children}
    </AppOptionContext.Provider>
  );
};

export default AppOptionContextProvider;
