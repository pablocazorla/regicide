import Icon from "@/components/icon";
import I18Ntext from "@/i18n";
import clsx from "clsx";
import { useEffect, useState } from "react";

const LifeIndicator = ({ life }) => {
  const [pinning, setPinning] = useState(false);
  const [currentLife, setCurrentLife] = useState(0);

  useEffect(() => {
    let timer = null;

    const changeLife = (oldLife) => {
      if (life < oldLife) {
        setPinning(true);
        timer = setTimeout(() => {
          setPinning(false);
        }, 600);
      }
      return life;
    };

    setCurrentLife(changeLife);

    return () => {
      clearTimeout(timer);
    };
  }, [life]);

  return (
    <div className="flex items-center bg-red-800 justify-center rounded-full gap-1 border-2 border-white shadow-md">
      <div
        className={clsx("font-bold text-lg", {
          "motion-safe:animate-ping": pinning,
        })}
      >
        {currentLife}
      </div>
      <div className="">
        <Icon type="life" />
      </div>
      <div className="uppercase text-[9px] font-bold">
        <I18Ntext str={"card.life"} />
      </div>
    </div>
  );
};

export default LifeIndicator;
