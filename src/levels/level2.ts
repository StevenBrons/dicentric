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

//construct shops
let shopstart = new ShopEvent([{item: new MinusOne(), price: 2, sold: false}
	, {item: new ExcludeOne(), price: 2, sold: false}
	, {item: d20(), price: 3, sold: false}
	, {item: new Dice(DICE.d8), price: 4, sold: false}
	, {item: new Dice(DICE.d10), price: 4, sold: false}
	, {item: new Dice(DICE.d12), price: 5, sold: false}]);
shopstart.description = "Welcome to the shop! There are some rare equipments in stock. Be aware that you can't remove an equipment, unless you put another equipment over it, but then you won't get it back!";

let shopboss1 = new ShopEvent([{item: new Dice(DICE.d12), price: 5, sold: false}]);
let shopboss2 = new ShopEvent([{item: new Dice(DICE.d12), price: 5, sold: false}]);

//construct battles
let bird1 = new BattleEvent([{text : "attack the amount rolled", slots: 1, effect: BATTLE_ACTION.attack}], constructBird());
let bird2 = new BattleEvent([{text : "attack the amount rolled", slots: 1, effect: BATTLE_ACTION.attack}], constructBird());
let bird3 = new BattleEvent([{text : "attack the amount rolled", slots: 1, effect: BATTLE_ACTION.attack}], constructBird());
let bird4 = new BattleEvent([{text : "attack the amount rolled", slots: 1, effect: BATTLE_ACTION.attack}], constructBird());
let cube1 = new BattleEvent([{text : "attack the amount rolled", slots: 1, effect: BATTLE_ACTION.attack}], constructCube());
let cube2 = new BattleEvent([{text : "attack the amount rolled", slots: 1, effect: BATTLE_ACTION.attack}], constructCube());
let cube3 = new BattleEvent([{text : "attack the amount rolled", slots: 1, effect: BATTLE_ACTION.attack}], constructCube());
let ninja1 = new BattleEvent([{text : "attack the amount rolled", slots: 2, effect: BATTLE_ACTION.attack}, {text : "defend, heal the amount rolled more than the enemies' roll", slots: 3, effect: BATTLE_ACTION.defend}], constructNinja());
let ninja2 = new BattleEvent([{text : "attack the amount rolled", slots: 2, effect: BATTLE_ACTION.attack}, {text : "defend, heal the amount rolled more than the enemies' roll", slots: 3, effect: BATTLE_ACTION.defend}], constructNinja());
let ninja3 = new BattleEvent([{text : "attack the amount rolled", slots: 2, effect: BATTLE_ACTION.attack}, {text : "defend, heal the amount rolled more than the enemies' roll", slots: 3, effect: BATTLE_ACTION.defend}], constructNinja());


//construct boss
let boss = new Enemy(100, "", [d20()], [], "Congratulations!");

//construct battles
let bossbattle = new BattleEvent([{text : "attack the amount rolled", slots: 2, effect: BATTLE_ACTION.attack}, {text : "defend, heal the amount rolled more than the enemies' roll", slots: 3, effect: BATTLE_ACTION.defend}], boss);

//construct dialogue events
let DialogueStart = new DialogueEvent([{text : "Search thoroughly, roll higher than 4 to succeed", slots : 2, effect : {succes: (n: number)=>{return n>4?{succes : true, text : "You found some dice! \n d4 was added to your inventory. \n d4 was added to your inventory. \n d6 was added to you inventory."}:{succes : false, text : "You didn't find anything."}}, rewards: [new Dice(DICE.d6), new Dice(DICE.d4), new Dice(DICE.d4)]}}
	, {text : "Search for a bit, roll higher than 2 to succed", slots : 1, effect : {succes: (n: number)=>{return n>2?{succes : true, text : "You found a die! \n d6 was added to your inventory."}:{succes : false, text : "You didn't find anything."}}, rewards: [new Dice(DICE.d6)]}}]
	, "Welcome to Dicentric! You will move accross islands. Dice are used for every action. Your rolls determine the outcome. There seems to be something in the grass. Search the grass? You can choose not to by closing the window");

let Dialogue1 = new DialogueEvent([]
	, "There are some enemies up ahead. The creature pictured on the sign pointing up looks stronger than on the sign pointing down. Maybe it has a higher reward though?");

let Dialogue2 = new DialogueEvent([{text : "Pick up the object. Roll any number to succeed", slots : 1, effect : {succes: (n: number)=>{return {succes: true, text : "You found an equipment. Open the equipment menu to equip it!"}}, rewards: [new PlusOne()]}}]
	, "There seems to be a menacing creature up ahead. On the ground lays a shiny object. Will it help you in your fight against the creature?");

