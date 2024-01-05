import { VERSION } from "@/constants";
import Icon from "../icon";
import useHeader from "./useHeader";
import I18Ntext from "@/i18n";

const Header = () => {
  const { showMenu, toggleMenu, showHowToPlay, showAbout, exitGame } =
    useHeader();
  return (
    <>
      <header className="shadow-[0_1px_5px_rgba(0,0,0,0.3)] relative z-20">
        <div className="flex items-center justify-between px-7 py-1">
          <h1 className="font-bold pt-1 opacity-70">
            <strong>Regicide</strong>{" "}
            <span className="uppercase text-xs">
              <I18Ntext str="solo.title" />
            </span>{" "}
            <span className="text-xs">{`v.${VERSION}`}</span>
          </h1>
          <button className="text-2xl" onClick={toggleMenu}>
            <Icon type="menu" />
          </button>
        </div>
      </header>
      {showMenu && (
        <menu className="fixed z-50 top-0 left-0 bg-black/60 w-screen h-screen backdrop-blur-sm animate-fadein">
          <div className="px-7 py-1 flex items-center justify-end">
            <button className="text-2xl" onClick={toggleMenu}>
              <Icon />
            </button>
          </div>
          <div className="flex flex-col h-screen w-screen justify-center pb-24">
            <div className="text-center text-xl font-bold flex flex-col w-screen gap-4 px-11">
              <button className="block w-full" onClick={showHowToPlay}>
                <I18Ntext str="menu.howToPlay" />
              </button>
              <button className="block w-full" onClick={showAbout}>
                <I18Ntext str="menu.about" />
              </button>
              <hr className="opacity-50" />
              <button className="block w-full" onClick={exitGame}>
                <I18Ntext str="menu.exit" />
              </button>
            </div>
          </div>
        </menu>
      )}
    </>
  );
};
export default Header;
