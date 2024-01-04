import Icon from "@/components/icon";
import Modal from "@/components/modal";
import { useState } from "react";
import Card from "@/components/card";
import I18Ntext from "@/i18n";

const ModalDiscardPool = ({ discardPool }) => {
  const [visible, setVisible] = useState(false);

  return discardPool.length ? (
    <>
      <button
        className="absolute w-10 h-16"
        onClick={() => {
          setVisible(true);
        }}
      />
      <Modal visible={visible}>
        <div className="flex items-center p-2 shadow-xl">
          <div className="grow text-center font-bold">
            {`${I18Ntext("discard")} (${discardPool.length})`}
          </div>
          <button
            className="text-xl px-1"
            onClick={() => {
              setVisible(false);
            }}
          >
            <Icon />
          </button>
        </div>
        <div className="px-3 py-5 bg-teal-800 flex flex-wrap justify-center gap-2">
          {[...discardPool].reverse().map((v, k) => {
            return <Card key={v + k} v={v} size="xs" noLayout />;
          })}
        </div>
      </Modal>
    </>
  ) : null;
};
export default ModalDiscardPool;
