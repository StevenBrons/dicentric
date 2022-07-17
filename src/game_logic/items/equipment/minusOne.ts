import { DICE } from "../dice";
import Equipment from "../equipment";

class MinusOne extends Equipment {
    image: string = "minusOne";
    description: string = "Substracts 1 from dice roll.";

    rollWithEq(d: DICE): number {
        return Math.floor(Math.random() * (d - 1) + 1) - 1;
    }
}

export default MinusOne;