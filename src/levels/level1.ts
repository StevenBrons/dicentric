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
let shop = new ShopEvent([{item: new Dice(DICE.d8), price: 3, sold: false}]);
shop.description = "Welcome to the shop! You can roll some dice to get an amount to spend. Then, you can " //todo

//construct enemies
let enemy1 = new Enemy(20, "", [new Dice(DICE.d4), new Dice(DICE.d4)], [new Dice(DICE.d4), new Dice(DICE.d4), new Dice(DICE.d6), new Dice(DICE.d8)]);
let enemy2 = new Enemy(25, "", [new Dice(DICE.d4), new Dice(DICE.d6)], [new Dice(DICE.d4), new Dice(DICE.d4), new Dice(DICE.d6), new Dice(DICE.d6), new Dice(DICE.d8), new Dice(DICE.d8)]);

//construct boss
let boss = new Enemy(20, "", [new Dice(DICE.d4), new Dice(DICE.d4)], [new Dice(DICE.d4), new Dice(DICE.d4), new Dice(DICE.d6), new Dice(DICE.d8)]);;

//construct battles
let battle1 = new BattleEvent([{text : "attack", slots: 2, effect: BATTLE_ACTION.attack}], enemy1); //todo: actions aanpassen?
let battle2 = new BattleEvent([{text : "attack", slots: 2, effect: BATTLE_ACTION.attack}], enemy2);
let bossbattle = new BattleEvent([{text : "attack", slots: 2, effect: BATTLE_ACTION.attack}], boss);

//construct dialogue events
let tutorialDialogue = new DialogueEvent([{text : "Search thoroughly, roll higher than 4 to succeed", slots : 2, effect : {succes: (n: number)=>{return n>4?{succes : true, text : "You found some dice!"}:{succes : false, text : "You didn't find anything."}}, rewards: [new Dice(DICE.d6), new Dice(DICE.d4)]}}
	, {text : "Search for a bit, roll higher than 2 to succed", slots : 1, effect : {succes: (n: number)=>{return n>2?{succes : true, text : "You found a die!"}:{succes : false, text : "You didn't find anything."}}, rewards: [new Dice(DICE.d6)]}}]
	, "There is a sign it says: \"Welcome to Dicentric! insert speluitleg. Dice are used for every action. Your rolls determine the outcome\". There seems to be something behind the sign. Search behind the sign? You can choose not to by closing the window");

//TODO, up is the harder enemy
let junctionDialogue = new DialogueEvent([{text : "Nah", slots : 0, effect : {succes: (n: number)=>{return {succes: true, text : "You move on."}}, rewards: []}}
	,{text : "Search, roll higher than 5 to succeed", slots : 2, effect : {succes: (n: number)=>{return n>=5?{succes : true, text : "You found some dice!"}:{succes : false, text : "You didn't find anything."}}, rewards: [new Dice(DICE.d6), new Dice(DICE.d4)]}}]
	, "There is a sign it says: \"Welcome to Dicentric! insert speluitleg. Dice are used for every action. Your rolls determine the outcome\". There seems to be something behind the sign. Search behind the sign?");

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
let map = new MapState([node1, node2, node3, node4, node5, node6, node7], [], ""); 

//construct level
let level1 = new Level(1, map, [new Dice(DICE.d4), new Dice(DICE.d4), new Dice(DICE.d6)]);

export default level1;