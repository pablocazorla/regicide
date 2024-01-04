"use client";
import I18Ntext from "@/i18n";
import Icon from "../icon";
import LangModal from "./lang";
import useStartScreen from "./useStartScreen";

const version = 1.5;

const StartScreen = ({
  setAppStatus,
  setVisibleAbout,
  isFullScreen,
  toggleFullScreen,
}) => {
  const {
    savedGame,
    showLangModal,
    setShowLangModal,
    onClickContinueGame,
    onClickNewGame,
    loadingForNewGame,
  } = useStartScreen(setAppStatus);

  return (
    <>
      <main className="container grid place-content-center animate-fadein">
        <div className="text-center px-7">
          <h1 className="font-bold text-5xl mb-1">Regicide</h1>
          <div className="mb-3">
            <span className="uppercase font-bold">
              <I18Ntext str="solo.title" />
            </span>
            <span className="pl-2 text-[9px]">{`v.${version}`}</span>
          </div>
          <hr className="opacity-30 mb-3" />
          <p className="mb-3">
            <I18Ntext str="startScreen.text.1" />
          </p>
          <p className="text-xs mb-1">
            <I18Ntext str="startScreen.text.2" />
          </p>

          <button
            className="uppercase font-bold text-[10px] bg-black/40 py-1 px-5 rounded-full mb-4"
            onClick={() => {
              setVisibleAbout(true);
            }}
          >
            <I18Ntext str="startScreen.readMore" />
          </button>
          <hr className="opacity-30" />
          <button
            className="text-[10px] uppercase   p-4"
            onClick={() => {
              setShowLangModal(true);
            }}
          >
            Language / Idioma
          </button>
          <div className="flex flex-col items-stretch gap-3 pb-3">
            <div className="pb-3">
              <button
                className="border border-dotted border-emerald-600 bg-black/10 py-2 px-6  rounded-lg flex items-center gap-1 mx-auto"
                onClick={toggleFullScreen}
              >
                <div className="text-2xl leading-none">
                  <Icon type="fullscreen" />
                </div>
                <div className="text-xs leading-none">
                  <I18Ntext
                    str={
                      isFullScreen ? "setFullScreen.Out" : "setFullScreen.In"
                    }
                  />
                </div>
              </button>
            </div>

            {savedGame ? (
              <>
                <button
                  className="bg-emerald-500 p-3 rounded-full font-bold shadow-lg"
                  onClick={onClickContinueGame}
                >
                  <I18Ntext str="btn.continueGame" />
                </button>
                <div className="">
                  <I18Ntext str="continueGame.or.newGame" />
                </div>
              </>
            ) : null}
            <button
              className="bg-emerald-600 p-3 rounded-full font-bold shadow-lg flex justify-center items-center gap-1"
              onClick={onClickNewGame}
            >
              {loadingForNewGame && <Icon type="loading" />}
              <I18Ntext str="btn.newGame" />
            </button>
            <div className="pt-4">
              <a
                href=""
                className="underline"
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="text-lg mr-1">
                  <Icon type="link" />
                </span>
                <span className="text-xs">
                  <I18Ntext str="btn.learnToPlay" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <LangModal visible={showLangModal} setVisible={setShowLangModal} />
    </>
  );
};

export default StartScreen;
