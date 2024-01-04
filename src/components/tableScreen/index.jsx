"use client";

import EnemyPool from "@/components/enemyPool";
import DeckPool from "@/components/deckPool";
import TablePool from "@/components/tablePool";
import HandPool from "@/components/handPool";
import Header from "@/components/header";
import GameContextProvider from "@/contexts/game/provider";
import Jokers from "@/components/jokers";
import Note from "@/components/note";

const TableScreen = () => {
  return (
    <GameContextProvider>
      <main className="container h-screen overflow-hidden">
        <Header />
        <div className="p-7">
          <div className="flex mb-8 gap-2 items-start">
            <div className="grow">
              <EnemyPool />
            </div>
            <div>
              <DeckPool />
              <Jokers />
            </div>
          </div>
          <TablePool />
          <Note className="mb-3" />
          <HandPool />
        </div>
      </main>
    </GameContextProvider>
  );
};
export default TableScreen;
