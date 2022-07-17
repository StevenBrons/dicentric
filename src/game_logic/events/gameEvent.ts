import Dice from "../items/dice";
import GameState from "../gameState";

export type GameAction = {
    nrDiceSlots : number, 
    text : string
}

abstract class GameEvent {
    abstract closable : boolean;
    abstract name : string;
    abstract description : string;
    abstract selectedDice : Dice[][];
    abstract actions : GameAction[];
    nrOptions : number; 
    rollResult: number[];
    rollResultSum: number;
    rolled : boolean;
    selectedOption : number = -1;
    nrOfDiceSelected : number = 0;

    constructor(nrOptions: number) {
        this.nrOptions = nrOptions;
        this.rollResult = [];
        this.rollResultSum = 0;
        this.rolled = false;
        for(let i = 0; i<this.nrOptions; i++) {
            this.rollResult.push(0);
        }
    }

    rollDice(gameState : GameState) {
        if(this.rolled) {
            //already rolled
            return;
        }
        this.rolled = true;
        this.rollResult = this.selectedDice[this.selectedOption].map(d => d.roll(gameState.equipment.getDiceEquipment(d.type)));
        this.rollResultSum = this.rollResult.reduce((accumulator, current) => {
            return accumulator + current;
          }, 0);
        //remove dice
		this.selectedDice[this.selectedOption] = [];
    }

    selectDice(d: Dice, option: number, gameState: GameState) {
        //is there space to select
        if(this.selectedDice[option].length >= this.actions[option].nrDiceSlots){
            throw new Error("trying to select dice while there is no space");
        }
        //is the die available to select
        if(!gameState.inventory.includes(d)) {
			throw new Error("trying to select dice which is not in inventory");
		}
        if(this.selectedOption !== -1 && this.selectedOption !== option) {
            return;
        }
        //remove from inventory and select
        this.selectedOption = option;
        let i = gameState.inventory.indexOf(d);
		gameState.inventory.splice(i, 1);
        this.selectedDice[option].push(d);
        this.nrOfDiceSelected++;
    }

    deselectDice(d: Dice, gameState: GameState) {
        //is the dice selected?
        let selected = -1;
        for(let i = 0; i < this.nrOptions; i++) {
            if(this.selectedDice[i].includes(d)) {
                selected = i;
            }
        }
        if(selected === -1) {
			throw new Error("trying to deselect dice which is not selected");
		}
        //remove from selection and add to inventory
        let i = this.selectedDice[selected].indexOf(d);
		this.selectedDice[selected].splice(i, 1);
        gameState.inventory.push(d);
        this.nrOfDiceSelected--;
        if(this.nrOfDiceSelected === 0) {
            this.selectedOption = -1;
        }
    }

    canRoll() : boolean {
        return this.nrOfDiceSelected > 0;
    }
}

export default GameEvent;