import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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

function App() {
  
  const [screen, setScreen] = useState(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <MapLayer />

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