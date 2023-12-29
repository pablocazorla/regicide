import { AnimatePresence } from "framer-motion";
import Card from "@/components/card";
import useDeck from "./useDeck";

const DeckPool = () => {
  const { deckTitle, discardTitle, deckPool, discardPool } = useDeck();
  return (
    <div className="flex justify-end items-start gap-2">
      <div className="">
        <div className="relative w-10 h-16 border border-green-600 rounded">
          <AnimatePresence>
            {deckPool.map((v, k) => {
              return <Card key={v + k} v={v} back size="xs" absolute />;
            })}
          </AnimatePresence>
        </div>
        <div className="text-green-300 uppercase text-center pt-1">
          <div className="text-xs font-bold">{deckPool.length}</div>
          <div className="text-[9px]">{deckTitle}</div>
        </div>
      </div>

      <div className="">
        <div className="relative mx-auto w-10 h-16 border border-green-600 rounded">
          <AnimatePresence>
            {discardPool.map((v, k) => {
              return <Card key={v + k} v={v} size="xs" absolute />;
            })}
          </AnimatePresence>
        </div>
        <div className="text-green-300 uppercase text-center pt-1">
          <div className="text-xs font-bold">{discardPool.length}</div>
          <div className="text-[9px]">{discardTitle}</div>
        </div>
      </div>
    </div>
  );
};
export default DeckPool;
