import Item from "./item";

abstract class Equipment extends Item {
    explanation: string;

    constructor(){
        super();
    }

    abstract rollWithEq(d: DICE): number;
}

export default Equipment;