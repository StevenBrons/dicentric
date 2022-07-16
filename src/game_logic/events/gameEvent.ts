import Dice from "../items/dice";
import EquipState from "../equipState";
import Item from "../items/item";

class GameEvent {
    selectedDice : Dice[];
    nrDiceSlots : number;
    rollResult: number;
    rolled : boolean = false;

    constructor() {
        this.selectedDice = [];
        this.nrDiceSlots = 0; //wat moet dit zijn?
        this.rollResult = 0;
    }

    rollDice(eqs: EquipState) {
        if(this.rolled) {
            return
        }
        this.rolled = true;
        let result = this.selectedDice.map(d => d.roll(eqs.getDiceEquipment(d.type)));
        this.rollResult = result.reduce((accumulator, current) => {
            return accumulator + current;
          }, 0);
        return result;
    }

    selectDice(d: Dice, inventory: Item[]) {
        //is there space to select
        if(this.selectedDice.length >= this.nrDiceSlots){
            throw new Error("trying to select dice while there is no space");
        }
        //is the die available to select
        if(!inventory.includes(d)) {
			throw new Error("trying to select dice which is not in inventory");
		}
        //remove from inventory and select
        let i = inventory.indexOf(d);
		inventory.splice(i, 1);
        this.selectedDice.push(d);
    }

    deselectDice(d: Dice, inventory: Item[]) {
        //is the dice selected?
        if(!this.selectedDice.includes(d)) {
			throw new Error("trying to deselect dice which is not selected");
		}
        //remove from selection and add to inventory
        let i = this.selectedDice.indexOf(d);
		this.selectedDice.splice(i, 1);
        inventory.push(d);
    }

    resetEvent() : void {
        this.selectedDice = [];
        this.rolled = false;
        this.rollResult = 0;
    }
}

export default GameEvent;