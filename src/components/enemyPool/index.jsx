import { AnimatePresence } from "framer-motion";
import Card from "@/components/card";
import Icon from "@/components/icon";
import clsx from "clsx";
import useEnemyPool from "./useEnemyPool";
import { getValues } from "@/game/utils";

const EnemyPool = () => {
  const {
    title,
    enemyList,
    enemyPool,
    enemyLife,
    attackPool,
    currentEnemyIndex,
  } = useEnemyPool();

  return (
    <div className="flex gap-6">
      <div className="">
        <div className="relative w-36 h-56 border border-green-300 rounded-lg">
          <AnimatePresence>
            {enemyPool.map((v) => {
              return <Card key={v} v={v} size="md" life={enemyLife} absolute />;
            })}
          </AnimatePresence>
          <div className="absolute flex gap-1 justify-center -left-3 -right-3 -bottom-7 z-20">
            <AnimatePresence>
              {attackPool.map((v) => {
                return <Card key={v} v={v} size="xs" shadowHover />;
              })}
            </AnimatePresence>
          </div>
        </div>
        <div className="text-green-200 text-xs uppercase text-center pt-2 relative z-10">
          {title}
        </div>
      </div>
      <div className="py-1">
        <div className="border-l-2 border-green-200/40 h-full">
          <div className="grid grid-rows-12 h-full">
            {enemyList.map((enemy, k) => {
              const [num, suit] = getValues(enemy);
              return (
                <div
                  key={k}
                  className={clsx(
                    "flex items-center gap-2 w-11 relative -left-1",
                    {
                      "border-t border-green-200/70 border-dotted":
                        !(k % 4) && k !== 0,
                    }
                  )}
                >
                  <div className="bg-green-400  w-2 h-[1px]" />
                  <div
                    key={k}
                    className={clsx(
                      "text-xs leading-none flex gap-1 items-center relative",
                      {
                        "text-green-300": k !== currentEnemyIndex,
                        "text-white": k === currentEnemyIndex,
                      }
                    )}
                  >
                    {k < currentEnemyIndex ? (
                      "·"
                    ) : (
                      <>
                        <Icon type={suit} />
                        {num}
                      </>
                    )}
                    {k > currentEnemyIndex ? (
                      <div className="absolute top-1/2 left-0 w-6 h-[1px] bg-green-200 -rotate-12" />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EnemyPool;
