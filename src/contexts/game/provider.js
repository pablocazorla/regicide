import GameContext from "./context";
import GameClass from "@/game";
import { useRef, useEffect, useState, useCallback } from "react";

const GameContextProvider = ({ children }) => {
  const [update, setUpdate] = useState({
    deckPool: 0,
    discardPool: 0,
    handPool: 0,
    tablePool: 0,
    attackPool: 0,
    enemyPool: 0,
    enemyList: 0,
    enemyLife: 0,
    jokers: 0,
    //
    handDisabled: 0,
    tableAttack: 0,
    payDamagePool: 0,
    payDamageButtonDisabled: 0,
    //
    note: 0,
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

  const Game = useRef(new GameClass(onUpdate));

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
