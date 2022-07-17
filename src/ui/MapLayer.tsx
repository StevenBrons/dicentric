import { update } from "lodash";
import { FC, useContext, useState } from "react";
import { gameContext } from "./App";
import "./MapLayer.css";

const VIEW_WIDTH = 50;

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
}

const Node : FC<NodeProps> = ({pos: {x, y}, pixelSize, onClick, canTravel}) => {
	return <div
		className={`Node ${canTravel ? "CanTravel" : ""}`}
		style={{left: `${x * pixelSize}px`, top: `${y * pixelSize}px`}}
		onClick={canTravel ? onClick : () => {}}
	>
	</div>
}

const MapLayer = () => {

	const [gameState, update] = useContext(gameContext);
	const { location, map } = gameState.mapState;
	const screenSize = getWindowDimensions();

	const mapSize = {
		width: 200,
		height: 200,
	}

	const scaling = (screenSize.width * mapSize.width) / VIEW_WIDTH;
	const pixelSize = scaling / mapSize.width;

	const nodes = map.map((node) => 
		<Node
			pos={{x: node.x, y: node.y}}
			key={node.id}
			onClick={() => { gameState.move(node); update()}}
			pixelSize={pixelSize}
			canTravel={location.nodesInFront.includes(node)}
		/>
	);

	return <div className="MapLayer" style={{
				backgroundImage: `url("./res/level1.png")`, 
				width: `${scaling}px`,
				height: `${scaling}px`,
				left: `${-location.x*pixelSize}px`,
				top: `${-location.y*pixelSize}px`,
			}}>
			{nodes}
	</div>
}

export default MapLayer;