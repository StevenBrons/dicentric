import GameEvent from "./gameEvent";
import Item from "./item";

class ShopEvent implements GameEvent {
    stock : {item: Item, price: number}[];
    spendable : number;

    buy(index: number) {
        //
    }
}

export default ShopEvent;