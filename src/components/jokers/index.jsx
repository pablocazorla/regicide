import clsx from "clsx";
import useJokers from "./useJokers";
import Modal from "../modal";
import I18Ntext from "@/i18n";
import Icon from "../icon";

const Jokers = () => {
  const { enabledButtonJokers, jokers, visible, toggleVisible, onUseJoker } =
    useJokers();

  return (
    <>
      <div className="pt-5 pl-2" onClick={toggleVisible}>
        <div
          className={clsx(
            "border border-dotted border-green-300 pt-2 rounded-lg backdrop-blur-sm cursor-pointer",
            {
              "opacity-40": !enabledButtonJokers,
            }
          )}
        >
          <div className="flex items-center justify-center text-2xl gap-3 px-3">
            <div
              className={clsx({
                "text-black/40": jokers < 1,
                "text-green-300": jokers >= 1,
              })}
            >
              <Icon type="joker" />
            </div>
            <div
              className={clsx({
                "text-black/40": jokers < 2,
                "text-green-300": jokers === 2,
              })}
            >
              <Icon type="joker" />
            </div>
          </div>
          <div
            className={clsx("text-[9px] py-1 uppercase text-center", {
              "text-black": !jokers,
              "text-green-200": jokers,
            })}
          >
            <I18Ntext str={"useJoker"} />
          </div>
        </div>
      </div>
      <Modal visible={visible}>
        <div className="text-center font-bold p-2 shadow-xl">
          <I18Ntext str={"useJoker.title"} />
        </div>
        <div className="p-4 text-center text-sm">
          <I18Ntext str={"useJoker.explanation"} isForHTML />
        </div>
        <div className="flex items-center justify-center gap-4 pt-3 pb-5">
          <button
            className="bg-black/20 leading-none py-3 px-6 rounded-full shadow-md"
            onClick={toggleVisible}
          >
            <I18Ntext str={"btn.cancel"} />
          </button>
          <button
            className="flex gap-2 items-center bg-red-600 py-3 px-6 rounded-full shadow-md"
            onClick={onUseJoker}
          >
            <div className="leading-none">
              <Icon type="joker" />
            </div>
            <div className="leading-none">
              <I18Ntext str={"useJoker.btn"} />
            </div>
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Jokers;
