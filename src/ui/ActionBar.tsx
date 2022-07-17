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

	const canUse = !event.rolled && (event.selectedOption === index || event.selectedOption === -1);
	const hasActivated = event.rolled && event.lastSelectedOption === index;

	const [{ isOver }, dropRef] = useDrop({
		accept: canUse ? "item" : "none",
		drop: (item) => {event.selectDice(item as Dice, index, gameState); update()},
		collect: (monitor) => ({
			isOver: monitor.isOver()
		})
	})

	let c = 0;
	let slots = [];
	for (let i = 0; i < action.nrDiceSlots; i++) {
		if (hasActivated) {
			if (c < event.rollResult.length) {
				slots[i] = <div className="ItemSlot dialogue">
					<div className="Result">
						{event.rollResult[i]}
					</div>
				</div>;
			} else {
				slots[i] = <ItemSlot key={i} item={null} slotType="dialogue" />
			}
		} else {
			if (c < selectedDice.length) {
				slots[i] = <ItemSlot key={i} item={selectedDice[c]} slotType="dialogue" />
			} else {
				slots[i] = <ItemSlot key={i} item={null} slotType="dialogue"/>;
			}
		}
		c++;
	}

	return <div className={`ActionBar ${canUse ? "enabled" : "disabled"}`} ref={dropRef}>
		<div className="text">
			{action.text}
		</div>
		<div className="ItemGroup">
			{slots}
		</div>
		<div className="Sum">
			{hasActivated && `= ${event.rollResultSum}`}
		</div>
	</div>
}

export default ActionBar;