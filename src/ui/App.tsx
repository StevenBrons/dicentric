import React, { useContext, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GameEvent from "../game_logic/events/gameEvent";
import ShopEvent from "../game_logic/events/shopEvent";
import GameState from "../game_logic/gameState";
import testlevel1 from "../levels/testlevel1";
import level1 from "../levels/testlevel2";
import Tray from "./Tray";
import MapLayer from "./MapLayer";
import Battle  from "./screens/Battle";
import Dialogue from "./screens/Dialogue";
import Inventory from "./screens/Inventory";
import Shop from "./screens/Shop";

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
  
  const [gameState, setGameState] = useState(new GameState(testlevel1));
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
          {getScreen(gameState.eventState)}
          {/* <Inventory /> */}
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
  const canRoll = !gameState.eventState?.rolled

  return <div
    className={`RollButton ${isDown && canRoll ? "down" : "up"} ${canRoll ? "enabled" : "disabled"}`}
    onMouseDown={() => setDown(true)}
    onMouseUp={() => setDown(false)}
    onClick={() => {
      if (canRoll) {
        gameState.eventState?.rollDice(0, gameState);
        update();
      }}
    } 
  >
    Roll
  </div>
}


export default App;