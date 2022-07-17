import { DICE } from "../dice";
import Equipment from "../equipment";

class OnlyEven extends Equipment {
    image: string = "onlyEven";
    description: string = "Only roll even numbers.";        

    rollWithEq(d: DICE): number {
        let roll = Math.floor(Math.random() * (d - 1) + 1);
        if(roll%2 === 1) {
            roll = roll+1;
        }
        return roll;
    }
}

export default OnlyEven;