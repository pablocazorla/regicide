import { createContext } from "react";
import { defaultLanguage } from "@/constants";

const AppOptionContext = createContext({
  lang: defaultLanguage,
});

export default AppOptionContext;
