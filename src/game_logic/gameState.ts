import MapState from "./mapState";
import Item from "./item";
import EquipState from "./equipState";
import Equipment from "./equipment";
import gameEvent from "./gameEvent";
import MapNode from "./mapNode";


class GameState {
	mapState: MapState;
	inventory: Item[];
	lives: number;
	equipment: EquipState;
	eventState: gameEvent;  

	equipDice(eq: Equipment, d:DICE):void {
		//check if equipment in inventory 
		if(!this.inventory.includes(eq)) {
			throw new console.error("trying to equip equipment which is not present in inventory");
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
	}

	roll(d: DICE):number {
		return Math.floor(Math.random() * (d - 1) + 1);
    };

	addToInventory(item: Item):void {
		this.inventory.push(item);
	}
}