import MapState from "../game_logic/mapState";
import Level from "../game_logic/level"
import Dice from "../game_logic/items/dice";
import MapNode from "../game_logic/mapNode";
import ShopEvent from "../game_logic/events/shopEvent";

//construct shops
let shop1 = new ShopEvent([{item: new Dice(DICE.d8), price: 3, sold: false}]);
let shop2 = new ShopEvent([{item: new Dice(DICE.d10), price: 4, sold: false}]);

//construct map
let node4 = new MapNode([], 10, 5, 2, null);
let node3 = new MapNode([node4], 5, 10, 1, shop2);
let node2 = new MapNode([node4], 5, 0, 1, shop1);
let node1 = new MapNode([node2, node3], 0, 5, 0, null);
let map = new MapState([node1,node2,node3,node4], ""); //TODO map maken

let level1 = new Level(1, map, [new Dice(DICE.d4), new Dice(DICE.d4), new Dice(DICE.d6)]);

export default level1;