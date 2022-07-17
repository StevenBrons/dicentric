import MapState from "./mapState";
import Item from "./items/item";
import EquipState from "./equipState";
import Equipment from "./items/equipment";
import GameEvent from "./events/gameEvent";
import MapNode from "./mapNode";
import Level from "./level";
import Dice, { DICE } from "./items/dice";


class GameState {
	mapState: MapState;
	inventory: Item[];
	inventoryStartLevel: Item[];
	level: number;
	lives: number;
	equipment: EquipState;
	eventState: GameEvent | null;  

	constructor(level: Level) {
		this.mapState = level.map;
		this.inventory = level.startInventory; 
		this.inventoryStartLevel = level.startInventory;
		this.level = level.number;
		this.lives = 100; //start levens??
		this.equipment = new EquipState();
		this.eventState = level.map.startNode.event;
	}

	equipDice(eq: Equipment, d: DICE) : void {
		//check if equipment in inventory 
		if(!this.inventory.includes(eq)) {
			throw new Error("trying to equip equipment which is not present in inventory");
		}

		//remove equipment from inventory
		let i = this.inventory.indexOf(eq);
		this.inventory.splice(i, 1);
	
		// you do not get equipment back 

		// //check if there already was an equipment
		// let oldeq = this.equipment.getDiceEquipment(d);
		// if(oldeq != null) {
		// 	//put old equipment back in inventory 
		// 	this.inventory.push(oldeq);
		// }

		//equip new equipment
		this.equipment.diceEquipment.set(d,eq);
	}

	loseLives(nr: number) : void {
		this.lives = Math.max(this.lives - nr, 0);
		if(this.lives === 0) {
			this.resetLevel();
		}
	}

	healLives(nr: number) : void {
		this.lives = this.lives + nr;
	}

	move(node : MapNode) : void {
		if(this.eventState != null) {
			return;
		}
		this.mapState.setLocation(node);
		if(node.event != null) {
			this.setEvent(node.event);
		}
	}

	getEvent() : GameEvent | null{
		return this.eventState;
	}

	setEvent(e : GameEvent) : void {
		this.eventState = e;
	}

	endEvent() : void {
		if(this.eventState === null) { 
			return;
		}
		if(this.eventState.lastSelectedOption !== -1) {
			for(let i = 0; i< this.eventState.selectedDice[this.eventState.lastSelectedOption].length; i++) {
				this.inventory.push(this.eventState.selectedDice[this.eventState.lastSelectedOption][i]);
			}
		}
		this.eventState = null;
	}

	addToInventory(items: Item[]) : void {
		this.inventory = this.inventory.concat(items);
	}

	updateLevel(level: Level) : void {
		this.mapState = level.map;
		this.level = level.number;
		this.inventory = this.inventory.filter(item => !(item instanceof Dice)).concat(level.startInventory);
		this.inventoryStartLevel = this.inventory;
		this.lives = 100; //of oude hoeveelheid levens???
		this.eventState = level.map.startNode.event;
	}

	resetLevel() : void{
		this.mapState.resetMap();
		this.inventory = this.inventoryStartLevel;
		this.lives = 100;
		this.eventState = this.mapState.startNode.event;
	}

	levelCompleted() : boolean {
		return this.eventState === null && this.mapState.location === this.mapState.endNode;
	}
}

export default GameState;