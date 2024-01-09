import Modal from "../modal";
import I18Ntext from "@/i18n";
import useModeSilence from "./usemodeSilence";

const ModeSilence = () => {
  const { visible, toggleVisible, modeSilence, toggleModeSilence } =
    useModeSilence();
  return modeSilence ? null : (
    <>
      <button
        className="flex items-center gap-1 pt-2 text-xs"
        onClick={toggleVisible}
      >
        <div>
          <I18Ntext str="modeSilence.use" />
        </div>
        <div className="bg-amber-950 text-amber-400 font-bold leading-4 w-4 text-center rounded-full">
          ?
        </div>
      </button>
      <Modal visible={visible}>
        <header className="text-center bg-black/20 text-white p-3 text-sm uppercase">
          <I18Ntext str="modeSilence.title" />
        </header>
        <section className="text-white p-3 text-center">
          <div>
            <I18Ntext str="modeSilence.lead" isForHTML />
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
              onClick={toggleModeSilence}
            >
              <I18Ntext str="modeSilence.use" />
            </button>
          </div>
        </section>
      </Modal>
    </>
  );
};
export default ModeSilence;
