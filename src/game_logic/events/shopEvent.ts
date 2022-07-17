import GameEvent, { GameAction } from "./gameEvent";
import Item from "../items/item";
import Dice from "../items/dice";
import GameState from "../gameState";

class ShopEvent extends GameEvent {
    closable: boolean = true;
    description: string = "Welcome! Buy stuff";
    selectedDice: Dice[][];
    name: string;
    actions : GameAction[];
    stock : {item: Item, price: number, sold: boolean}[];

    constructor(stock: {item: Item, price: number, sold: boolean}[]) {
        super(1); 
        this.selectedDice = [[]];
        this.name = "Shop";
        this.actions = [{nrDiceSlots : 3, text : "add cash"}];
        this.stock = stock;
    }

    rollDice(gameState : GameState): void {
        super.rollDice(gameState);
    }

    buy(index: number, gameState: GameState):void {
        if(this.stock[index].sold || this.rollResultSum < this.stock[index].price) {
            //already bought or too poor
            return
        }
        this.rollResultSum = this.rollResultSum - this.stock[index].price;
        this.stock[index].sold = true;
        gameState.addToInventory([this.stock[index].item]);
    }

    getSpendable():number {
        return this.rollResultSum;
    }
}

export default ShopEvent;