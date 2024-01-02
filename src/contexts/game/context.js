import { createContext } from "react";
import { statusTypes } from "@/constants";

const GameContext = createContext({
  Game: null,
  update: 0,
});

export default GameContext;
