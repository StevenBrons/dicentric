import { FC } from "react";
import { useDrop } from "react-dnd";
import { GameAction } from "../game_logic/events/gameEvent";
import Dice from "../game_logic/items/dice";
import ItemSlot from "./ItemSlot";

interface Props {
	action: GameAction,
	selectedDice: Dice[],
	selectDice: (d: Dice) => void;
}

const ActionBar : FC<Props> = ({ action, selectedDice, selectDice }) => {

	const [{ isOver }, dropRef] = useDrop({
		accept: "item",
		drop: (item) => selectDice(item as Dice),
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