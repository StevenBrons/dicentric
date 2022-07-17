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

	pressButton(gameState: GameState): {succes : boolean, text : string} {
		//returns true upon succes
		super.pressButton(gameState);
		if(this.dialogueActions[this.lastSelectedOption].succes(this.rollResultSum).succes) {
			gameState.addToInventory(this.dialogueActions[this.lastSelectedOption].rewards);
		}
		this.description = this.dialogueActions[this.lastSelectedOption].succes(this.rollResultSum).text;
		return this.dialogueActions[this.lastSelectedOption].succes(this.rollResultSum);
	}

	eventEnded() : boolean {
		return this.rolled;
	}
}

export default DialogueEvent;