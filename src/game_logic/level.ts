import Item from "./items/item";
import MapState from "./mapState";

class Level {
    number : number;
    map : MapState; //should not have events except for startnode and endnode
    startInventory : Item[];

    constructor(levelNr: number, map: MapState, startInventory: Item[]) {
        this.number = levelNr;
        this.map = map;
        this.startInventory = startInventory;
    }
}

export default Level;