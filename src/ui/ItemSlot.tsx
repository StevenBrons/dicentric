import { useState, FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./ItemSlot.css";

const ItemSlot: FC<{ item: number | null }> = ({ item }) => {

	const [{ isDragging }, dragRef] = useDrag({
		type: "item",
		item: { id: 10 },
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	});

	if (!item) {
		return <div className="ItemSlot">
			<div className="Item" ref={dragRef}/>
			{isDragging && "hoooi"}
		</div>
	}

	return <div className="ItemSlot">
		<div className="Item" style={{ backgroundImage: "url('./res/dice4.png')"}} ref={dragRef}/>
		{isDragging && "hoooi"}
	</div>

}

export default ItemSlot;
