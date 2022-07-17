import GameEvent, { GameAction } from "./gameEvent";
import Dice from "../items/dice";
import Enemy from "./enemies/enemy";
import GameState from "../gameState";

export enum BATTLE_ACTION {
	attack = 0,
	defend,
}

class BattleEvent extends GameEvent {
	description: string = "Battle! Kill the enemy!";
    selectedDice: Dice[][];
    name: string;
	actions: GameAction[];
	battleActions: BATTLE_ACTION[];
	enemy: Enemy;

	constructor(actions : {text : string, slots : number, effect : BATTLE_ACTION}[], enemy: Enemy) { 
		super(actions.length); 
		this.enemy = enemy;
		this.name = "Battle";
		this.selectedDice = [];
		this.battleActions = [];
		this.actions = [];
		for(let i = 0; i<actions.length; i++) {
			this.selectedDice.push([]);
			this.actions.push({nrDiceSlots : actions[i].slots, text : actions[i].text});
			this.battleActions.push(actions[i].effect);
		}
	}

	rollDice(option: number, gameState : GameState): void {
		super.rollDice(option, gameState);
		//next turn you can roll again
		this.rolled = false;
		let yourRoll = this.rollResult[option];
		//nu enemy actie 
		let enemyAttack = this.enemy.attack();

		switch(this.battleActions[option]){
			case BATTLE_ACTION.attack: this.enemy.loseLives(yourRoll); gameState.loseLives(enemyAttack); break;
			case BATTLE_ACTION.defend: enemyAttack >= yourRoll?gameState.loseLives(enemyAttack - yourRoll):gameState.healLives(yourRoll - enemyAttack); break;
		}		
		if(this.enemy.dead) {
			gameState.addToInventory(this.enemy.rewards);
			gameState.endEvent();
		}
	}
}

export default BattleEvent;