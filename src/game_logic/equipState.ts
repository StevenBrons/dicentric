import { DICE } from "./items/dice";
import Equipment from "./items/equipment";

class EquipState {
    diceEquipment: Map<DICE, Equipment>;

    constructor() {
        this.diceEquipment = new Map();
    }

    getDiceEquipment(d: DICE) {
        const eq = this.diceEquipment.get(d);
        if (eq) {
            return eq;
        } else {
            return null;
        }
    }
}

export default EquipState;