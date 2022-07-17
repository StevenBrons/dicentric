import MapState from "../game_logic/mapState";
import Level from "../game_logic/level"
import Dice, { DICE } from "../game_logic/items/dice";
import MapNode from "../game_logic/mapNode";
import ShopEvent from "../game_logic/events/shopEvent";
import Equipment from "../game_logic/items/equipment";
import PlusOne from "../game_logic/items/equipment/plusOne";

//construct shops
let shop1 = new ShopEvent([{item: new Dice(DICE.d8), price: 3, sold: false}]);
let shop2 = new ShopEvent([{item: new Dice(DICE.d10), price: 4, sold: false}, {item: new Dice(DICE.d4), price: 2, sold: false}]);

//construct map
let node4 = new MapNode([], 10, 5, 2, null);
let node3 = new MapNode([node4], 5, 10, 1, null);
let node2 = new MapNode([node4], 5, 0, 1, null);
let node1 = new MapNode([node2, node3], 0, 5, 0, null);
let map = new MapState([node1,node2,node3,node4], [shop1, shop2], ""); 

let testlevel1 = new Level(1, map, [new Dice(DICE.d4), new Dice(DICE.d4), new Dice(DICE.d6), new PlusOne()]);



export default testlevel1;