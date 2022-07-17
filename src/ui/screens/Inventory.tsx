import { useContext } from "react";
import Dice from "../../game_logic/items/dice";
import { gameContext } from "../App";
import ItemSlot from "../ItemSlot";
import "./Inventory.css";
import Screen, { CloseButton } from "./Screen";

const Inventory = () => {

	const [gameState, update] = useContext(gameContext);
	const SIZE = 3*6;
	const items = gameState.inventory.filter(i => !(i instanceof Dice));

	let c = 0;
	let slots = [];
	for (let i = 0; i < SIZE; i++) {
		if (c < items.length) {
			slots[i] = <ItemSlot key={i} item={items[c]} slotType="dialogue"/>;
		} else {
			slots[i] = <ItemSlot key={i} item={null} slotType="dialogue"/>;
		}
		c++;
	}

	return <>
		<h1>
			Inventory
		</h1>
		<div className="Slots">
			{slots}
		</div>
		<CloseButton />
	</>
}

export default Inventory;