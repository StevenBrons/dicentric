import { FC } from "react";
import { useDrag } from "react-dnd";
import Equipment from "../game_logic/items/equipment";
import Item from "../game_logic/items/item";
import "./ItemSlot.css";

type SlotType = "inventory" | "dialogue" | "shop" | "tray" | "empty";

const ItemSlot: FC<{ item?: Item | null, result?: string | null,  placeHolder?: string, hasMultiple?: boolean, canDrag?: boolean, onClick?: any, slotType: SlotType }> = ({ item, placeHolder, hasMultiple = false, canDrag = true, onClick, slotType, result }) => {

	const [{ isDragging }, dragRef] = useDrag({
		type: item instanceof Equipment ? "equipment" : "item",
		item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	});

	if (result) {
		return <div className={`ItemSlot ${slotType}`}>
			<div className="Result placeholder" style={{ backgroundImage: `url('${placeHolder}')`}} draggable="false">
				{result}
			</div>
		</div>
	}

	if (!item) {
		return <div className={`ItemSlot ${slotType}`}>
			<div className="Item placeholder" style={{ backgroundImage: `url('${placeHolder}')`}} draggable="false">
				{result}
			</div>
		</div>
	}

	return <div className={`ItemSlot ${canDrag ? "dragable" : ""} ${onClick ? "clickable" : ""} ${slotType}`}>
		<div className="tooltip">
			<div
				draggable={canDrag ? "true" : "false"}
				className="Item"
				data-tip="React-tooltip"
				style={{ backgroundImage: isDragging && !hasMultiple ? "" : `url("./res/items/${item.image}.png")`}}
				ref={canDrag ? dragRef : null}
				onClick={onClick ? onClick : () => {}}
			/>
			<span className="tooltiptext">
				{item.description}
			</span>
		</div>
	</div>

}

export default ItemSlot;
