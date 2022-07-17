import React, { Dispatch, SetStateAction, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GameEvent from "../game_logic/events/gameEvent";
import ShopEvent from "../game_logic/events/shopEvent";
import GameState from "../game_logic/gameState";
import level1 from "../levels/testlevel2";
import Inventory from "./Inventory";
import MapLayer from "./MapLayer";
import Battle  from "./screens/Battle";
import Dialogue from "./screens/Dialogue";
import Equipment from "./screens/Equipment";
import Shop from "./screens/Shop";

function getScreen(gameEvent: GameEvent | null) {

  switch (gameEvent?.name) {
    case "Shop":
      return <Shop shopEvent={gameEvent as ShopEvent}/>
    case "Battle":
      return <Battle />
    case "Equipment":
      return <Equipment />
    case "Dialogue":
      return <Dialogue />
    default:
      return null;
  }
}

type GameContext = [GameState, (x: GameState) => void, number];

export const gameContext = React.createContext<GameContext>([new GameState(level1), () => {}, 0])

function App() {
  
  const [gameState, setGameState] = useState(new GameState(level1));
  const [updateNumber, setUpdateNumber] = useState(0);

  function updateGameState(gs: GameState) {
    setGameState(gs);
    setUpdateNumber(updateNumber + 1);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <gameContext.Provider value={[gameState, updateGameState, updateNumber]}>
        <MapLayer />
        <div className="MenuLayer">
          {getScreen(gameState.eventState)}
          <Inventory items={gameState.inventory} />
          <div tabIndex={1} className="RollButton" onClick={() => console.log("ere")} >
            Roll
          </div>
        </div>
      </ gameContext.Provider>
    </DndProvider>
  );
}

export default App;