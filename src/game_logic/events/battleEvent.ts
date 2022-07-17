import GameEvent, { GameAction } from "./gameEvent";
import Dice from "../items/dice";
import Enemy from "./enemies/enemy";
import GameState from "../gameState";

export enum BATTLE_ACTION {
	attack = 0,
	defend,
}

class BattleEvent extends GameEvent {
	closable: boolean = false;
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

	pressButton(gameState : GameState): void {
		if(this.canGoToNextRound()) {
			this.nextRound();
			return;
		}
		super.pressButton(gameState);
		let yourRoll = this.rollResult[this.lastSelectedOption];
		//nu enemy actie 
		let enemyAttack = this.enemy.attack();

		switch(this.battleActions[this.lastSelectedOption]){
			case BATTLE_ACTION.attack: this.enemy.loseLives(yourRoll); gameState.loseLives(enemyAttack); break;
			case BATTLE_ACTION.defend: enemyAttack >= yourRoll?gameState.loseLives(enemyAttack - yourRoll):gameState.healLives(yourRoll - enemyAttack); break;
		}		
		if(this.enemy.dead) {
			gameState.addToInventory(this.enemy.rewards);
			this.description = this.enemy.textUponDefeat;
			this.closable = true;
		}
	}

	nextRound() : void {
		this.rolled = false;
		this.rollResult[this.lastSelectedOption] = 0;
	}

	canGoToNextRound() {
		return this.rolled;
	}

	eventEnded() : boolean {
		return this.enemy.dead;
	}
}

export default BattleEvent;