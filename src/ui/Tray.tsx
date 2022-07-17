import { useDrop } from "react-dnd";
import Dice, { DICE } from "../game_logic/items/dice";
import ItemSlot from "./ItemSlot";
import { groupBy } from "lodash";
import { useContext } from "react";
import { gameContext } from "./App";
import Equipment from "../game_logic/items/equipment";

interface EquipSlotProps {
	dice: DICE;
}

const EquipSlot: React.FC<EquipSlotProps> = ({dice}) => {
	const [gameState, update] = useContext(gameContext);
	
	const [{ isOver }, dropRef] = useDrop({
		accept: "equipment",
		drop: (item) => {gameState.equipDice(item as Equipment, dice); update()},
		collect: (monitor) => ({
			isOver: monitor.isOver()
		})
	})

	return <div ref={dropRef}>
		<ItemSlot
			item={gameState.equipment.getDiceEquipment(dice)}
			key={dice}
			slotType="tray"
			canDrag={false}
		/>
	</div>
}


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
	const equipments  = diceList.map(i => <EquipSlot dice={i}/>);
	
	return <div className={`Tray ${isOver ? "Glow" : ""}`} ref={dropRef}>
		{diceSlots}
		{diceAmounts}
		{equipments}
	</div>

}


export default Tray;