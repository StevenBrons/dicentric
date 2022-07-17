import MapState from "../game_logic/mapState";
import Level from "../game_logic/level"
import Dice, { DICE } from "../game_logic/items/dice";
import MapNode from "../game_logic/mapNode";
import ShopEvent from "../game_logic/events/shopEvent";

//construct shops
let shop1 = new ShopEvent([{item: new Dice(DICE.d8), price: 3, sold: false}]);
let shop2 = new ShopEvent([{item: new Dice(DICE.d10), price: 4, sold: false}, {item: new Dice(DICE.d4), price: 2, sold: false}]);

//construct map
let node17 = new MapNode([], 25, 15, 2, null, false, "");
let node16 = new MapNode([node17], 20, 20, 2, null, false, "");
let node15 = new MapNode([node17], 20, 5, 2, null, false, "");
let node14 = new MapNode([node16], 15, 25, 2, null, false, "");
let node13 = new MapNode([node16], 15, 15, 2, null, false, "");
let node12 = new MapNode([node15], 15, 10, 2, null, false, "");
let node11 = new MapNode([node15], 15, 5, 2, null, false, "");
let node10 = new MapNode([node15], 15, 0, 2, null, false, "");
let node9 = new MapNode([node14], 10, 25, 2, null, false, "");
let node8 = new MapNode([node13], 10, 20, 2, null, false, "");
let node7 = new MapNode([node13], 10, 15, 2, null, false, "");
let node6 = new MapNode([node11,node12], 10, 5, 2, null, false, "");
let node5 = new MapNode([node10], 10, 0, 2, null, false, "");
let node4 = new MapNode([node8,node9], 5, 20, 2, null, false, "");
let node3 = new MapNode([node6,node7], 5, 15, 2, null, false, "");
let node2 = new MapNode([node5,node6], 5, 5, 2, null, false, "");
let node1 = new MapNode([node2,node3,node4], 0, 15, 2, null, false, "");

let map = new MapState([node1,node2,node3,node4,node5,node6,node7,node8,node9,node10,node11,node12,node13,node14,node15,node16,node17],
	 [shop1,shop2], "", {width: 640, height:180}); 

let testlevel2 = new Level(1, map, [new Dice(DICE.d4), new Dice(DICE.d4), new Dice(DICE.d6)]);

export default testlevel2;