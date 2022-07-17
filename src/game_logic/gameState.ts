import MapState from "./mapState";
import Item from "./items/item";
import EquipState from "./equipState";
import Equipment from "./items/equipment";
import GameEvent from "./events/gameEvent";
import MapNode from "./mapNode";
import Level from "./level";
import Dice, { DICE } from "./items/dice";
import InventoryEvent from "./events/inventoryEvent";
import level1 from "../levels/level1";
import AverageOnly from "./items/equipment/averageOnly";

class GameState {
	mapState: MapState;
	inventory: Item[];
	inventoryStartLevel: Item[];
	level: number;
	levels: Level[];
	lives: number;
	equipment: EquipState;
	eventState: GameEvent | null;  
	previousEventName: string = "";

	constructor(levels: Level[]) {
		this.mapState = levels[0].map;
		this.inventory = levels[0].startInventory; 
		this.inventoryStartLevel = levels[0].startInventory;
		this.level = 0;
		this.levels = levels;
		this.lives = 100; //start levens??
		this.equipment = new EquipState();
		this.eventState = levels[0].map.startNode.event;
	}

	static initialGameState() : GameState {
		let gameState = new GameState([level1]);
		const eqp = new AverageOnly();
		gameState.inventory.push(eqp);
		gameState.equipDice(eqp, DICE.d20);
		return gameState;
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
		this.previousEventName = this.eventState.name;
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

	updateLevel() : void {
		this.level++;
		if(this.level === this.levels.length) {
			return //game ended TODO
		}
		this.mapState = this.levels[this.level].map;
		this.inventory = this.inventory.filter(item => !(item instanceof Dice)).concat(this.levels[this.level].startInventory);
		this.inventoryStartLevel = this.inventory;
		this.lives = 100; //of oude hoeveelheid levens???
		this.eventState = this.levels[this.level].map.startNode.event;
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

	getButtonText() : string {
		if(this.levelCompleted()) {
			return "Next";
		}
		if(this.eventState === null) {
			return "Equip"
		}
		if(this.inventory.filter(item => (item instanceof Dice)).length === 0 && !this.eventState?.closable) {
			return "Restart";
		}
		return this.eventState.buttonText;
	}

	canPress() : boolean {
		if(this.eventState === null || this.getButtonText() === "Restart") {
			return true;
		}
		return this.eventState.canPress();
	}

	pressButton() : void {
		if(this.getButtonText() === "Restart") {
			this.resetLevel();
			return;
		}
		if(this.eventState === null) {
			if(this.levelCompleted()) {
				this.updateLevel();
				return
			}
			this.eventState = new InventoryEvent();
			return;
		}
		else this.eventState.pressButton(this);
	}
}

export default GameState;