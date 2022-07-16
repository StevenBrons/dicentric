import { FC, useState } from "react";
import "./MapLayer.css";

const VIEW_WIDTH = 50;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


const Node : FC<{pos: {x: number, y: number}, pixelSize: number, setPos: any}>= ({pos: {x, y}, pixelSize, setPos}) => {
	return <div
		className="Node"
		style={{left: `${x * pixelSize}px`, top: `${y * pixelSize}px`}}
		onClick={() => {console.log("x"); setPos({x, y})}}
	>
	</div>
}

const MapLayer = () => {
	const screenSize = getWindowDimensions();

	const [pos, setPos] = useState({
		x: 3,
		y: 5,
	})

	const mapSize = {
		width: 200,
		height: 200,
	}

	const scaling = (screenSize.width * mapSize.width) / VIEW_WIDTH;
	const pixelSize = scaling / mapSize.width;

	return <div className="MapLayer" style={{
				backgroundImage: `url("./res/level1.png")`, 
				width: `${scaling}px`,
				height: `${scaling}px`,
				left: `${-pos.x*pixelSize}px`,
				top: `${-pos.y*pixelSize}px`,
			}}>
		<Node pos={{x: 3, y: 5}} pixelSize={pixelSize} setPos={setPos}/>
		<Node pos={{x: 9, y: 9}} pixelSize={pixelSize} setPos={setPos}/>
		<Node pos={{x: 10, y: 4}} pixelSize={pixelSize} setPos={setPos}/>
		<Node pos={{x: 15, y: 8}} pixelSize={pixelSize} setPos={setPos}/>
		<Node pos={{x: 12, y: 14}} pixelSize={pixelSize} setPos={setPos}/>
	</div>
}

export default MapLayer;