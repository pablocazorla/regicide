import { AnimatePresence } from "framer-motion";
import Card from "@/components/card";
import useHand from "./useHand";
import Icon from "../icon";
import I18Ntext from "@/i18n";

const HandPool = () => {
  const {
    handPoolToRender,
    enemySuit,
    payDamagePool,
    handDisable,
    onClickHandCard,
    orderedHand,
    toggleOrderedHand,
  } = useHand();
  return (
    <div className="relative">
      <div className="flex h-72 pt-7">
        <AnimatePresence>
          {handPoolToRender.map((v, k) => {
            const ang = (k - 3) * 3;

            const highlighted =
              payDamagePool.length && payDamagePool.indexOf(v) >= 0;

            return (
              <div
                className="w-[12.5%]"
                key={v}
                style={{ transform: `rotate(${ang}deg)` }}
              >
                <Card
                  v={v}
                  enemySuit={enemySuit}
                  onClick={() => {
                    onClickHandCard(v);
                  }}
                  size="lg"
                  disabled={handDisable[v]}
                  highlighted={highlighted}
                />
              </div>
            );
          })}
        </AnimatePresence>
      </div>
      {handPoolToRender.length &&
      handPoolToRender.length > Object.entries(handDisable).length ? (
        <div className="absolute left-0 bottom-0  w-full flex justify-center animate-fadein">
          <button
            className="text-xs text-black flex items-center justify-center gap-1 bg-white/60 border p-2 rounded-full shadow-lg"
            onClick={toggleOrderedHand}
          >
            <div>
              <Icon type={orderedHand ? "checkYes" : "checkNo"} />
            </div>
            <div>
              <I18Ntext str="ordered.hand" />
            </div>
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default HandPool;
