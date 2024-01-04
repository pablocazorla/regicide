"use client";
import TableScreen from "@/components/tableScreen";
import useApp from "./useApp";
import StartScreen from "@/components/startScreen";
import AboutModal from "@/components/about";

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
    <StartScreen
      key={0}
      setAppStatus={setAppStatus}
      setVisibleAbout={setVisibleAbout}
      isFullScreen={isFullScreen}
      toggleFullScreen={toggleFullScreen}
    />,
    <TableScreen
      key={1}
      setAppStatus={setAppStatus}
      setVisibleAbout={setVisibleAbout}
    />,
  ];

  return (
    <>
      {screenList[appStatus]}
      <AboutModal visible={visibleAbout} setVisible={setVisibleAbout} />
    </>
  );
}
