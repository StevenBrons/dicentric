import { useDrop } from "react-dnd";
import Dice, { DICE } from "../game_logic/items/dice";
import ItemSlot from "./ItemSlot";
import { groupBy } from "lodash";
import { useContext } from "react";
import { gameContext } from "./App";

const Tray: React.FC = () => {

	const [gameState, update] = useContext(gameContext);
	const inventory = gameState.inventory;
	const [{ isOver }, dropRef] = useDrop({
		accept: "item",
		drop: (item) => {
			gameState.eventState?.deselectDice(item as Dice, gameState);
			update();
		},
		collect: (monitor) => ({
			isOver: monitor.isOver()
		})
	})

	const diceGroups = groupBy(inventory.filter(i => i instanceof Dice), i => (i as Dice).type);
	const diceList : DICE[] = [4, 6, 8, 10, 12, 20];

	const diceSlots = diceList.map(d => 
		<ItemSlot
			hasMultiple={diceGroups[d]?.length > 1}
			item={diceGroups[d]?.length > 0 ? diceGroups[d][0] : null} 
			placeHolder={Dice.getImage(d)}
			key={d}
			slotType="tray"
		/>);

	

	const diceAmounts = diceList.map(i => <span key={i}>x{diceGroups[i]?.length || 0}</span>);
	const equipments  = diceList.map(i => <ItemSlot item={gameState.equipment.getDiceEquipment(i)} key={i} slotType="tray" />);
	
	return <div className={`Tray ${isOver ? "Glow" : ""}`} ref={dropRef}>
		{diceSlots}
		{diceAmounts}
		{equipments}
	</div>

}


export default Tray;