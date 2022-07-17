import BattleEvent, { BATTLE_ACTION } from "../game_logic/events/battleEvent";
import Enemy from "../game_logic/events/enemies/enemy";
import Dice, { DICE } from "../game_logic/items/dice";

export const d4 = () : Dice => {
	return new Dice(DICE.d4);
}
	
export const d6 = () : Dice => {
	return new Dice(DICE.d6);
}
	
export const d8 = () : Dice => {
	return new Dice(DICE.d8);
}
	
export const d10 = () : Dice => {
	return new Dice(DICE.d10);
}

export const d12 = () : Dice => {
	return new Dice(DICE.d12);
}
	
export const d20 = () : Dice => {
	return new Dice(DICE.d20);
}
	
export const constructBirdEvent = () => {
	let bird = new Enemy(10, "", [d4(), d4()], [d6(), d8(), d10(), d10(), d12()], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d6 x 2, d8 x 1, d10 x 2, d12 x 1)");
	let event = new BattleEvent([{text : "Attack the amount rolled", slots: 1, effect: BATTLE_ACTION.attack}], bird);
	return {event: event, image: "island_enemy_bird"}
}
	
export const constructCubeEvent = () => {
	let cube = new Enemy(15, "", [d4(), d6()], [d6(), d8(), d8(), d10(), d12(), d12()], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d6 x 2, d8 x 2, d10 x 3, d12 x 1)");
	let event = new BattleEvent([{text : "Attack the amount rolled", slots: 1, effect: BATTLE_ACTION.attack}], cube);
	return {event: event, image: "island_enemy_cube"}
}
	
//TODO ninja image
export const constructNinjaEvent = () => {
	let ninja = new Enemy(25, "", [d4(), d4(), d4(), d4()], [d4(), d4(), d4(), d4(), d6(), d8(), d10(), d10(), d20()], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d4 x 4, d6 x 2, d8 x 1, d10 x 2, d20 x 1)");
	let event = new BattleEvent([{text : "Attack the amount rolled", slots: 1, effect: BATTLE_ACTION.attack}, {text : "Defend, heal the amount rolled more than the enemies' roll", slots: 3, effect: BATTLE_ACTION.defend}], ninja);
	return {event: event, image: ""}
}