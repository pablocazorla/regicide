import Modal from "../modal";
import { useCallback, useEffect, useState, useContext } from "react";
import AppOptionContext from "@/contexts/appOptions/context";
import Icon from "../icon";
import I18Ntext from "@/i18n";
import { videTutorialURL } from "@/constants";

const HowToPlayModal = () => {
  const { lang, showHowToPlay, setShowHowToPlay } =
    useContext(AppOptionContext);

  return (
    <Modal visible={showHowToPlay}>
      <header className="text-center bg-black/20 p-3 text-sm uppercase">
        <I18Ntext str="howToPlay.title" />
      </header>
      <iframe
        width="100%"
        className="aspect-video bg-black"
        src={videTutorialURL[lang]}
        title="Tutorial"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <div className="pt-3 px-4 pb-4 text-center">
        <a
          href={`/help/${lang.toLowerCase()}.pdf`}
          className="block underline mb-5"
          target="_blank"
          rel="noreferrer noopener"
        >
          <span className="text-lg mr-1">
            <Icon type="link" />
          </span>
          <span className="text-xs">
            <I18Ntext str="btn.getRules" />
          </span>
        </a>
        <button
          className=" bg-emerald-500 py-3 px-9 rounded-md shadow-md"
          onClick={() => {
            setShowHowToPlay(false);
          }}
        >
          Ok
        </button>
      </div>
    </Modal>
  );
};

export default HowToPlayModal;
