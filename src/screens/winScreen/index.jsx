import useWinScreen from "./useWinScreen";
import I18Ntext from "@/i18n";
import Trophy from "./trophy";
import Confetti from "react-confetti";
import clsx from "clsx";

const WinScreen = () => {
  const { width, height, onClickNewGame, backToMainScreen, jokersToWin } =
    useWinScreen();

  return (
    <>
      {width && height ? <Confetti width={width} height={height} /> : null}
      <main className="container grid place-content-center animate-fadein">
        <div className="text-center px-9">
          <h1 className="font-bold text-5xl mb-7">
            <I18Ntext str="win.title" />
          </h1>
          <I18Ntext str="win.lead" isForHTML />
          <div className="w-44 mx-auto">
            <Trophy
              className={clsx("drop-shadow-2xl", {
                "text-amber-400": jokersToWin >= 2,
                "text-gray-300": jokersToWin === 1,
                "text-amber-600": jokersToWin <= 0,
              })}
            />
          </div>
          <div className="">
            <div className="font-bold">
              <I18Ntext str={`win.trophy.${jokersToWin}`} />
            </div>
            <div className="">
              (<I18Ntext str={`win.trophy.lead.${jokersToWin}`} />)
            </div>
          </div>

          <div className="text-center pt-8">
            <button
              className="bg-emerald-600 p-3 rounded-full font-bold shadow-lg flex justify-center items-center gap-1 w-full"
              onClick={onClickNewGame}
            >
              <I18Ntext str="btn.newGame" />
            </button>
            <div className="pt-4">
              <button onClick={backToMainScreen}>
                <span className="text-xs">
                  <I18Ntext str="btn.backToMainScreen" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default WinScreen;
