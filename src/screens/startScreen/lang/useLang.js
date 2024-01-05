import { setOptions } from "@/store";
import { useCallback, useContext, useState } from "react";
import AppOptionContext from "@/contexts/appOptions/context";

const useLang = () => {
  const { lang } = useContext(AppOptionContext);

  const [currentLang, setCurrentLang] = useState(lang);

  const onClick = useCallback(() => {
    setOptions({ lang: currentLang });
    window.location.reload();
  }, [currentLang]);

  return { currentLang, setCurrentLang, onClick };
};
export default useLang;
