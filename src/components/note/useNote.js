import GameContext from "@/contexts/game/context";
import I18Ntext from "@/i18n";
import { useState, useEffect, useContext } from "react";

const useNote = () => {
  const { Game, update } = useContext(GameContext);

  const [disableButton, setDisableButton] = useState(false);
  const [payDamageButtonDisabled, setPayDamageButtonDisabled] = useState(false);

  const [note, setNote] = useState({
    icon: "",
    text: null,
    values: [],
    forPayDamageButton: false,
    textButton: null,
    action: null,
  });

  useEffect(() => {
    setNote(Game.note);
    setDisableButton(false);
  }, [Game, update.note]);

  useEffect(() => {
    if (note.forPayDamageButton) {
      setPayDamageButtonDisabled(Game.payDamageButtonDisabled);
    } else {
      setPayDamageButtonDisabled(false);
    }
  }, [Game, note, update.payDamageButtonDisabled]);

  return {
    ...note,
    loading: disableButton,
    disableButton: disableButton || payDamageButtonDisabled,
    textButton: note?.textButton || "btn.continue",
    setDisableButton,
  };
};

export default useNote;
