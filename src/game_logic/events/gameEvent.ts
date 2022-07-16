import Dice from "../items/dice";
import EquipState from "../equipState";
import Item from "../items/item";

abstract class GameEvent {
    abstract name : string;
    abstract selectedDice : {dice: Dice[], text: string}[];
    abstract nrDiceSlots : number[];
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

    rollDice(eqs: EquipState, option: number) {
        if(this.rolled) {
            //already rolled
            return;
        }
        this.rolled = true;
        this.rollResult = this.selectedDice[option].dice.map(d => d.roll(eqs.getDiceEquipment(d.type)));
        this.rollResultSum = this.rollResult.reduce((accumulator, current) => {
            return accumulator + current;
          }, 0);
        //remove dice
		this.selectedDice[option].dice = [];
    }

    selectDice(d: Dice, option: number, inventory: Item[]) {
        //is there space to select
        if(this.selectedDice[option].dice.length >= this.nrDiceSlots[option]){
            throw new Error("trying to select dice while there is no space");
        }
        //is the die available to select
        if(!inventory.includes(d)) {
			throw new Error("trying to select dice which is not in inventory");
		}
        //remove from inventory and select
        let i = inventory.indexOf(d);
		inventory.splice(i, 1);
        this.selectedDice[option].dice.push(d);
    }

    deselectDice(d: Dice, option: number, inventory: Item[]) {
        //is the dice selected?
        if(!this.selectedDice[option].dice.includes(d)) {
			throw new Error("trying to deselect dice which is not selected");
		}
        //remove from selection and add to inventory
        let i = this.selectedDice[option].dice.indexOf(d);
		this.selectedDice[option].dice.splice(i, 1);
        inventory.push(d);
    }
}

export default GameEvent;