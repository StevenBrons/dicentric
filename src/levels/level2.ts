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
	, {item: new Dice(DICE.d20), price: 3, sold: false}
	, {item: new Dice(DICE.d8), price: 4, sold: false}
	, {item: new Dice(DICE.d10), price: 4, sold: false}
	, {item: new Dice(DICE.d12), price: 5, sold: false}]);
shopstart.description = "Welcome to the shop! There are some rare equipments in stock. Be aware that you can't remove an equipment, unless you put another equipment over it, but then you won't get it back!";

let shopboss1 = new ShopEvent([{item: new Dice(DICE.d12), price: 5, sold: false}]);
let shopboss2 = new ShopEvent([{item: new Dice(DICE.d12), price: 5, sold: false}]);

//construct enemies
let bird1 = new Enemy(10, "", [new Dice(DICE.d4), new Dice(DICE.d4)], [new Dice(DICE.d6), new Dice(DICE.d8), new Dice(DICE.d10), new Dice(DICE.d10), new Dice(DICE.d12)], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d6 x 2, d8 x 1, d10 x 2, d12 x 1)");
let bird2 = new Enemy(10, "", [new Dice(DICE.d4), new Dice(DICE.d4)], [new Dice(DICE.d6), new Dice(DICE.d8), new Dice(DICE.d10), new Dice(DICE.d10), new Dice(DICE.d12)], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d6 x 2, d8 x 1, d10 x 2, d12 x 1)");
let bird3 = new Enemy(10, "", [new Dice(DICE.d4), new Dice(DICE.d4)], [new Dice(DICE.d6), new Dice(DICE.d8), new Dice(DICE.d10), new Dice(DICE.d10), new Dice(DICE.d12)], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d6 x 2, d8 x 1, d10 x 2, d12 x 1)");
let bird4 = new Enemy(10, "", [new Dice(DICE.d4), new Dice(DICE.d4)], [new Dice(DICE.d6), new Dice(DICE.d8), new Dice(DICE.d10), new Dice(DICE.d10), new Dice(DICE.d12)], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d6 x 2, d8 x 1, d10 x 2, d12 x 1)");
let cube1 = new Enemy(15, "", [new Dice(DICE.d4), new Dice(DICE.d6)], [new Dice(DICE.d6), new Dice(DICE.d8), new Dice(DICE.d8), new Dice(DICE.d10), new Dice(DICE.d12), new Dice(DICE.d12)], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d6 x 2, d8 x 2, d10 x 3, d12 x 1)");
let cube2 = new Enemy(15, "", [new Dice(DICE.d4), new Dice(DICE.d6)], [new Dice(DICE.d6), new Dice(DICE.d8), new Dice(DICE.d8), new Dice(DICE.d10), new Dice(DICE.d12), new Dice(DICE.d12)], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d6 x 2, d8 x 2, d10 x 3, d12 x 1)");
let cube3 = new Enemy(15, "", [new Dice(DICE.d4), new Dice(DICE.d6)], [new Dice(DICE.d6), new Dice(DICE.d8), new Dice(DICE.d8), new Dice(DICE.d10), new Dice(DICE.d12), new Dice(DICE.d12)], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d6 x 2, d8 x 2, d10 x 3, d12 x 1)");
let ninja1 = new Enemy(20, "", [new Dice(DICE.d4), new Dice(DICE.d4), new Dice(DICE.d4), new Dice(DICE.d4)], [new Dice(DICE.d6), new Dice(DICE.d8), new Dice(DICE.d10), new Dice(DICE.d10), new Dice(DICE.d12)], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d6 x 2, d8 x 1, d10 x 2, d12 x 1)");
let ninja2 = new Enemy(20, "", [new Dice(DICE.d4), new Dice(DICE.d4), new Dice(DICE.d4), new Dice(DICE.d4)], [new Dice(DICE.d6), new Dice(DICE.d8), new Dice(DICE.d10), new Dice(DICE.d10), new Dice(DICE.d12)], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d6 x 2, d8 x 1, d10 x 2, d12 x 1)");
let ninja3 = new Enemy(20, "", [new Dice(DICE.d4), new Dice(DICE.d4), new Dice(DICE.d4), new Dice(DICE.d4)], [new Dice(DICE.d6), new Dice(DICE.d8), new Dice(DICE.d10), new Dice(DICE.d10), new Dice(DICE.d12)], "Congratulations! You defeated the enemy! You got some dice as reward. \n (d6 x 2, d8 x 1, d10 x 2, d12 x 1)");

