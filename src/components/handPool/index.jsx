import { AnimatePresence } from "framer-motion";
import Card from "@/components/card";
import useHand from "./useHand";

const HandPool = () => {
  const { handPool, payDamagePool, handDisable, onClickHandCard } = useHand();
  return (
    <div className="flex h-72 pt-7">
      <AnimatePresence>
        {handPool.map((v, k) => {
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
  );
};
export default HandPool;
