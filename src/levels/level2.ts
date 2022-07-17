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
let ninja1 = constructNinja();
let ninja2 = constructNinja();
let ninja3 = constructNinja();


//construct boss
let boss = new Enemy(100, "", [d4(), d8(), d8()], [], "Congratulations!");

//construct battles
let bossbattle = new BattleEvent([{text : "attack the amount rolled", slots: 2, effect: BATTLE_ACTION.attack}, {text : "defend, heal the amount rolled more than the enemies' roll", slots: 3, effect: BATTLE_ACTION.defend}], boss);

//construct dialogue events
let Dialoguestart = new DialogueEvent([{text : "Search thoroughly, roll higher than 4 to succeed", slots : 2, effect : {succes: (n: number)=>{return n>4?{succes : true, text : "You found some dice! \n d4 was added to your inventory. \n d4 was added to your inventory. \n d6 was added to you inventory."}:{succes : false, text : "You didn't find anything."}}, rewards: [new Dice(DICE.d6), new Dice(DICE.d4), new Dice(DICE.d4)]}}
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


//construct nodes
// let node7 = new MapNode([],439,80,5,bossbattle,true,"island_boss");
// let node6 = new MapNode([node7],352,80,4,equipmentDialogue,true,"island_event");
// let node5 = new MapNode([node6],233,128,3,battle1,true,"island_enemy_bird");
// let node4 = new MapNode([node6],288,32,3,battle2,true,"island_enemy_cube");
// let node3 = new MapNode([node4, node5],224,80,2,junctionDialogue,true,"island_event");
// let node2 = new MapNode([node3],144,80,1,shop1,true,"island_shop");
// let node1 = new MapNode([node2],64,80,0,tutorialDialogue,true,"island_event");

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

function constructBird() {
	return new Enemy(10, "", [d4(), d4()], [d6(), d8(), d10(), d10(), d12()], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d6 x 2, d8 x 1, d10 x 2, d12 x 1)");
}

function constructCube() {
	return new Enemy(15, "", [d4(), d6()], [d6(), d8(), d8(), d10(), d12(), d12()], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d6 x 2, d8 x 2, d10 x 3, d12 x 1)")
}

function constructNinja() {
	return new Enemy(20, "", [d4(), d4(), d4(), d4()], [d4(), d4(), d4(), d4(), d6(), d8(), d10(), d10(), d20()], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d4 x 4, d6 x 2, d8 x 1, d10 x 2, d20 x 1)");
}