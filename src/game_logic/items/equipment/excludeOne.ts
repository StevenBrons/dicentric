import Equipment from "../equipment";

class ExcludeOne extends Equipment {
    explanation: string;        

    constructor() {
        super();
        this.explanation = "Prevents the die from rolling 1";
    }

    rollWithEq(d: DICE): number {
        return Math.floor(Math.random() * (d - 1) + 2);
    }
}

export default ExcludeOne;