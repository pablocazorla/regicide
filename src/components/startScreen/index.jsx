"use client";
import Icon from "../icon";
import LangModal from "./lang";
import useStartScreen from "./useStartScreen";

const version = 1.4;

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
      <main className="container grid place-content-center">
        <div className="text-center px-7">
          <h1 className="font-bold text-5xl mb-1">Regicide</h1>
          <div className="mb-3">
            <span className="uppercase font-bold">Solo</span>
            <span className="pl-2 text-[9px]">{`v.${version}`}</span>
          </div>
          <hr className="opacity-30 mb-3" />
          <p className="mb-3">
            Aplicación para que puedas probar el juego Regicide en modo
            solitario.
          </p>
          <p className="text-xs mb-1">
            Está aplicación es experimental, y sin ánimo de lucro. Si te gusta
            el juego, no dudes en adquirir el juego de mesa (podrás jugar con
            otras personas en modo cooperativo).
          </p>

          <button
            className="uppercase font-bold text-[10px] bg-black/40 py-1 px-5 rounded-full mb-4"
            onClick={() => {
              setVisibleAbout(true);
            }}
          >
            Leer más
          </button>
          <hr className="opacity-30" />
          <div className="flex flex-col items-stretch gap-3 py-3">
            <div className="py-3">
              <button
                className="border border-dotted border-emerald-600 bg-black/10 py-2 px-6  rounded-lg flex items-center gap-1 mx-auto"
                onClick={toggleFullScreen}
              >
                <div className="text-2xl leading-none">
                  <Icon type="fullscreen" />
                </div>
                <div className="text-xs leading-none">
                  {isFullScreen
                    ? "Salir de pantalla completa"
                    : "Ver en pantalla completa"}
                </div>
              </button>
            </div>

            {savedGame ? (
              <>
                <button
                  className="bg-emerald-500 p-3 rounded-full font-bold shadow-lg"
                  onClick={onClickContinueGame}
                >
                  Continuar partida
                </button>
                <div className="">o</div>
              </>
            ) : null}
            <button
              className="bg-emerald-600 p-3 rounded-full font-bold shadow-lg flex justify-center items-center gap-1"
              onClick={onClickNewGame}
            >
              {loadingForNewGame && <Icon type="loading" />}
              Nueva partida
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
                  Aprender a jugar (nueva página).
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
