import { useContext } from "react";
import Dice from "../../game_logic/items/dice";
import { gameContext } from "../App";
import ItemSlot from "../ItemSlot";
import "./Inventory.css";
import Screen from "./Screen";

const Inventory = () => {

	const [gameState, update] = useContext(gameContext);
	const SIZE = 3*6;
	const items = gameState.inventory.filter(i => !(i instanceof Dice));

	console.log(gameState);
	console.log(items);

	// const dices = diceList.map(d => 
	// 	<ItemSlot
	// 		item={new Dice(d)} 
	// 		key={d}
	// 	/>);

	let c = 0;
	let slots = [];
	for (let i = 0; i < SIZE; i++) {
		if (c < items.length) {
			slots[i] = <ItemSlot key={i} item={items[c]} slotType="inventory"/>;
		} else {
			slots[i] = <ItemSlot key={i} item={null} slotType="inventory"/>;
		}
		c++;
	}


	return <div className="Inventory">
		<h1>
			Inventory
		</h1>
		<div className="Inner">
			<div className="Slots">
				{slots}
			</div>
		</div>
	</div>
}

export default Inventory;