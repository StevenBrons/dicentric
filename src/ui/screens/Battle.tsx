import { useContext } from "react";
import BattleEvent from "../../game_logic/events/battleEvent";
import { gameContext } from "../App";
import ItemSlot from "../ItemSlot";
import "./Battle.css";
import Screen from "./Screen";

const Battle = () => {

	const [gameState, update] = useContext(gameContext);
	const battle = gameState.eventState as BattleEvent;

	const enemyDice = battle.enemy.availableDice.map((d,i) => {
		if (battle.rolled) {
			return <ItemSlot
				result={battle.enemy.lastRoll[i] + ""}
				canDrag={false}
				slotType="empty"
				placeHolder={battle.enemy.availableDice[i].image}
			/>
		} else {
			return <ItemSlot
				item={d}
				canDrag={false}
				slotType="empty"
				placeHolder={battle.enemy.availableDice[i].image}
			/>
		}
	});

	return <Screen name="Battle">
		<div className="Background">
			<div id="yourHealth" className="Indicator">
				<img src="./res/heart.png"/>
				{gameState.lives}
			</div>
			<div id="enemyHealth" className="Indicator">
				{battle.enemy.health}
				<img src="./res/heart.png"/>
			</div>
			<div id="enemy">
				<img src={`./res/enemies/${battle.enemy.image}.png`}/>
			</ div>
			<div id="enemyDice">
				{enemyDice}
			</div>
		</div>
	</Screen>
}

export default Battle;