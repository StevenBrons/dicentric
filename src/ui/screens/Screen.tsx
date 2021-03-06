import { FC, ReactNode, useContext, useState } from "react";
import GameEvent from "../../game_logic/events/gameEvent";
import ActionBar from "../ActionBar";
import { gameContext } from "../App";
import "./Screen.css";

type Props = {
  name: string,
	children: ReactNode | ReactNode[]
};

const Screen : FC<Props> = ({name, children}) => {

	const [gameState] = useContext(gameContext);
	const event = gameState.eventState as GameEvent;

	return <>
		<h1>
			{name}
		</h1>
		<div>
			{event.description}
		</div>
		{children}
		<div className="Actions">
			{event.actions.map((a, i) => <ActionBar index={i} key={i} />)}
		</div>
		{ gameState.eventState?.closable ? <CloseButton /> : <></>}
	</>
}

export const CloseButton = () => {

  const [gameState, update] = useContext(gameContext);
  const [isDown, setDown] = useState(false);

  return <div
    className={`CloseButton ${isDown ? "down" : "up"}`}
    onMouseDown={() => setDown(true)}
    onMouseUp={() => setDown(false)}
    onClick={() => {
      gameState.endEvent();
      update();
    }} 
  >
  </div>
}

export default Screen;