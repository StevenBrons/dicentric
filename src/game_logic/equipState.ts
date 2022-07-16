import { DICE } from "./items/dice";
import Equipment from "./items/equipment";

class EquipState {
    diceEquipment: Map<DICE, Equipment>;

    constructor() {
        this.diceEquipment = new Map();
    }

    getDiceEquipment(d: DICE) {
        //returns undefined if not present
        return this.diceEquipment.get(d);
    }
}

export default EquipState;