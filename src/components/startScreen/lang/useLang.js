import { setOptions, getOptions } from "@/store";
import { useCallback, useState } from "react";
import { defaultLanguage } from "@/constants";

const useLang = () => {
  const [lang, setLang] = useState(() => {
    const options = getOptions();
    if (options && options.lang) {
      return options.lang;
    }
    return defaultLanguage;
  });

  const onClick = useCallback(() => {
    setOptions({ lang });
    window.location.reload();
  }, [lang]);

  return { lang, setLang, onClick };
};
export default useLang;
