import { useContext } from "react";
import BattleEvent from "../../game_logic/events/battleEvent";
import { gameContext } from "../App";
import "./Battle.css";
import Screen from "./Screen";

const Battle = () => {

	const [gameState, update] = useContext(gameContext);
	const battle = gameState.eventState as BattleEvent;

	return <Screen name="Battle">
		{battle.enemy.health}
		{gameState.lives}
	</Screen>
}

export default Battle;