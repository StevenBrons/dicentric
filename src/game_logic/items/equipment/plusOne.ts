import Equipment from "../equipment";

class PlusOne extends Equipment {
    explanation: string = "Adds 1 to dice roll";

    constructor() {
        super();
    }

    rollWithEq(d: DICE): number {
        return Math.floor(Math.random() * (d - 1) + 1) + 1;
    }
}

export default PlusOne;