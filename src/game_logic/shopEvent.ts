import Dice from "./dice";
import GameEvent from "./gameEvent";
import Item from "./item";

class ShopEvent extends GameEvent {
    stock : {item: Item, price: number, sold: boolean}[];

    buy(index: number, inventory: Item[]):void {
        if(this.rollResult == null) {
            //not rolled yet
            return
        }
        if(this.stock[index].sold || this.rollResult < this.stock[index].price) {
            //already bought or too poor
            return
        }
        this.rollResult = this.rollResult - this.stock[index].price;
        this.stock[index].sold = false
        inventory.push(this.stock[index].item);
    }
}

export default ShopEvent;