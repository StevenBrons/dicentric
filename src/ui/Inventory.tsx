import { useDrop } from "react-dnd";
import Dice, { DICE } from "../game_logic/items/dice";
import Item from "../game_logic/items/item";
import ItemSlot from "./ItemSlot";
import { groupBy } from "lodash";
import Equipment from "../game_logic/items/equipment";
import { useContext } from "react";
import { gameContext } from "./App";

const Inventory: React.FC = () => {

	const [gameState, update] = useContext(gameContext);
	const inventory = gameState.inventory;

	const [{ isOver }, dropRef] = useDrop({
		accept: "item",
		drop: (item) => {
			gameState.eventState?.deselectDice(item as Dice, gameState);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver()
		})
	})

	const equipables : Equipment[] = inventory.filter(i => !(i instanceof Dice)) as Equipment[];
	const diceGroups = groupBy(inventory.filter(i => i instanceof Dice), i => (i as Dice).type);
	const diceList = [4, 6, 8, 10, 12, 20];

	const diceSlots = diceList.map(d => 
		<ItemSlot
			hasMultiple={diceGroups[d]?.length > 1}
			item={diceGroups[d]?.length > 0 ? diceGroups[d][0] : null} 
			placeHolder={Dice.getImage(d)}
			key={d}
		/>);
	const diceAmounts = diceList.map(i => <span key={i}>x{diceGroups[i]?.length || 0}</span>);
	const equipableSlots = [0,1,2,3,4,5].map(i => <ItemSlot item={equipables[i]} key={i} />);
	
	return <div className={`Inventory ${isOver ? "Glow" : ""}`} ref={dropRef}>
		{diceSlots}
		{diceAmounts}
		{equipableSlots}
	</div>

}


export default Inventory;