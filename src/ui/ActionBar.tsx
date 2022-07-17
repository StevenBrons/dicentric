import { FC, useContext } from "react";
import { useDrop } from "react-dnd";
import GameEvent, { GameAction } from "../game_logic/events/gameEvent";
import Dice from "../game_logic/items/dice";
import { gameContext } from "./App";
import ItemSlot from "./ItemSlot";

interface Props {
	index: number;
}

const ActionBar : FC<Props> = ({ index }) => {

	const [gameState, update] = useContext(gameContext);
	const event = gameState.eventState as GameEvent;
	const action = event.actions[index] as GameAction;
	const selectedDice = event.selectedDice[index];

	const [{ isOver }, dropRef] = useDrop({
		accept: "item",
		drop: (item) => {event.selectDice(item as Dice, index, gameState); update()},
		collect: (monitor) => ({
			isOver: monitor.isOver()
		})
	})

	let c = 0;
	let slots = [];
	for (let i = 0; i < action.nrDiceSlots; i++) {
		if (c < selectedDice.length) {
			slots[i] = <ItemSlot key={i} item={selectedDice[c]}/>;
		} else {
			slots[i] = <ItemSlot key={i} item={null}/>;
		}
		c++;
	}

	return <div className="ActionBar" ref={dropRef}>
		<div className="text">
			{action.text}
		</div>
		<div className="ItemGroup">
			<div className="inner">
				{slots}
			</div>
		</div>
	</div>
}

export default ActionBar;