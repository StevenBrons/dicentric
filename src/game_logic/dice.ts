import Item from "./item";

class Dice implements Item {
    id : number;
    image : string;
    type: DICE;

    getSize():number {
        return this.type;
    }

	roll():number {
		return Math.floor(Math.random() * (this.type - 1) + 1);
    };
}

export default Dice;