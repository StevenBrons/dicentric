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
		this.image = Dice.getImage(d)
		this.type = d;
	}

	static getImage(d: DICE) {
		switch(d) {
			case DICE.d4: 
				return "./res/d4.png";
			case DICE.d6: 
				return "./res/d6.png";
			case DICE.d8: 
				return "./res/d8.png";
			case DICE.d10: 
				return "./res/d10.png";
			case DICE.d12: 
				return "./res/d12.png";
			case DICE.d20: 
				return "./res/d20.png";
		} 
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