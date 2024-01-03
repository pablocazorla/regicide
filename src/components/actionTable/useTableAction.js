import { useContext, useMemo, useEffect, useState, useCallback } from "react";
import GameContext from "@/contexts/game/context";

const useTableAction = () => {
  const { Game, update } = useContext(GameContext);

  const [isCardsInTable, setIsCardsInTable] = useState(false);
  const [actionsTable, setActionsTable] = useState({
    actionTableList: [],
    totalAttack: 0,
    attackBase: 0,
  });

  useEffect(() => {
    setIsCardsInTable(Game.tablePool.length > 0);
  }, [Game, update.tablePool]);

  useEffect(() => {
    if (Game.tableAttack) {
      const { powers, attackBase, totalAttack } = Game.tableAttack;

      const actionTableList = [
        {
          text: "action.Heal",
          icon: "H",
          enabled: powers?.H,
        },
        {
          text: "action.Draw",
          icon: "D",
          enabled: powers?.D,
        },
        {
          text: "action.Damage",
          icon: "C",
          enabled: powers?.C,
        },
        {
          text: "action.Defense",
          icon: "S",
          enabled: powers?.S,
        },
      ].filter((a) => {
        return a.enabled;
      });

      setActionsTable({ actionTableList, totalAttack, attackBase });
    } else {
      setActionsTable({ actionTableList: [], totalAttack: 0, attackBase: 0 });
    }
  }, [Game, update.tableAttack]);

  const onClickAttackButton = useCallback(() => {
    Game.onClickAttackButton();
  }, [Game]);

  return {
    ...actionsTable,
    isCardsInTable,
    onClickAttackButton,
  };
};

export default useTableAction;
