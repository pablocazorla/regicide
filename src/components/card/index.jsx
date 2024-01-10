"use client";
import { motion } from "framer-motion";
import Icon from "../icon";
import { useMemo } from "react";
import clsx from "clsx";
import LifeIndicator from "./lifeIndicator";
import { enemyValues } from "@/game/constants";
import { getValues } from "@/game/utils";
import AttackIndicator from "./attackIndicator";

/* size:
xs
sm
md
lg
*/

const Card = ({
  v,
  size,
  back,
  absolute,
  shadowHover,
  life,
  disabled,
  onClick,
  highlighted,
  noLayout,
  enemySuit,
}) => {
  const { num, suit, isRed, isFigure, attackPower } = useMemo(() => {
    const [numDef, suit] = getValues(v);

    const num = numDef === "1" ? "A" : numDef;
    const isRed = suit === "H" || suit === "D";

    const isFigure = "JQK".indexOf(`${num}`) >= 0;

    const attackPower = isFigure ? enemyValues[num].attack : null;

    return {
      num,
      suit,
      isRed,
      isFigure,
      attackPower,
    };
  }, [v]);

  return (
    <motion.div
      layoutId={noLayout ? null : v}
      className={clsx("transition-colors", {
        "w-10 h-16 rounded grid place-content-center ": size === "xs",
        "w-20 h-32 rounded grid place-content-center border": size === "sm",
        "w-36 h-56 rounded-lg border": size === "md",
        "w-48 h-72 rounded-lg border": size === "lg",
        "bg-white border border-gray-300": !back && !disabled && !highlighted,
        "bg-gray-500 border border-gray-400 bg-cover bg-center bg-no-repeat":
          back && !disabled && !highlighted,
        "bg-gray-300 border border-gray-300": disabled && !highlighted,
        "bg-red-200 border-red-300 shadow-[inset_0_0_16px_rgba(255,0,0,1)]":
          !back && !disabled && highlighted,
        relative: !absolute,
        "absolute top-0 left-0": absolute,

        shadow: size === "xs" && !shadowHover && !highlighted,
        "shadow-lg": size !== "xs" && !shadowHover && !highlighted,
        "shadow-[0_3px_6px_rgba(0,0,0,0.9)]": shadowHover && !highlighted,
        "cursor-pointer": !disabled && typeof onClick !== "undefined",
        "cursor-not-allowed": disabled && typeof onClick !== "undefined",
        "cursor-default": typeof onClick === "undefined",
      })}
      style={
        back ? { backgroundImage: `url("/img/regicide-bg-card.svg")` } : null
      }
      onClick={() => {
        if (!disabled && onClick) {
          onClick();
        }
      }}
    >
      {!back ? (
        <>
          <div
            className={clsx("flex h-full transition-opacity", {
              "opacity-30": disabled,
            })}
          >
            <div
              className={clsx("text-center", {
                "text-card-black": !isRed,
                "text-card-red": isRed,
                "pl-1 pt-3 w-9": size === "lg" || size === "md",
              })}
            >
              <div
                className={clsx("font-bold leading-none", {
                  "text-4xl": size === "sm",
                  "text-2xl": size === "lg" || size === "xs" || size === "md",
                })}
              >
                {num}
              </div>
              <Icon
                type={suit}
                className={clsx({
                  "text-5xl": size === "sm",
                  "text-2xl": size === "lg" || size === "xs" || size === "md",
                  "opacity-40": suit === enemySuit,
                })}
              />
              {attackPower && size === "lg" ? (
                <div className="mt-2 bg-slate-700 w-7 inline-block py-1 rounded-full border-2 border-white text-white shadow-md">
                  <div className="">
                    <Icon type="attack" />
                  </div>
                  <div className="font-bold text-xs">{attackPower}</div>
                </div>
              ) : null}
            </div>
            {(size === "md" || size === "lg") && (
              <div className="grow py-4 pr-6">
                <div className="h-full grid place-content-center">
                  <div
                    className={clsx({
                      "text-card-black": !isRed,
                      "text-card-red": isRed,
                      "opacity-20": isFigure && size === "md",
                      "opacity-30":
                        !isFigure && size !== "md" && suit === enemySuit,
                    })}
                  >
                    <Icon type={suit} className="text-[6rem]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {isFigure && size === "md" ? (
            <div className="absolute top-1/3 left-0 w-full">
              <div className="px-4">
                <AttackIndicator attack={attackPower} />
                <LifeIndicator life={life} />
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </motion.div>
  );
};

export default Card;
