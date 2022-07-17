import { DICE } from "../dice";
import Equipment from "../equipment";

class AverageOnly extends Equipment {
    description: string = "Only roll the middle two numbers of the die.";        

    rollWithEq(d: DICE): number {
        if(Math.random() < 0.5) {
            return Math.floor(d/2);
        }
        return Math.ceil(d/2);
    }
}

export default AverageOnly;