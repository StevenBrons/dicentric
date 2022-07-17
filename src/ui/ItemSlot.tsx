import { useState, FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import Item from "../game_logic/items/item";
import "./ItemSlot.css";

const ItemSlot: FC<{ item: Item | null, placeHolder?: string, hasMultiple?: boolean }> = ({ item, placeHolder, hasMultiple = false }) => {

	const [{ isDragging }, dragRef] = useDrag({
		type: "item",
		item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	});

	if (!item) {
		return <div className="ItemSlot">
			<div className="Item placeholder" style={{ backgroundImage: `url('${placeHolder}')`}}/>
			{isDragging && "hoooi"}
		</div>
	}

	return <div className="ItemSlot Selectable">
		<div className="Item" style={{ backgroundImage: isDragging && !hasMultiple ? "" : `url('${item.image}')`}} ref={dragRef}/>
	</div>

}

export default ItemSlot;
