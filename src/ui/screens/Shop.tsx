import { FC, useContext } from "react";
import ShopEvent from "../../game_logic/events/shopEvent";
import ActionBar from "../ActionBar";
import { gameContext } from "../App";
import ItemSlot from "../ItemSlot";
import Screen from "./Screen";
import "./Shop.css";

interface Props {
	shopEvent: ShopEvent
}

const Shop : FC<Props> = ({ shopEvent }) => {

	const [gameState, update] = useContext(gameContext);

	const stock = shopEvent.stock.map((item, i) => <div key={i}>
		<ItemSlot item={item.sold ? null : item.item} placeHolder={item.item.image}/>
		<span>
			{item.price}
		</span>
		</div>)
	return <Screen name="Shop">
		<h1>
			Shop
		</h1>
		<div>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur ullamcorper tincidunt.
		</div>
		<div className="Stock">
			{stock}
		</div>
		{shopEvent.actions.map((a, i) => <ActionBar index={i} key={i} />)}
	</Screen>
}

export default Shop;