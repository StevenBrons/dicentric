import { DICE } from "./dice";
import Item from "./item";

abstract class Equipment extends Item {
    abstract rollWithEq(d: DICE): number;
}

export default Equipment;