import { useContext } from "react";
import BattleEvent from "../../game_logic/events/battleEvent";
import { gameContext } from "../App";
import "./Battle.css";
import Screen from "./Screen";

const Battle = () => {

	const [gameState, update] = useContext(gameContext);
	const battle = gameState.eventState as BattleEvent;

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
			<div id="enemyDice" className="Indicator">
			</div>
			<div id="enemy">
				<img src={`./res/enemies/${battle.enemy.image}.png`}/>
			</ div>
		</div>
	</Screen>
}

export default Battle;