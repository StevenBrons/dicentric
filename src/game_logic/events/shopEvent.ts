import GameEvent from "./gameEvent";
import Item from "../items/item";
import Dice from "../items/dice";
import GameState from "../gameState";

class ShopEvent extends GameEvent {
    selectedDice: { dice: Dice[]; text: string; }[];
    nrDiceSlots: number[];
    name: string;
    stock : {item: Item, price: number, sold: boolean}[];

    constructor(stock: {item: Item, price: number, sold: boolean}[]) {
        super(1); 
        this.selectedDice = [{dice: [], text: "select dice to get an amount to spend"}];
        this.name = "Shop";
        this.nrDiceSlots = [3]; //aanpassen?
        this.stock = stock;
    }

    buy(index: number, gameState: GameState):void {
        if(this.stock[index].sold || this.rollResult[0] < this.stock[index].price) {
            //already bought or too poor
            return
        }
        this.rollResult[0] = this.rollResult[0] - this.stock[index].price;
        this.stock[index].sold = false
        gameState.addToInventory([this.stock[index].item]);
    }

    getSpendable():number {
        return this.rollResultSum;
    }
}

export default ShopEvent;