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

//construct shops
let shopstart = new ShopEvent([{item: new MinusOne(), price: 3, sold: false}
	, {item: new ExcludeOne(), price: 3, sold: false}
	, {item: d10(), price: 3, sold: false}
	, {item: d12(), price: 4, sold: false}
	, {item: d12(), price: 4, sold: false}
	, {item: d20(), price: 5, sold: false}]);
shopstart.description = "Welcome!"

let shopboss1 = new ShopEvent([{item: new PlusOne(), price: 4, sold: false}
	, {item: new ExcludeOne(), price: 3, sold: false}
	, {item: d12(), price: 2, sold: false}
	, {item: d20(), price: 5, sold: false}
	, {item: d20(), price: 5, sold: false}
	, {item: d20(), price: 5, sold: false}]);
shopboss1.description = "The creature up ahead is very hard so better prepare."
let shopboss2 = new ShopEvent([{item: new PlusOne(), price: 4, sold: false}
	, {item: new ExcludeOne(), price: 3, sold: false}
	, {item: d10(), price: 2, sold: false}
	, {item: d20(), price: 5, sold: false}
	, {item: d20(), price: 5, sold: false}
	, {item: d20(), price: 5, sold: false}]);
shopboss2.description = "The creature up ahead is very hard so better prepare."

//construct boss
let boss = new Enemy(50, "boss", [d20()], [], "Congratulations, you beat the game!\n Thanks for playing!");

//construct battles
let bossbattle = new BattleEvent([{text : "attack the amount rolled", slots: 2, effect: BATTLE_ACTION.attack}, {text : "defend, heal the amount rolled more than the enemies' roll", slots: 3, effect: BATTLE_ACTION.defend}], boss);

//construct dialogue events
//Dialogue start moet uitleggen dat je niet kan requippen
let DialogueStart = new DialogueEvent([]
	, "Phew! You made it to a new set of islands... Hmm, that large enemy seemed to have dropped something... A dice upgrade! Be careful though, once equipped, you cannot move the item to modify another dice!");

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

//construct eventpool and battles
let eventPool = [constructBirdEvent(), constructBirdEvent(), constructBirdEvent(), constructBirdEvent()
	, constructCubeEvent(), constructCubeEvent(), constructCubeEvent()
	, constructNinjaEvent(), constructNinjaEvent(), constructNinjaEvent()
	, {event: Dialogue1, image: "island_event"}, {event: Dialogue2, image: "island_event"}, {event: Dialogue3, image: "island_event"}, {event: Dialogue4, image: "island_event"}
	, {event: null, image: ""}, {event: null, image: ""}, {event: null, image: ""}, {event: null, image: ""}, {event: null, image: ""}];

//construct nodes
let node17 = new MapNode([],568,167,7,bossbattle,true,"island_boss");
let node16 = new MapNode([node17],488,120,6,shopboss1,true,"island_shop");
let node15 = new MapNode([node17],488,199,6,shopboss2,true,"island_shop");
let node14 = new MapNode([node16],416,138,5,null,false,"");
let node13 = new MapNode([node15],416,234,5,null,false,"");
let node12 = new MapNode([node13],352,266,4,null,false,"");
let node11 = new MapNode([node14],352,170,4,null,false,"");
let node10 = new MapNode([node16],416,90,5,null,false,"");
let node9 = new MapNode([node10],352,74,4,null,false,"");
let node8 = new MapNode([node12],288,266,3,null,false,"");
let node7 = new MapNode([node11],288,202,3,null,false,"");
let node6 = new MapNode([node11],228,137,3,null,false,"");
let node5 = new MapNode([node9],228,74,3,null,false,"");
let node4 = new MapNode([node7, node8],224,233,2,null,false,"");
let node3 = new MapNode([node5, node6],224,104,2,null,false,"");
let node2 = new MapNode([node3, node4],184,169,1,shopstart,false,"island_shop");
let node1 = new MapNode([node2],96,169,0,DialogueStart,true,"island_event");

//construct map
//TODO map width height?
let map = new MapState([node1, node2, node3, node4, node5, node6, node7, node8, node9, node10, node11, node12, node13, node14, node15, node16, node17], eventPool, "", {width : 640, height : 180}); 

//construct level
let level3 = new Level(3, map, [d4(), d4(), d4(), d4(), d4(), d6(), d6(), d6(), d8(), d8(), d8(), d10(), d12()]);

export default level3;


