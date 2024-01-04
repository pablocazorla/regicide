import Icon from "@/components/icon";
import clsx from "clsx";
import useTableAction from "./useTableAction";
import { motion } from "framer-motion";
import I18Ntext from "@/i18n";

const ActionTable = () => {
  const {
    isCardsInTable,
    actionTableList,
    totalAttack,
    attackBase,
    onClickAttackButton,
  } = useTableAction();

  return isCardsInTable ? (
    <>
      <div className="text-sm">
        {actionTableList.map((act, k) => {
          return (
            <motion.div
              className="flex gap-1 items-center pb-1"
              layoutId={k}
              key={k}
            >
              <div>
                <Icon type={act.icon} />
              </div>
              <div>
                {`+${attackBase} `}
                <I18Ntext str={act.text} />
              </div>
            </motion.div>
          );
        })}
        <div
          className={clsx("py-3", {
            "border-t border-white/30": actionTableList.length,
          })}
        >
          <I18Ntext str={"totalAttack"} />: <strong>{totalAttack}</strong>
        </div>
      </div>

      <button
        className="bg-red-700 text-sm font-bold uppercase py-2 px-6 rounded-full shadow-lg active:shadow-none active:bg-red-500 transition-colors w-full flex items-center gap-1"
        onClick={onClickAttackButton}
      >
        <div className="text-lg">
          <Icon type="attack" />
        </div>
        <I18Ntext str={"btn.attack"} />
      </button>
    </>
  ) : null;
};
export default ActionTable;
