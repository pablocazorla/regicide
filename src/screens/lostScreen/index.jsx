import SadIcon from "./sad-icon";
import I18Ntext from "@/i18n";
import useLostScreen from "./useLostScreen";

const LostScreen = () => {
  const { onClickNewGame, backToMainScreen } = useLostScreen();
  return (
    <main className="container grid place-content-center animate-fadein">
      <div className="text-center px-5">
        <h1 className="font-bold text-5xl mb-7">
          <I18Ntext str="lostScreen.title" />
        </h1>
        <I18Ntext str="lostScreen.lead" isForHTML />
        <div className="w-40 mx-auto pt-16 pb-1">
          <SadIcon className="drop-shadow-2xl text-amber-400 animate-bounce" />
        </div>
        <div className="text-center">
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
  );
};

export default LostScreen;
