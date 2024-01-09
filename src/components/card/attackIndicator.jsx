import { useContext, useEffect, useState } from "react";
import GameContext from "@/contexts/game/context";
import Icon from "../icon";
import I18Ntext from "@/i18n";
import clsx from "clsx";

const AttackIndicator = ({ attack }) => {
  const { Game, update } = useContext(GameContext);
  const [defenseDamage, setDefenseDamage] = useState(0);
  const [pinning, setPinning] = useState(false);

  useEffect(() => {
    let timer = null;

    setDefenseDamage((oldDefense) => {
      if (Game.defenseDamage && Game.defenseDamage !== oldDefense) {
        setPinning(true);
        timer = setTimeout(() => {
          setPinning(false);
        }, 600);
      }
      return Game.defenseDamage;
    });

    return () => {
      clearTimeout(timer);
    };
  }, [Game, update.defenseDamage]);

  return (
    <div className="flex flex-wrap items-center bg-slate-700 justify-center rounded-[17px] gap-1 border-2 border-white shadow-md mb-2">
      <div className="font-bold text-lg">{attack}</div>
      <div>
        <Icon type="attack" />
      </div>
      <div className="uppercase text-[9px] font-bold">
        <I18Ntext str={"card.attack"} />
      </div>
      {defenseDamage ? (
        <div className="grow w-full  bg-slate-300 text-black font-bold rounded-br-[13px] rounded-bl-[13px]">
          <div className="flex items-center justify-center gap-[2px]">
            <div
              className={clsx("font-bold", {
                "motion-safe:animate-ping": pinning,
              })}
            >{`-${defenseDamage}`}</div>
            <div className="relative top-[-1px]">
              <Icon type="S" />
            </div>
            <div className="text-[9px] uppercase">
              <I18Ntext str="defense" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AttackIndicator;
