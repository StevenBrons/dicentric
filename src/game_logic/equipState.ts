import Dice from "./dice";
import Equipment from "./equipment";

class EquipState {
    diceEquipment: Map<DICE, Equipment>;

    getDiceEquipment(d: DICE) {
        //returns null if not present
        return this.diceEquipment.get(d);
    }
}

export default EquipState;