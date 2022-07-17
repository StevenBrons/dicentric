import { DICE } from "../dice";
import Equipment from "../equipment";

class OnlyEven extends Equipment {
    description: string = "Prevents the die from rolling 1";        

    rollWithEq(d: DICE): number {
        let roll = Math.floor(Math.random() * (d - 1) + 1);
        return roll;
    }
}

export default OnlyEven;