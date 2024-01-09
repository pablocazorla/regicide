import Modal from "@/components/modal";
import useLang from "./useLang";
import Icon from "@/components/icon";
import { langOptions } from "@/constants";
import clsx from "clsx";

const LangModal = ({ visible, setVisible }) => {
  const { currentLang, setCurrentLang, onClick } = useLang(setVisible);

  return (
    <Modal visible={visible}>
      <header className="text-center bg-black/20 p-3 text-sm uppercase">
        Language / Idioma
      </header>
      <section>
        <div className="flex flex-col gap-3 py-3 px-6">
          {langOptions.map((langOption) => {
            return (
              <button
                key={langOption.value}
                className={clsx(
                  "flex gap-1 items-center justify-center w-full p-2 rounded-md transition-colors",
                  {
                    "bg-white/5": langOption.value !== currentLang,
                    "bg-white/25": langOption.value === currentLang,
                  }
                )}
                onClick={() => {
                  setCurrentLang(langOption.value);
                }}
              >
                <div className="leading-none text-2xl">
                  <Icon
                    type={`check${
                      langOption.value === currentLang ? "Yes" : "No"
                    }`}
                  />
                </div>
                <div>{langOption.text}</div>
              </button>
            );
          })}
        </div>
        <div className="py-3 px-6 text-center">
          <button
            className="bg-emerald-500 py-2 px-12 font-bold rounded-md shadow-lg"
            onClick={onClick}
          >
            Ok
          </button>
        </div>
      </section>
    </Modal>
  );
};

export default LangModal;
