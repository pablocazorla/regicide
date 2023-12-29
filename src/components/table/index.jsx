"use client";

import EnemyPool from "@/components/enemyPool";
import DeckPool from "@/components/deckPool";
import TablePool from "@/components/tablePool";
import HandPool from "@/components/handPool";
import Header from "@/components/header";
import AttackProcess from "../attackProcess";
import GameContextProvider from "@/contexts/game/provider";

const Table = () => {
  return (
    <GameContextProvider>
      <Header />
      <main className="container p-7 h-screen">
        <div className="flex mb-8 gap-2 items-start">
          <div className="grow">
            <EnemyPool />
          </div>
          <div>
            <DeckPool />
          </div>
        </div>
        <TablePool />
        <AttackProcess />
        <HandPool />
      </main>
    </GameContextProvider>
  );
};
export default Table;