//construct boss
let boss = new Enemy(100, "", [new Dice(DICE.d4), new Dice(DICE.d8), new Dice(DICE.d8)], [], "Congratulations! You defeated the boss and completed the tutorial level");

//construct battles
let battle1 = new BattleEvent([{text : "attack the amount rolled", slots: 1, effect: BATTLE_ACTION.attack}], bird1); 
let battle2 = new BattleEvent([{text : "attack the amount rolled", slots: 1, effect: BATTLE_ACTION.attack}], cube1);
let bossbattle = new BattleEvent([{text : "attack the amount rolled", slots: 2, effect: BATTLE_ACTION.attack}, {text : "defend, heal the amount rolled more than the enemies' roll", slots: 3, effect: BATTLE_ACTION.defend}], boss);

//construct dialogue events
let Dialoguestart = new DialogueEvent([{text : "Search thoroughly, roll higher than 4 to succeed", slots : 2, effect : {succes: (n: number)=>{return n>4?{succes : true, text : "You found some dice! \n d4 was added to your inventory. \n d4 was added to your inventory. \n d6 was added to you inventory."}:{succes : false, text : "You didn't find anything."}}, rewards: [new Dice(DICE.d6), new Dice(DICE.d4), new Dice(DICE.d4)]}}
	, {text : "Search for a bit, roll higher than 2 to succed", slots : 1, effect : {succes: (n: number)=>{return n>2?{succes : true, text : "You found a die! \n d6 was added to your inventory."}:{succes : false, text : "You didn't find anything."}}, rewards: [new Dice(DICE.d6)]}}]
	, "Welcome to Dicentric! You will move accross islands. Dice are used for every action. Your rolls determine the outcome. There seems to be something in the grass. Search the grass? You can choose not to by closing the window");

let Dialogue1 = new DialogueEvent([
	{
	text : "Fight them head on! (>10 to succeed)", slots : 2, 
	effect : {succes: (n: number)=>{return n>10?
		{succes : true, text : "You're on a roll! They stood no chance!"}:
		{succes : false, text : "They're not impressed by your rolling skills. They leave in disappointment..."}}, 
		rewards: [new Dice(DICE.d12)]}
	},
	{
		text : "Throw dice at their eyes and run! (>1 to succeed)", slots : 3, 
		effect : {succes: (n: number)=>{return n>1?
			{succes : true, text : "A classic hit and run! You quickly escape..."}:
			{succes : false, text : "Hmm, this is not supposed to appear..."}}, 
			rewards: []}
	},
	{
	text : "Have a friendly chat! Be careful not to intimidate them though... (<4 to succeed)", slots : 1, 
	effect : {succes: (n: number)=>{return n<4?
		{succes : true, text : "Wow, they were actually really great! They offer you some dice for your adventure!"}:
		{succes : false, text : "Yikes, they see you rollin', they hatin'! You quickly escape..."}}, 
		rewards: [new Dice(DICE.d6), new Dice(DICE.d10), new Dice(DICE.d10)]}
	}
	]
	, "Some dicey looking figures appear before you! What do you do?");

let Dialogue2 = new DialogueEvent([
	{
	text : "Face their challenge! (>10 to succeed)", slots : 1, 
	effect : {succes: (n: number)=>{return n>10?
		{succes : true, text : "What a game! You won without any problems. They"}:
		{succes : false, text : ""}}, 
		rewards: [new Dice(DICE.d20), new Dice(DICE.d20)]}
	},
	{
	text : "Intimidate your challenger (>8 to succeed)", slots : 1, 
	effect : {succes: (n: number)=>{return n>8?
		{succes : true, text : "They bow before your might. They present you some dice."}:
		{succes : false, text : "It was not very effective! You quickly realize your challenger is way cooler than you are!"}}, 
		rewards: [new Dice(DICE.d6), new Dice(DICE.d10), new Dice(DICE.d12)]}
	}
	]
	, "You get challenged to a game of Yahtzee!");

let Dialogue3 = new DialogueEvent([
	{
	text : "There must be something, the creator of this world wouldn't just leave an island empty! Right? Look around.", slots : 1, 
	effect : {succes: (n: number)=>{return n>7?
		{succes : true, text : "Your hunch was right! A dice is hidden beneath the platform!"}:
		{succes : false, text : "Nothing... Apparently, these creators are just teasing you..."}}, 
		rewards: [new Dice(DICE.d20)]}
	},
	{
	text : "Leave something for the next person to travel to this island.", slots : 1, 
	effect : {succes: (n: number)=>{return {succes : true, text : "They bow before your might. They present you some dice."}}, rewards: []}
	}
	]
	, "This island is looking eerily empty. What do you do?");


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