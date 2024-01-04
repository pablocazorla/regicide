"use client";
import TableScreen from "@/components/tableScreen";
import useApp from "./useApp";
import StartScreen from "@/components/startScreen";
import AboutModal from "@/components/about";
import AppOptionContextProvider from "@/contexts/appOptions/provider";

/*

0 - Start screen
1 - Game
2 - Lost Game
3 - Win Game

*/

export default function Home() {
  const {
    appStatus,
    setAppStatus,
    visibleAbout,
    setVisibleAbout,
    isFullScreen,
    toggleFullScreen,
  } = useApp();

  const screenList = [
    null,
    <StartScreen
      key={1}
      setAppStatus={setAppStatus}
      setVisibleAbout={setVisibleAbout}
      isFullScreen={isFullScreen}
      toggleFullScreen={toggleFullScreen}
    />,
    <TableScreen
      key={2}
      setAppStatus={setAppStatus}
      setVisibleAbout={setVisibleAbout}
    />,
  ];

  return (
    <AppOptionContextProvider>
      {screenList[appStatus]}
      <AboutModal visible={visibleAbout} setVisible={setVisibleAbout} />
    </AppOptionContextProvider>
  );
}
