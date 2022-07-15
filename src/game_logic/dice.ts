import Item from "./item";

class Dice implements Item {
    id : number;
    image : string;
    type: DICE;

    getSize() {
        return this.type;
    }
}

export default Dice;