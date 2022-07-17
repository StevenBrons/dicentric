import GameEvent, { GameAction } from "./gameEvent";
import Dice from "../items/dice";
import Item from "../items/item";
import GameState from "../gameState";

class DialogueEvent extends GameEvent {
	actions: GameAction[];
    selectedDice: Dice[][];
    name: string;
	dialogueActions: {succes: (n: number) => boolean, rewards: Item[]}[];

    constructor(actions: {text: string, slots: number, effect: {succes: (n: number) => boolean, rewards: Item[]}}[]) { //effects implementeren
        super(actions.length);
		this.actions = []; 
		this.selectedDice = [];
		this.dialogueActions = [];
		for(let i = 0; i<actions.length; i++) {
			this.actions.push({nrDiceSlots : actions[i].slots, text : actions[i].text});
			this.selectedDice.push([]);
			this.dialogueActions.push(actions[i].effect); 
		}
        this.name = "Dialogue";
    }

	rollDice(option: number, gameState: GameState): boolean {
		//returns true upon succes
		super.rollDice(option, gameState);
		if(this.dialogueActions[option].succes(this.rollResultSum)) {
			gameState.addToInventory(this.dialogueActions[option].rewards);
			gameState.endEvent();
			return true;
		}
		gameState.endEvent();
		return false;
	}
}

export default DialogueEvent;