import React, { useContext, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GameEvent from "../game_logic/events/gameEvent";
import ShopEvent from "../game_logic/events/shopEvent";
import GameState from "../game_logic/gameState";
import Tray from "./Tray";
import MapLayer from "./MapLayer";
import Battle  from "./screens/Battle";
import Dialogue from "./screens/Dialogue";
import Inventory from "./screens/Inventory";
import Shop from "./screens/Shop";
import level1 from "../levels/level1";

function getScreen(gameEvent: GameEvent | null) {

  switch (gameEvent?.name) {
    case "Shop":
      return <Shop shopEvent={gameEvent as ShopEvent}/>
    case "Battle":
      return <Battle />
    case "Dialogue":
      return <Dialogue />
    default:
      return null;
  }
}

type GameContext = [GameState, () => void, number];

export const gameContext = React.createContext<GameContext>([new GameState(level1), () => {}, 0])

function App() {
  
  const [gameState, setGameState] = useState(new GameState(level1));
  const [updateNumber, setUpdateNumber] = useState(0);

  function updateGameState() {
    setGameState(gameState);
    setUpdateNumber(updateNumber + 1);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <gameContext.Provider value={[gameState, updateGameState, updateNumber]}>
        <MapLayer />
        <div className="MenuLayer">
          <div className={`Screen ${gameState.eventState ? gameState.eventState.name : "hidden"}`}>
            {getScreen(gameState.eventState)}
          </div>
          <Tray />
          { gameState.eventState ? <RollButton /> : <div />}
        </div>
      </ gameContext.Provider>
    </DndProvider>
  );
}

const RollButton = () => {

  const [gameState, update] = useContext(gameContext);
  const [isDown, setDown] = useState(false);
  const canRoll = gameState.eventState?.canRoll();

  return <div
    className={`RollButton ${isDown && canRoll ? "down" : "up"} ${canRoll ? "enabled" : "disabled"}`}
    onMouseDown={() => setDown(true)}
    onMouseUp={() => setDown(false)}
    onClick={() => {
      if (canRoll) {
        gameState.eventState?.rollDice(gameState);
        update();
      }}
    } 
  >
    Roll
  </div>
}

export default App;