import GameEvent from "./gameEvent";
import Dice from "../items/dice";
import Item from "../items/item";
import GameState from "../gameState";

class DialogueEvent extends GameEvent {
    selectedDice: { dice: Dice[]; text: string; }[];
    nrDiceSlots: number[];
    name: string;
		options: {succes: (n: number) => boolean, rewards: Item[]}[];

    constructor(options: {text: string, slots: number, effect: {succes: (n: number) => boolean, rewards: Item[]}}[]) { //effects implementeren
        super(options.length);
		this.options = []; 
		this.selectedDice = [];
		this.nrDiceSlots = [];
		for(let i = 0; i<options.length; i++) {
			this.options.push(options[i].effect);
			this.selectedDice.push({dice: [], text: options[i].text});
			this.nrDiceSlots.push(options[i].slots); 
		}
        this.name = "Dialogue";
    }

	performOption(option: number, gameState : GameState) {
		//returns true upon succes
		this.rollDice(gameState.equipment, option);
		if(this.options[option].succes(this.rollResultSum)) {
			gameState.addToInventory(this.options[option].rewards);
			gameState.endEvent();
			return true;
		}
		gameState.endEvent();
		return false;
	}
}

export default DialogueEvent;