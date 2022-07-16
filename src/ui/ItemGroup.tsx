import { useState } from "react";
import { useDrop } from "react-dnd";
import "./ItemGroup.css";
import ItemSlot from "./ItemSlot";

const ItemGroup: React.FC<{ width: number, height?: number}> = ({ width, height = 1}) => {

	const [items, setItems] = useState<number[]>([Math.floor(Math.random() * 10)]);

	const [{ isOver }, dropRef] = useDrop({
		accept: "item",
		drop: (item) => {
			setItems([...items, item as number])
		},
		collect: (monitor) => ({
			isOver: monitor.isOver()
		})
	})

	let c = 0;
	let slots: any[][] = [];
	for (let y = 0; y < height; y++) {
		slots[y] = [];
		for (let x: number = 0; x < width; x++) {
			if (c < items.length) {
				slots[y][x] = <ItemSlot key={y * width + x} item={null}/>;
			} else {
				slots[y][x] = <ItemSlot key={y * width + x} item={null}/>;
			}
			c++;
		}
		slots[y][width] = <br />
	}

	return <div className="ItemGroup" ref={dropRef}>
		<div className="inner">
			{slots}
		</div>
	</div>

}


export default ItemGroup;