import MapState from "./mapState";
import Item from "./items/item";
import EquipState from "./equipState";
import Equipment from "./items/equipment";
import GameEvent from "./events/gameEvent";
import MapNode from "./mapNode";
import Level from "./level";


class GameState {
	mapState: MapState;
	inventory: Item[];
	level: number;
	lives: number;
	equipment: EquipState;
	eventState: GameEvent | null;  

	constructor(level: Level) {
		this.mapState = level.map;
		this.inventory = level.startInventory; 
		this.level = level.number;
		this.lives = 20; //start levens??
		this.equipment = new EquipState();
		this.eventState = null;
	}

	equipDice(eq: Equipment, d: DICE):void {
		//check if equipment in inventory 
		if(!this.inventory.includes(eq)) {
			throw new Error("trying to equip equipment which is not present in inventory");
		}

		//remove equipment from inventory
		let i = this.inventory.indexOf(eq);
		this.inventory.splice(i, 1);
	
		//check if there already was an equipment
		let oldeq = this.equipment.getDiceEquipment(d);
		if(oldeq != null) {
			//put old equipment back in inventory 
			this.inventory.push(oldeq);
		}

		//equip new equipment
		this.equipment.diceEquipment.set(d,eq);
	}

	loseLives(nr: number):void {
		this.lives = this.lives - nr;
	}

	move(node : MapNode):void {
		this.mapState.setLocation(node);
		if(node.event != null) {
			this.setEvent(node.event);
		}
	}

	getEvent(): GameEvent | null{
		return this.eventState;
	}

	setEvent(e : GameEvent): void {
		this.eventState = e;
	}

	endEvent(): void {
		this.eventState = null;
	}
}

export default GameState;