let Dialogue3 = new DialogueEvent([{text : "Pick up the object. Roll any number to succeed", slots : 1, effect : {succes: (n: number)=>{return {succes: true, text : "You found an equipment. Open the equipment menu to equip it!"}}, rewards: [new PlusOne()]}}]
	, "There seems to be a menacing creature up ahead. On the ground lays a shiny object. Will it help you in your fight against the creature?");

let Dialogue4 = new DialogueEvent([{text : "Pick up the object. Roll any number to succeed", slots : 1, effect : {succes: (n: number)=>{return {succes: true, text : "You found an equipment. Open the equipment menu to equip it!"}}, rewards: [new PlusOne()]}}]
	, "There seems to be a menacing creature up ahead. On the ground lays a shiny object. Will it help you in your fight against the creature?");


let eventPool = [bird1, bird2, bird3, bird4, cube1, cube2, cube3, ninja1, ninja2, ninja3, Dialogue1, Dialogue2, Dialogue3, Dialogue4, null, null, null, null, null];

//construct nodes
//TODO coordinaten
let node17 = new MapNode([],0,0,7,bossbattle,true,"");
let node16 = new MapNode([],0,0,6,shopboss1,true,"");
let node15 = new MapNode([],0,0,6,shopboss2,true,"");
let node14 = new MapNode([],0,0,5,null,false,"");
let node13= new MapNode([],0,0,5,null,false,"");
let node12 = new MapNode([],0,0,4,null,false,"");
let node11 = new MapNode([],0,0,4,null,false,"");
let node10 = new MapNode([],0,0,5,null,false,"");
let node9 = new MapNode([],0,0,4,null,false,"");
let node8 = new MapNode([],0,0,3,null,false,"");
let node7 = new MapNode([],0,0,3,null,false,"");
let node6 = new MapNode([],0,0,3,null,false,"");
let node5 = new MapNode([],0,0,3,null,false,"");
let node4 = new MapNode([],0,0,2,null,false,"");
let node3 = new MapNode([],0,0,2,null,false,"");
let node2 = new MapNode([node3, node4],0,0,1,shopstart,false,"");
let node1 = new MapNode([node2],0,0,0,DialogueStart,true,"");

// //construct map
// let map = new MapState([node1, node2, node3, node4, node5, node6, node7], [], "./res/level_1_map.png", {width : 640, height : 180}); //idk of path naar image klopt

// //construct level
// let level2 = new Level(2, map, [new Dice(DICE.d4), new Dice(DICE.d4), new Dice(DICE.d6), new Dice(DICE.d6), new Dice(DICE.d8)]);

//export default level2;

function d4() : Dice {
	return new Dice(DICE.d4);
}

function d6() : Dice {
	return new Dice(DICE.d6);
}

function d8() : Dice {
	return new Dice(DICE.d8);
}

function d10() : Dice {
	return new Dice(DICE.d10);
}

function d12() : Dice {
	return new Dice(DICE.d12);
}

function d20() : Dice {
	return new Dice(DICE.d20);
}

function constructBirdEvent() {
	let bird = new Enemy(10, "", [d4(), d4()], [d6(), d8(), d10(), d10(), d12()], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d6 x 2, d8 x 1, d10 x 2, d12 x 1)");
	let event = new BattleEvent([{text : "attack the amount rolled", slots: 1, effect: BATTLE_ACTION.attack}], bird);
	return {event: event, image: "island_enemy_bird"}
}

function constructCubeEvent() {
	let cube = new Enemy(15, "", [d4(), d6()], [d6(), d8(), d8(), d10(), d12(), d12()], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d6 x 2, d8 x 2, d10 x 3, d12 x 1)");
	let event = new BattleEvent([{text : "attack the amount rolled", slots: 1, effect: BATTLE_ACTION.attack}], cube);
	return {event: event, image: "island_enemy_cube"}
}

function constructNinjaEvent() {
	let ninja = new Enemy(25, "", [d4(), d4(), d4(), d4()], [d4(), d4(), d4(), d4(), d6(), d8(), d10(), d10(), d20()], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d4 x 4, d6 x 2, d8 x 1, d10 x 2, d20 x 1)");
	let event = new BattleEvent([{text : "attack the amount rolled", slots: 1, effect: BATTLE_ACTION.attack}], ninja);
	return {event: event, image: ""}
}