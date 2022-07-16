import GameEvent from "./gameEvent";
import Dice from "../items/dice";
import Enemy from "./enemies/enemy";
import GameState from "../gameState";

export enum ACTION {
	attack = 0,
	defend,
}

class BattleEvent extends GameEvent {
    selectedDice: { dice: Dice[]; text: string; }[];
    nrDiceSlots: number[];
    name: string;
	actions: ACTION[];
	enemy: Enemy;

    constructor(actions : {text : string, slots : number, effect : ACTION}[], enemy: Enemy) { 
		super(actions.length); 
		this.enemy = enemy;
		this.name = "Battle";
		this.selectedDice = [];
		this.nrDiceSlots = [];
		this.actions = [];
		for(let i = 0; i<actions.length; i++) {
			this.selectedDice.push({dice: [], text: actions[i].text});
			this.nrDiceSlots.push(actions[i].slots); 
			this.actions.push(actions[i].effect);
		}
    }

	performAction(option: number, gameState: GameState) {
		this.rollDice(gameState.equipment, option);
		//next turn you can roll again
		this.rolled = false;
		let yourRoll = this.rollResult[option];
		//nu enemy actie doen?
		let enemyAttack = this.enemy.attack();
		if(enemyAttack >= yourRoll) {
			gameState.loseLives(enemyAttack - yourRoll);
		} else {
			switch(this.actions[option]){
				case ACTION.attack : this.enemy.loseLives(yourRoll - enemyAttack); break;
				case ACTION.defend : gameState.healLives(yourRoll - enemyAttack); break;
			}
			if(this.enemy.dead) {
				gameState.addToInventory(this.enemy.rewards);
				gameState.endEvent();
			}
		}
	}
}

export default BattleEvent;