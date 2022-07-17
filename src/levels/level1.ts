import MapState from "../game_logic/mapState";
import Level from "../game_logic/level"
import Dice, { DICE } from "../game_logic/items/dice";
import MapNode from "../game_logic/mapNode";
import ShopEvent from "../game_logic/events/shopEvent";
import DialogueEvent from "../game_logic/events/dialogueEvent";
import Enemy from "../game_logic/events/enemies/enemy";
import BattleEvent, { BATTLE_ACTION } from "../game_logic/events/battleEvent";
import PlusOne from "../game_logic/items/equipment/plusOne";

//construct shops
let shop = new ShopEvent([{item: new Dice(DICE.d4), price: 2, sold: false}
	, {item: new Dice(DICE.d4), price: 2, sold: false}
	, {item: new Dice(DICE.d6), price: 3, sold: false}
	, {item: new Dice(DICE.d8), price: 4, sold: false}
	, {item: new Dice(DICE.d10), price: 4, sold: false}
	, {item: new Dice(DICE.d12), price: 5, sold: false}]);
shop.description = "Welcome to the shop! You can roll some dice to get an amount to spend. Then, you can select items to buy them." 

//construct enemies
let enemy1 = new Enemy(20, "", [new Dice(DICE.d4), new Dice(DICE.d4)], [new Dice(DICE.d6), new Dice(DICE.d8), new Dice(DICE.d10), new Dice(DICE.d10), new Dice(DICE.d12)], "Congratulations! You defeated the enemy! You got some dice as reward.");
let enemy2 = new Enemy(25, "", [new Dice(DICE.d4), new Dice(DICE.d6)], [new Dice(DICE.d6), new Dice(DICE.d8), new Dice(DICE.d8), new Dice(DICE.d10), new Dice(DICE.d12), new Dice(DICE.d12)], "Congratulations! You defeated the enemy! You got some dice as reward.");

//construct boss
let boss = new Enemy(70, "", [new Dice(DICE.d4), new Dice(DICE.d6), new Dice(DICE.d8)], [], "Congratulations! You defeated the boss and completed the tutorial level");

//construct battles
let battle1 = new BattleEvent([{text : "attack the amount rolled", slots: 1, effect: BATTLE_ACTION.attack}], enemy1); 
let battle2 = new BattleEvent([{text : "attack the amount rolled", slots: 1, effect: BATTLE_ACTION.attack}], enemy2);
let bossbattle = new BattleEvent([{text : "attack the amount rolled", slots: 2, effect: BATTLE_ACTION.attack}, {text : "defend, heal the amount rolled more than the enemies' roll", slots: 3, effect: BATTLE_ACTION.defend}], boss);

//construct dialogue events
let tutorialDialogue = new DialogueEvent([{text : "Search thoroughly, roll higher than 4 to succeed", slots : 2, effect : {succes: (n: number)=>{return n>4?{succes : true, text : "You found some dice!"}:{succes : false, text : "You didn't find anything."}}, rewards: [new Dice(DICE.d6), new Dice(DICE.d4), new Dice(DICE.d4)]}}
	, {text : "Search for a bit, roll higher than 2 to succed", slots : 1, effect : {succes: (n: number)=>{return n>2?{succes : true, text : "You found a die!"}:{succes : false, text : "You didn't find anything."}}, rewards: [new Dice(DICE.d6)]}}]
	, "Welcome to Dicentric! You will move accross islands. Dice are used for every action. Your rolls determine the outcome. There seems to be something in the grass. Search the grass? You can choose not to by closing the window");

let junctionDialogue = new DialogueEvent([]
	, "There are some enemies up ahead. The creature pictured on the sign pointing up looks stronger than on the sign pointing down. Maybe it has a higher reward though?");

let equipmentDialogue = new DialogueEvent([{text : "Pick up the object. Roll any number to succeed", slots : 1, effect : {succes: (n: number)=>{return {succes: true, text : "You found an equipment. Open the equipment menu to equip it!"}}, rewards: [new PlusOne()]}}]
	, "There seems to be a menacing creature up ahead. On the ground lays a shiny object. Will it help you in your fight against the creature?");


//construct nodes
let node7 = new MapNode([],439,80,5,bossbattle,true);
let node6 = new MapNode([],352,80,4,equipmentDialogue,true);
let node5 = new MapNode([],233,128,3,battle1,true);
let node4 = new MapNode([],288,32,3,battle2,true);
let node3 = new MapNode([],224,80,2,junctionDialogue,true);
let node2 = new MapNode([],144,80,1,shop,true);
let node1 = new MapNode([],64,80,0,tutorialDialogue,true);

//construct map
let map = new MapState([node1, node2, node3, node4, node5, node6, node7], [], "../public/res/level_1_map.png"); //idk of path naar image klopt

//construct level
let level1 = new Level(1, map, [new Dice(DICE.d4), new Dice(DICE.d4), new Dice(DICE.d6), new Dice(DICE.d6), new Dice(DICE.d8)]);

export default level1;