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
	image: string;
	description: string;
	type: DICE;

	constructor(d: DICE) {
		super();
		this.image = Dice.getImage(d)
		this.type = d;
		this.description = "Die that rolls the numbers 1-" + d + ".";
	}

	static getImage(d: DICE) {
		switch(d) {
			case DICE.d4: 
				return "d4";
			case DICE.d6: 
				return "d6";
			case DICE.d8: 
				return "d8";
			case DICE.d10: 
				return "d10";
			case DICE.d12: 
				return "d12";
			case DICE.d20: 
				return "d20";
		} 
	}

	getID():number {
		return this.id;
	}

	getSize():number {
		return this.type;
	}

	roll(eq: Equipment | null):number {
		if(eq !== null) {
			//alter roll according to equipment
			return eq.rollWithEq(this.type);
		}
		//normal roll
		return Math.floor(Math.random() * (this.type - 1) + 1);
	};
}

export default Dice;