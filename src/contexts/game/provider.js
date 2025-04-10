import GameContext from "./context";
import GameClass from "@/game";
import { useContext, useRef, useEffect, useState, useCallback } from "react";
import AppOptionContext from "@/contexts/appOptions/context";

const GameContextProvider = ({ children }) => {
  const { setAppStatus, setJokersToWin } = useContext(AppOptionContext);

  const [update, setUpdate] = useState({
    deckPool: 0,
    discardPool: 0,
    handPool: 0,
    tablePool: 0,
    attackPool: 0,
    enemyPool: 0,
    enemyList: 0,
    enemyLife: 0,
    enemySuit: 0,
    //
    jokers: 0,
    enabledButtonJokers: 0,
    //
    handDisabled: 0,
    tableAttack: 0,
    payDamagePool: 0,
    payDamageButtonDisabled: 0,
    //
    note: 0,
    //
    defenseDamage: 0,
    //
    modeSilence: 0,
    roundNum: 0,
  });

  const onUpdate = useCallback((list) => {
    setUpdate((oldStatus) => {
      const newStatus = { ...oldStatus };

      if (!list || !list.length) {
        for (let type in newStatus) {
          newStatus[type] += 1;
        }
      } else {
        list.forEach((type) => {
          newStatus[type] += 1;
        });
      }

      return newStatus;
    });
  }, []);

  const Game = useRef(new GameClass(onUpdate, setAppStatus, setJokersToWin));

  useEffect(() => {
    Game.current.reset();
  }, []);

  return (
    <GameContext.Provider
      value={{
        Game: Game.current,
        update,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
