import { FC } from "react";
import { GameAction } from "../game_logic/events/gameEvent";
import ItemGroup from "./ItemGroup";

interface Props {
	action: GameAction
}

const ActionBar : FC<Props> = ({ action }) => {
	return <div className="ActionBar">
		<div className="text">
			{action.text}
		</div>
		<ItemGroup width={action.nrDiceSlots}/>
	</div>
}

export default ActionBar;