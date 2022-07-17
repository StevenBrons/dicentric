import Dice from "../items/dice";
import GameState from "../gameState";

export type GameAction = {
    nrDiceSlots : number, 
    text : string
}

abstract class GameEvent {
    abstract name : string;
    abstract selectedDice : Dice[][];
    abstract actions : GameAction[];
    nrOptions : number; 
    rollResult: number[];
    rollResultSum: number;
    rolled : boolean;

    constructor(nrOptions: number) {
        this.nrOptions = nrOptions;
        this.rollResult = [];
        this.rollResultSum = 0;
        this.rolled = false;
        for(let i = 0; i<this.nrOptions; i++) {
            this.rollResult.push(0);
        }
    }
    //TODO IN SHOPEVENT ETC OVERWRITTEN EN SUPER AANROEPEN
    rollDice(option: number, gameState : GameState) {
        if(this.rolled) {
            //already rolled
            return;
        }
        this.rolled = true;
        this.rollResult = this.selectedDice[option].map(d => d.roll(gameState.equipment.getDiceEquipment(d.type)));
        this.rollResultSum = this.rollResult.reduce((accumulator, current) => {
            return accumulator + current;
          }, 0);
        //remove dice
		this.selectedDice[option] = [];
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
        //remove from inventory and select
        let i = gameState.inventory.indexOf(d);
		gameState.inventory.splice(i, 1);
        this.selectedDice[option].push(d);
    }

    deselectDice(d: Dice, option: number, gameState: GameState) {
        //is the dice selected?
        if(!this.selectedDice[option].includes(d)) {
			throw new Error("trying to deselect dice which is not selected");
		}
        //remove from selection and add to inventory
        let i = this.selectedDice[option].indexOf(d);
		this.selectedDice[option].splice(i, 1);
        gameState.inventory.push(d);
    }
}

export default GameEvent;