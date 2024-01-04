import { createContext } from "react";

const AppOptionContext = createContext({
  lang: null,
  setLang: () => {},
});

export default AppOptionContext;
