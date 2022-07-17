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
		<ItemSlot
			item={shopEvent.rolled ? (shopEvent.canBuy(i) ? item.item : null) : item.item}
			placeHolder={item.item.image}
			canDrag={false}
			onClick={() => {shopEvent.buy(i, gameState); update()}}
			slotType="shop"
		/>
		<span>
			{item.price}
		</span>
		</div>)
	return <Screen name="Shop">
		<div className="Stock">
			{stock}
		</div>
	</Screen>
}

export default Shop;