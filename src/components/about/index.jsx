import Modal from "../modal";
import { useContext } from "react";
import AppOptionContext from "@/contexts/appOptions/context";
import I18Ntext from "@/i18n";
import Icon from "../icon";
import Image from "next/image";
import boxSrc from "@/img/box.webp";
import pablocazorlaSrc from "@/img/pablocazorla.webp";
import BuyMeACoffee from "./buyMeACoffee";

const AboutModal = () => {
  const { visibleAbout, setVisibleAbout } = useContext(AppOptionContext);

  return (
    <Modal visible={visibleAbout}>
      <header className="text-center p-3 text-sm uppercase">
        <I18Ntext str="about.title" />
      </header>
      <div
        className="pt-5 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("/img/regicide-bg.svg")` }}
      >
        <div className="mb-5">
          <Image
            src={boxSrc}
            width={213}
            height={300}
            alt="Regicide box"
            className="mx-auto mb-4 drop-shadow-2xl"
          />
          <div className="text-center text-sm mb-6">
            <I18Ntext str="about.p.1" isForHTML />
          </div>
          <div className="bg-amber-400 text-amber-950 font-bold p-3 text-sm text-center shadow-[2px_0_10px_rgba(0,0,0,0.4)] rounded-md mb-6">
            <div className="mb-2">
              <I18Ntext str="about.p.2" isForHTML />
            </div>
            <a
              href="https://www.regicidegame.com/"
              className="text-teal-800 underline"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="text-lg mr-1">
                <Icon type="link" />
              </span>
              <span>https://www.regicidegame.com/</span>
            </a>
          </div>
          <hr className="opacity-30 mb-5" />
          <h2 className="mb-4 font-bold text-center">
            <I18Ntext str="about.author.title" />
          </h2>
          <div className="flex gap-3 mb-3">
            <div>
              <div className="w-16">
                <Image
                  src={pablocazorlaSrc}
                  width={64}
                  height={64}
                  alt="Pablo Cazorla"
                  className="shadow-2xl rounded-full w-auto h-auto"
                />
              </div>
            </div>

            <div className="text-xs">
              <div className="mb-3">
                <I18Ntext str="about.author.p.1" isForHTML />
              </div>
              <div>
                <I18Ntext str="about.author.p.2" isForHTML />
              </div>
            </div>
          </div>
          <BuyMeACoffee />
        </div>
        <hr className="opacity-30" />
        <div className="py-6 text-center">
          <button
            className=" bg-emerald-500 py-3 px-11 font-bold rounded-md shadow-md"
            onClick={() => {
              setVisibleAbout(false);
            }}
          >
            Ok
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default AboutModal;
