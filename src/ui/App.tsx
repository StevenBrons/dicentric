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
    case "Inventory":
      return <Inventory />
    default:
      return null;
  }
}

type GameContext = [GameState, () => void, number];

export const gameContext = React.createContext<GameContext>([new GameState([level1,level1]), () => {}, 0])

function App() {
  
  const [gameState, setGameState] = useState(new GameState([level1,level1]));
  const [updateNumber, setUpdateNumber] = useState(0);

  const showScreen = gameState.eventState;
  const screenName = showScreen ? gameState.eventState?.name : 
    (gameState.previousEventName === "Inventory" ? "hidden2" : "hidden1");

  function updateGameState() {
    setGameState(gameState);
    setUpdateNumber(updateNumber + 1);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <gameContext.Provider value={[gameState, updateGameState, updateNumber]}>
        <MapLayer />
        <div className="MenuLayer">
          <div className={`Screen ${screenName}`}>
            {getScreen(gameState.eventState)}
          </div>
          <Tray />
          <MainButton />
        </div>
      </ gameContext.Provider>
    </DndProvider>
  );
}

const MainButton = () => {

  const [gameState, update] = useContext(gameContext);
  const [isDown, setDown] = useState(false);

  const text = gameState.getButtonText();
  const enabled = gameState.canPress();
  const onClick = () => {
    if (enabled) {
      gameState.pressButton();
      update();
    }
  }

  return <div
    className={`MainButton ${isDown && enabled ? "down" : "up"} ${enabled ? "enabled" : "disabled"}`}
    onMouseDown={() => setDown(true)}
    onMouseUp={() => setDown(false)}
    onClick={onClick} 
  >
    {text}
  </div>
}

export default App;