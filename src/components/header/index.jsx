import { useContext, useEffect, useState } from "react";
import GameContext from "@/contexts/game/context";

const Header = () => {
  const { Game, update } = useContext(GameContext);

  const [c, setC] = useState(0);

  return (
    <header className="bg-teal-950 relative z-20">
      <div className="h-12">header {c}</div>
    </header>
  );
};
export default Header;
