"use client";
import Table from "@/components/table";
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
  const { appStatus, setAppStatus, visibleAbout, setVisibleAbout } = useApp();

  const screenList = [
    <StartScreen
      key={0}
      setAppStatus={setAppStatus}
      setVisibleAbout={setVisibleAbout}
    />,
    <Table
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
