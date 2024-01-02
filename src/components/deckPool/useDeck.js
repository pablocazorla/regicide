import { useContext, useState, useEffect } from "react";
import GameContext from "@/contexts/game/context";
import I18Ntext from "@/i18n";

const useDeck = () => {
  const { Game, update } = useContext(GameContext);

  const [deckPool, setDeckPool] = useState([]);
  const [discardPool, setDiscardPool] = useState([]);

  useEffect(() => {
    setDeckPool(Game.deckPool);
  }, [Game, update.deckPool]);

  useEffect(() => {
    setDiscardPool(Game.discardPool);
  }, [Game, update.discardPool]);

  const deckTitle = I18Ntext("deck");
  const discardTitle = I18Ntext("discard");

  return { deckTitle, discardTitle, deckPool, discardPool };
};

export default useDeck;
