import Equipment from "./equipment";
import Item from "./item";

export enum DICE {
	d4 = 4,
	d6 = 6,
	d8 = 8,
	d10 = 10,
	d12 = 12,
	d20 = 20
}

class Dice extends Item {
	type: DICE;

	constructor(d: DICE) {
		super();
		switch(d) { //TODO add images
			case DICE.d4: this.image = ""; break; 
			case DICE.d6: this.image = ""; break;
			case DICE.d8: this.image = ""; break;
			case DICE.d10: this.image = ""; break;
			case DICE.d12: this.image = ""; break;
			case DICE.d20: this.image = ""; break;
		} 
		this.type = d;
	}

	getID():number {
		return this.id;
	}

	getSize():number {
		return this.type;
	}

	roll(eq: Equipment | undefined):number {
		if(eq !== undefined) {
			//alter roll according to equipment
			return eq.rollWithEq(this.type);
		}
		//normal roll
		return Math.floor(Math.random() * (this.type - 1) + 1);
	};
}

export default Dice;