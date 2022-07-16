import Dice from "../../items/dice";
import Item from "../../items/item";

class Enemy {
	health : number;
	image : string;
	availableDice : Dice[];
	lastRoll : number[];
	dead : boolean = false;
	rewards : Item[];

	constructor(health : number, image : string, availableDice : Dice[], rewards : Item[]) {
		this.health = health;
		this.image = image;
		this.availableDice = availableDice;
		this.lastRoll = [];
		this.rewards = rewards;
	}

	attack() : number {
		this.lastRoll = this.availableDice.map(d => d.roll(undefined));
		return this.lastRoll.reduce((accumulator, current) => {
            return accumulator + current;
          }, 0);
	}

	loseLives(n : number) {
		this.health = Math.max(this.health - n, 0);
		if(this.health === 0) {
			this.dead = true;
		}
	}
}

export default Enemy;