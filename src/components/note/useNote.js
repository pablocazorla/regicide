import GameContext from "@/contexts/game/context";
import { useState, useEffect, useContext } from "react";

const useNote = () => {
  const { Game, update } = useContext(GameContext);

  const [disableButton, setDisableButton] = useState(false);

  const [note, setNote] = useState({
    icon: "",
    text: null,
    values: [],
    disable: false,
    textButton: null,
    action: null,
  });

  useEffect(() => {
    setNote(Game.note);
    setDisableButton(false);
  }, [Game, update.note]);

  return {
    ...note,
    disableButton: disableButton || note?.disable,
    textButton: note?.textButton || "btn.continue",
    setDisableButton,
  };
};

export default useNote;
