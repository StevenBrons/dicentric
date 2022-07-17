import { FC, useContext } from "react";
import { gameContext } from "./App";
import "./MapLayer.css";

const VIEW_WIDTH = 320;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

type NodeProps = {
	pos: {x: number, y: number }, 
	pixelSize: number, 
	onClick: any,
	canTravel: boolean,
	image: string,
}

const Node : FC<NodeProps> = ({pos: {x, y}, pixelSize, onClick, canTravel, image}) => {
	return <div
		className={`Node ${canTravel ? "CanTravel" : ""}`}
		style={{
			left: `${x * pixelSize}px`, 
			top: `${y * pixelSize}px`, 
			// backgroundSize: `${}`
			// backgroundImage: `url(${image})`, 
		}}
		onClick={canTravel ? onClick : () => {}}
	
	>
	</div>
}

const MapLayer = () => {

	const [gameState, update] = useContext(gameContext);
	const { location, map, image, mapSize } = gameState.mapState;
	const screenSize = getWindowDimensions();

	const pixelSize = screenSize.width / VIEW_WIDTH;

	const nodes = map.map((node) => 
		<Node
			pos={{x: node.x, y: node.y}}
			key={node.id}
			onClick={() => { gameState.move(node); update()}}
			pixelSize={pixelSize}
			canTravel={location.nodesInFront.includes(node)}
			image=""
		/>
	);

	return <div className="MapLayer" style={{
				// backgroundImage: `url(${image})`, 
				backgroundColor: "#06F1FF",
				width: `${pixelSize*mapSize.width}px`,
				height: `${pixelSize*mapSize.height}px`,
				left: `${-location.x*pixelSize-300}px`,
				top: `${-location.y*pixelSize}px`,
			}}>
			{nodes}
	</div>
}

export default MapLayer;