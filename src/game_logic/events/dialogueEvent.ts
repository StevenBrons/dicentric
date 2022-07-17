import GameEvent, { GameAction } from "./gameEvent";
import Dice from "../items/dice";
import Item from "../items/item";
import GameState from "../gameState";

class DialogueEvent extends GameEvent {
	closable: boolean = true;
	description: string;
	actions: GameAction[];
    selectedDice: Dice[][];
    name: string;
	dialogueActions: {succes: (n: number) => {succes : boolean, text : string}, rewards: Item[]}[];

    constructor(actions: {text: string, slots: number, effect: {succes: (n: number) => {succes : boolean, text : string}, rewards: Item[]}}[], description : string) { //effects implementeren
        super(actions.length);
		this.description = description;
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

	rollDice(gameState: GameState): {succes : boolean, text : string} {
		//returns true upon succes
		super.rollDice(gameState);
		if(this.dialogueActions[this.selectedOption].succes(this.rollResultSum).succes) {
			gameState.addToInventory(this.dialogueActions[this.selectedOption].rewards);
			gameState.endEvent();
			return this.dialogueActions[this.selectedOption].succes(this.rollResultSum);
		}
		return this.dialogueActions[this.selectedOption].succes(this.rollResultSum);
	}

	eventEnded() : boolean {
		return this.rolled;
	}
}

export default DialogueEvent;