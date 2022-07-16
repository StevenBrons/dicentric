import { FC } from "react";
import "./Shop.css";

const ShopTop : FC = () => {
	return <div className="ShopTop">
		<h1>
			test
		</h1>
	</div>
}

const ShopBottom : FC = () => {
	return <div className="ShopBottom">
		<h1>
			test
		</h1>
	</div>
}

const getShop = () => {
	return [<ShopTop />, <ShopBottom />]
}

export { getShop };