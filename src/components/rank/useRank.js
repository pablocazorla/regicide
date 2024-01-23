import { useMemo } from "react";

import { getOptions } from "@/store";

const useRank = () => {
  const { lang, list } = useMemo(() => {
    const options = getOptions();
    let lang = "en-US";
    let list = [];

    if (options && options.lang && options.lang === "ES") {
      lang = "es-AR";
    }
    if (options && options.winGames && options.winGames.length) {
      const winGames = [...options.winGames];

      winGames.sort((a, b) => {
        if (a.jokers === b.jokers) {
          if (a.roundNum === b.roundNum) {
            return a.date < b.date ? -1 : 1;
          } else {
            return a.roundNum < b.roundNum ? -1 : 1;
          }
        } else {
          return a.jokers > b.jokers ? -1 : 1;
        }
      });

      list = winGames;
    }
    return { lang, list };
  }, []);
  console.log(lang, list);
  return { lang, list };
};

export default useRank;
