import { AnimatePresence } from "framer-motion";
import Card from "@/components/card";
import useTablePool from "./useTablePool";
import ActionTable from "@/components/actionTable";
import clsx from "clsx";

const TablePool = () => {
  const { tablePool, onClickTableCard } = useTablePool();
  return (
    <div
      className={clsx({
        "mb-2 flex border-b border-green-600 pb-3 min-h-8": tablePool.length,
      })}
    >
      <div>
        <div className="grid grid-cols-2 gap-2 justify-center">
          <AnimatePresence>
            {tablePool.map((v, k) => {
              return (
                <Card
                  key={v + k}
                  v={v}
                  onClick={() => {
                    onClickTableCard(v);
                  }}
                  size="sm"
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
      <div className="pl-4 text-center w-1/2">
        <ActionTable />
      </div>
    </div>
  );
};
export default TablePool;
