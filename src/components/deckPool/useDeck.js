import { useContext } from "react";
import GameContext from "@/contexts/game/context";
import I18Ntext from "@/i18n";

const useDeck = () => {
  const { deckPool, discardPool } = useContext(GameContext);

  const deckTitle = I18Ntext("deck");
  const discardTitle = I18Ntext("discard");

  return { deckTitle, discardTitle, deckPool, discardPool };
};

export default useDeck;
