import Equipment from "../equipment";

class PlusOne extends Equipment {
    explanation: string;

    constructor() {
        super();
        this.explanation = "Adds 1 to dice roll";
    }

    rollWithEq(d: DICE): number {
        return Math.floor(Math.random() * (d - 1) + 1) + 1;
    }
}

export default PlusOne;