import MapState from "../game_logic/mapState";
import Level from "../game_logic/level"
import Dice, { DICE } from "../game_logic/items/dice";
import MapNode from "../game_logic/mapNode";
import ShopEvent from "../game_logic/events/shopEvent";
import DialogueEvent from "../game_logic/events/dialogueEvent";
import Enemy from "../game_logic/events/enemies/enemy";
import BattleEvent, { BATTLE_ACTION } from "../game_logic/events/battleEvent";
import PlusOne from "../game_logic/items/equipment/plusOne";
import MinusOne from "../game_logic/items/equipment/minusOne";
import ExcludeOne from "../game_logic/items/equipment/excludeOne";
import {d4, d6, d8, d10, d12, d20, constructBirdEvent, constructCubeEvent, constructNinjaEvent} from "./constructors";

let shopboss1 = new ShopEvent([{item: new PlusOne(), price: 4, sold: false}
	, {item: new ExcludeOne(), price: 3, sold: false}
	, {item: d12(), price: 2, sold: false}
	, {item: d20(), price: 5, sold: false}
	, {item: d20(), price: 5, sold: false}
	, {item: d20(), price: 5, sold: false}]);
let shopboss2 = new ShopEvent([{item: new PlusOne(), price: 4, sold: false}
	, {item: new ExcludeOne(), price: 3, sold: false}
	, {item: d10(), price: 2, sold: false}
	, {item: d20(), price: 5, sold: false}
	, {item: d20(), price: 5, sold: false}
	, {item: d20(), price: 5, sold: false}]);

//construct boss
let boss = new Enemy(100, "", [d20()], [], "Congratulations, you beat the game!\n Thanks for playing!");


let bossbattle = new BattleEvent([{text : "attack the amount rolled", slots: 2, effect: BATTLE_ACTION.attack}, {text : "defend, heal the amount rolled more than the enemies' roll", slots: 3, effect: BATTLE_ACTION.defend}], boss);

//construct dialogue events
let DialogueStart = new DialogueEvent([{text : "Search thoroughly, roll higher than 4 to succeed", slots : 2, effect : {succes: (n: number)=>{return n>4?{succes : true, text : "You found some dice! \n d4 was added to your inventory. \n d4 was added to your inventory. \n d6 was added to you inventory."}:{succes : false, text : "You didn't find anything."}}, rewards: [new Dice(DICE.d6), new Dice(DICE.d4), new Dice(DICE.d4)]}}
	, {text : "Search for a bit, roll higher than 2 to succed", slots : 1, effect : {succes: (n: number)=>{return n>2?{succes : true, text : "You found a die! \n d6 was added to your inventory."}:{succes : false, text : "You didn't find anything."}}, rewards: [new Dice(DICE.d6)]}}]
	, "Good job beating the tutorial level! You have received another equipment from defeating the boss, but be aware that you can't remove an equipment, unless you put another equipment over it, but then you won't get it back!");

// let Dialogue1 = new DialogueEvent([]
// 	, "There are some enemies up ahead. The creature pictured on the sign pointing up looks stronger than on the sign pointing down. Maybe it has a higher reward though?");

// let Dialogue2 = new DialogueEvent([{text : "Pick up the object. Roll any number to succeed", slots : 1, effect : {succes: (n: number)=>{return {succes: true, text : "You found an equipment. Open the equipment menu to equip it!"}}, rewards: [new PlusOne()]}}]
// 	, "There seems to be a menacing creature up ahead. On the ground lays a shiny object. Will it help you in your fight against the creature?");

// let Dialogue3 = new DialogueEvent([{text : "Pick up the object. Roll any number to succeed", slots : 1, effect : {succes: (n: number)=>{return {succes: true, text : "You found an equipment. Open the equipment menu to equip it!"}}, rewards: [new PlusOne()]}}]
// 	, "There seems to be a menacing creature up ahead. On the ground lays a shiny object. Will it help you in your fight against the creature?");

// let Dialogue4 = new DialogueEvent([{text : "Pick up the object. Roll any number to succeed", slots : 1, effect : {succes: (n: number)=>{return {succes: true, text : "You found an equipment. Open the equipment menu to equip it!"}}, rewards: [new PlusOne()]}}]
// 	, "There seems to be a menacing creature up ahead. On the ground lays a shiny object. Will it help you in your fight against the creature?");


// //construct eventpool and battles
// let eventPool = [constructBirdEvent(), constructBirdEvent(), constructBirdEvent(), constructBirdEvent()
// 	, constructCubeEvent(), constructCubeEvent(), constructCubeEvent()
// 	, constructNinjaEvent(), constructNinjaEvent(), constructNinjaEvent()
// 	, {event: Dialogue1, image: "island_event"}, {event: Dialogue2, image: "island_event"}, {event: Dialogue3, image: "island_event"}, {event: Dialogue4, image: "island_event"}
// 	, {event: null, image: ""}, {event: null, image: ""}, {event: null, image: ""}, {event: null, image: ""}, {event: null, image: ""}];

//construct nodes
// let node17 = new MapNode([],568,167,7,bossbattle,true,"island_boss");
// let node16 = new MapNode([node17],488,120,6,shopboss1,true,"island_shop");
// let node15 = new MapNode([node17],488,199,6,shopboss2,true,"island_shop");
// let node14 = new MapNode([node16],416,138,5,null,false,"");
// let node13= new MapNode([node15],416,234,5,null,false,"");
// let node12 = new MapNode([node13],352,266,4,null,false,"");
// let node11 = new MapNode([node14],352,170,4,null,false,"");
// let node10 = new MapNode([node16],416,90,5,null,false,"");
// let node9 = new MapNode([node10],352,74,4,null,false,"");
// let node8 = new MapNode([node12],288,266,3,null,false,"");
// let node7 = new MapNode([node11],288,202,3,null,false,"");
// let node6 = new MapNode([node11],228,137,3,null,false,"");
// let node5 = new MapNode([node9],228,74,3,null,false,"");
// let node4 = new MapNode([node7, node8],224,233,2,null,false,"");
// let node3 = new MapNode([node5, node6],224,104,2,null,false,"");
// let node2 = new MapNode([node3, node4],184,169,1,shopstart,false,"island_shop");
// let node1 = new MapNode([node2],96,169,0,DialogueStart,true,"island_event");

//construct map
//TODO width height?
// let map = new MapState([node1, node2, node3, node4, node5, node6, node7, node8, node9, node10, node11, node12, node13, node14, node15, node16, node17], eventPool, "", {width : 640, height : 180}); 

//construct level
//let level2 = new Level(2, map, [d4(), d4(), d4(), d4(), d4(), d6(), d6(), d6(), d8(), d8(), d8(), d10(), d12()]);

//export default level2;
