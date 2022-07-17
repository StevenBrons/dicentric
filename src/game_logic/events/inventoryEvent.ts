import GameEvent, { GameAction } from "./gameEvent";
import Dice from "../items/dice";
import GameState from "../gameState";

class InventoryEvent extends GameEvent {
	closable: boolean = true;
	description: string = "Inventory";
    selectedDice: Dice[][];
    name: string;
	actions: GameAction[];
	buttonText : string = "";

	constructor() { 
		super(0); 
		this.name = "Inventory";
		this.selectedDice = [];
		this.actions = [];
	}

	pressButton(gameState : GameState): void {
		return;
	}

	canPress() : boolean {
		return false;
	}
}

export default InventoryEvent;