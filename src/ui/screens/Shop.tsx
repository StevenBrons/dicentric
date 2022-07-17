import { FC } from "react";
import ShopEvent from "../../game_logic/events/shopEvent";
import ActionBar from "../ActionBar";
import ItemSlot from "../ItemSlot";
import Screen from "./Screen";
import "./Shop.css";

interface Props {
	shopEvent: ShopEvent
}

const Shop : FC<Props> = ({ shopEvent}) => {
	const stock = shopEvent.stock.map((item, i) => <div>
		<ItemSlot item={item.sold ? null : item.item} key={i} placeHolder={item.item.image}/>
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
		{shopEvent.actions.map(a => <ActionBar action={a}/>)}
	</Screen>
}

export default Shop;