"use client";
import { useContext } from "react";
import AppOptionContext from "@/contexts/appOptions/context";
import StartScreen from "@/screens/startScreen";
import TableScreen from "@/screens/tableScreen";
import LostScreen from "@/screens/lostScreen";
import WinScreen from "@/screens/winScreen";
import AboutModal from "@/components/about";
import HowToPlayModal from "@/components/howToPlay";
import RankModal from "@/components/rank";

/*
    0 - Start screen
    1 - Game
    2 - Lost Game
    3 - Win Game
*/

export default function MainApp() {
  const { appStatus } = useContext(AppOptionContext);

  const screenList = [
    null,
    <StartScreen key={1} />,
    <TableScreen key={2} />,
    <LostScreen key={3} />,
    <WinScreen key={4} />,
  ];

  return (
    <>
      {screenList[appStatus]}
      <AboutModal />
      <HowToPlayModal />
      <RankModal />
    </>
  );
}
