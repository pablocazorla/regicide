import useStore from "@/store/useStore";
import { useCallback, useState } from "react";
import { defaultLanguage } from "@/constants";

const useLang = (setVisible) => {
  const { setOptions, getOptions } = useStore();

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
  }, [setOptions, lang]);

  return { lang, setLang, onClick };
};
export default useLang;
