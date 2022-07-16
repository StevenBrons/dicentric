import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GameState from "../game_logic/gameState";
import level1 from "../levels/level1";
import Inventory from "./Inventory";
import MapLayer from "./MapLayer";
import Battle  from "./screens/Battle";
import Dialogue from "./screens/Dialogue";
import Equipment from "./screens/Equipment";
import { getShop } from "./screens/Shop";

function getScreen(name: string | null) {

  switch (name) {
    case "shop":
      return getShop();
    case "battle":
      return <Battle />
    case "equipment":
      return <Equipment />
    case "dialogue":
      return <Dialogue />
    default:
      return null;
  }
}

const GameContext = React.createContext(new GameState(level1));

function App() {
  
  const [screen, setScreen] = useState(null);
  const [gameState, setGameState] = useState(new GameState(level1));

  return (
    <DndProvider backend={HTML5Backend}>
      <GameContext.Provider value={gameState}>
        <MapLayer />
      </ GameContext.Provider>
    </DndProvider>
  );
}

export default App;

// <div className="MenuLayer">
// {getScreen(screen)}
// {/* <ItemGroup width={4}/>
// <br />
// <ItemGroup width={2}/> */}
// <Inventory items={[]}/>
// </div>