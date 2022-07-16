import { useState } from "react";
import { useDrop } from "react-dnd";
import "./ItemGroup.css";
import ItemSlot from "./ItemSlot";

const ItemGroup: React.FC<{ width: number, height?: number}> = ({ width, height = 1}) => {

	const [items, setItems] = useState<number[]>([Math.floor(Math.random() * 10)]);

	const [{ isOver }, dropRef] = useDrop({
		accept: "item",
		drop: (item) => {
			console.log(item);
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
				slots[y][x] = <ItemSlot key={y * width + x} item={items[c]}/>;
			} else {
				slots[y][x] = <ItemSlot key={y * width + x} item={null}/>;
			}
			c++;
		}
	}

	return <div className={`ItemGroup`} ref={dropRef}>
		{slots}
	</div>

}


export default ItemGroup;