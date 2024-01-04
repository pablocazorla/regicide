import { createContext } from "react";

const GameContext = createContext({
  Game: null,
  update: 0,
});

export default GameContext;
