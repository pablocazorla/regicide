import { useContext, useMemo } from "react";
import GameContext from "@/contexts/game/context";

const useTableAction = () => {
  const { tablePool, listActions, onAttack } = useContext(GameContext);

  const { actionTableList, totalAttack, attackBase } = useMemo(() => {
    if (listActions) {
      const { powers, attackBase, totalAttack } = listActions;

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

      return { actionTableList, totalAttack, attackBase };
    }

    return { actionTableList: [], totalAttack: 0, attackBase: 0 };
  }, [listActions]);

  return {
    tablePool,
    actionTableList,
    totalAttack,
    attackBase,
    onClickAttackButton: onAttack,
  };
};

export default useTableAction;
