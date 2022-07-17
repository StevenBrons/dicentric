import { useState, FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import Item from "../game_logic/items/item";
import "./ItemSlot.css";

const ItemSlot: FC<{ item: Item | null, placeHolder?: string, hasMultiple?: boolean, canDrag?: boolean, onClick?: any }> = ({ item, placeHolder, hasMultiple = false, canDrag = true, onClick = null }) => {

	const [{ isDragging }, dragRef] = useDrag({
		type: "item",
		item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	});

	if (!item) {
		return <div className="ItemSlot">
			<div className="Item placeholder" style={{ backgroundImage: `url('${placeHolder}')`}} draggable="false"/>
			{isDragging && "hoooi"}
		</div>
	}

	return <div className={`ItemSlot ${canDrag ? "dragable" : ""} ${onClick ? "clickable" : ""}`}>
		<div
			draggable={canDrag ? "true" : "false"}
			className="Item"
			data-tip="React-tooltip"
			style={{ backgroundImage: isDragging && !hasMultiple ? "" : `url('${item.image}')`}}
			ref={canDrag ? dragRef : null}
			onClick={onClick ? onClick : () => {}}
		/>
	</div>

}

export default ItemSlot;
